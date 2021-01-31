import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from '@database/datamodels/schemas/user';
import { Bet } from '@database/datamodels/schemas/bet';
import { Play } from '@database/datamodels/schemas/play';
import { BetDto } from '@betting.panel/dtos/bet.dto';
import { CreateBetDto } from '@betting.panel/dtos/create.bet.dto';
import { BetStatus } from '@database/datamodels/enums/bet.status';
import { UpdateBetDto } from '@betting.panel/dtos/update.bet.dto';
import { Banking } from '@database/datamodels/schemas/banking';
import { TransactionType } from '@database/datamodels/enums/transaction.type';
import { Transaction } from '@database/datamodels/schemas/transaction';
import { TransactionObjects } from '@database/datamodels/enums/transaction.objects';
import { ResumeSellsDto } from '@betting.panel/dtos/resume.sells.dto';
import { ClaimBetDto } from '@betting.panel/dtos/claim.bet.dto';
import { ConstApp } from '@utils/const.app';

@Injectable()
export class BettingPanelService {
    private readonly logger: Logger = new Logger(BettingPanelService.name);

    constructor(
        @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
        @InjectModel(Bet.name) private readonly betModel: Model<Bet>,
        @InjectConnection(ConstApp.BANKING) private readonly connection: Connection,
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
    ) {}

    async getAll(loggedUser: User): Promise<Array<Bet>> {
        const banking = (await this.bankingModel.find({ ownerUserId: loggedUser._id })).pop();
        return banking.bets.reverse();
    }

    async getResumeSells(loggedUser: User): Promise<ResumeSellsDto> {
        const banking = (await this.bankingModel.find({ ownerUserId: loggedUser._id })).pop();
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const bets = banking.bets.filter((bet) => {
            const a = new Date(bet.date);
            a.setHours(0, 0, 0, 0);
            return now.getTime() === a.getTime();
        });
        return {
            cancelled: await this.sumBets(bets, [BetStatus.cancelled], PosibleSums.count),
            expired: await this.sumBets(bets, [BetStatus.expired], PosibleSums.count),
            claimed: await this.sumBets(bets, [BetStatus.claimed], PosibleSums.count),
            pending: await this.sumBets(bets, [BetStatus.pending], PosibleSums.count),
            winner: await this.sumBets(bets, [BetStatus.winner], PosibleSums.count),
            loser: await this.sumBets(bets, [BetStatus.loser], PosibleSums.count),
            total: bets.length,
            profits: await this.sumBets(
                bets,
                [BetStatus.expired, BetStatus.claimed, BetStatus.pending, BetStatus.winner, BetStatus.loser],
                PosibleSums.amount,
            ),
            prizes: await this.sumBets(bets, [BetStatus.claimed, BetStatus.winner], PosibleSums.amountWin),
            pendingPrizes: await this.sumBets(bets, [BetStatus.pending], PosibleSums.amountWin),
            balance: await banking.calculateBalance(),
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    async getFiltered(q: string, value: any): Promise<Array<BetDto>> {
        const bets = await this.betModel.find({ [q]: value }).exec();
        const betsDto: BetDto[] = [];
        for await (const bet of bets) {
            betsDto.push(await this.mapToDto(bet));
        }
        return betsDto;
    }

    async create(dto: CreateBetDto, loggedUser: User): Promise<BetDto> {
        const session = await this.connection.startSession();
        session.startTransaction();
        let newObject: Bet = null;
        try {
            const banking = (await this.bankingModel.find({ ownerUserId: loggedUser._id })).pop();
            if (!banking.startOfOperation){
                //Inicio de operacion
                banking.startOfOperation = new Date();
            }
            const plays: Play[] = [];
            let total = 0;
            dto.plays.map((play: Play) => {
                play.playNumbers.creationUserId = loggedUser._id;
                play.playNumbers.modificationUserId = loggedUser._id;
                play.creationUserId = loggedUser._id;
                play.modificationUserId = loggedUser._id;
                plays.push(play);
                total += play.amount;
            });
            newObject = new this.betModel({
                plays: plays,
                date: new Date(),
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
                sn: await this.createSN(),
                betStatus: BetStatus.pending,
            });
            await banking.bets.push(newObject);
            const balance = await banking.calculateBalance();
            const transaction = new this.transactionModel({
                type: TransactionType.credit,
                originId: null,
                originObject: TransactionObjects.unknown,
                destinationId: banking._id,
                destinationObject: TransactionObjects.banking,
                amount: total,
                description: 'A client payed for a bet',
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
                lastBalance: balance,
                actualBalance: balance + total,
            });
            banking.transactions.push(transaction);
            await banking.save();
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            if (error.code === 11000) {
                throw new ConflictException(ConstApp.USERNAME_EXISTS_ERROR);
            } else {
                throw new InternalServerErrorException();
            }
        } finally {
            session.endSession();
        }
        return this.mapToDto(newObject);
    }

    async cancelBet(dto: UpdateBetDto, loggedUser: User): Promise<BetDto> {
        const session = await this.connection.startSession();
        session.startTransaction();
        let betFounded: Bet = null;
        try {
            const banking = (await this.bankingModel.find({ ownerUserId: loggedUser._id })).pop();
            const bet = banking.bets.filter((bet) => bet._id.toString() === dto._id.toString()).pop();
            if (bet.betStatus !== BetStatus.pending || !(await this.canCancelTicket(bet))) {
                throw new UnauthorizedException(ConstApp.CANNOT_CANCEL_TICKET);
            }
            let total = 0;
            banking.bets.map((bet: Bet) => {
                if (bet._id.toString() === dto._id.toString()) {
                    bet.betStatus = BetStatus.cancelled;
                    betFounded = bet;
                    bet.plays.map((play: Play) => {
                        total += play.amount;
                    });
                }
            });
            const balance = await banking.calculateBalance();
            const transaction = new this.transactionModel({
                type: TransactionType.debit,
                originId: null,
                originObject: TransactionObjects.unknown,
                destinationId: banking._id,
                destinationObject: TransactionObjects.banking,
                amount: total * -1,
                description: 'A client cancelled a bet',
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
                lastBalance: balance,
                actualBalance: balance + total * -1,
            });
            banking.transactions.push(transaction);
            await banking.save();
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            if (error.code === 11000) {
                throw new ConflictException(ConstApp.USERNAME_EXISTS_ERROR);
            } else {
                throw new InternalServerErrorException();
            }
        } finally {
            session.endSession();
        }

        return this.mapToDto(betFounded);
    }

    async claimTicket(dto: ClaimBetDto, loggedUser: User): Promise<BetDto> {
        const session = await this.connection.startSession();
        session.startTransaction();
        let betFounded: Bet = null;
        try {
            const banking = (await this.bankingModel.find({ ownerUserId: loggedUser._id })).pop();
            const bet = banking.bets.filter((bet) => bet.sn.toString() === dto.sn.toString()).pop();
            if (bet.betStatus !== BetStatus.winner) {
                throw new UnauthorizedException(ConstApp.CANNOT_CLAIM_TICKET);
            }
            let amountToPay = 0;
            banking.bets.map((bet: Bet) => {
                if (bet.sn === dto.sn) {
                    bet.betStatus = BetStatus.claimed;
                    bet.claimDate = new Date();
                    betFounded = bet;
                    amountToPay += bet.amountWin;
                }
            });
            const balance = await banking.calculateBalance();
            const transaction = new this.transactionModel({
                type: TransactionType.debit,
                originId: null,
                originObject: TransactionObjects.unknown,
                destinationId: banking._id,
                destinationObject: TransactionObjects.banking,
                amount: amountToPay * -1,
                description: 'A client claimed a bet',
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
                lastBalance: balance,
                actualBalance: balance + amountToPay * -1,
            });
            banking.transactions.push(transaction);
            await banking.save();
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            if (error.code === 11000) {
                throw new ConflictException(ConstApp.CANNOT_CLAIM_TICKET);
            } else {
                throw new InternalServerErrorException();
            }
        } finally {
            session.endSession();
        }
        return this.mapToDto(betFounded);
    }

    async get(id: string): Promise<BetDto> {
        return this.mapToDto(await this.betModel.findById(id).exec());
    }

    async mapToDto(bet: Bet): Promise<BetDto> {
        const { _id, plays, date, sn, betStatus, amountWin, claimDate } = bet;
        return {
            _id,
            plays,
            date,
            sn,
            betStatus,
            amountWin,
            claimDate,
        };
    }

    private async canCancelTicket(bet: Bet): Promise<boolean> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const diffMs = new Date(bet.date) - new Date();
        const diffMins = diffMs / 60000; // minutes
        return diffMins > -5;
    }

    private async createSN(): Promise<string> {
        return new Date().getTime().toString() + parseInt(String(Math.random() * (999 - 100) + 100), 0).toString();
    }

    private async sumBets(bets: Bet[], betStatus: BetStatus[], key: PosibleSums): Promise<number> {
        switch (key) {
            case PosibleSums.amount:
                return bets.reduce(function (acc, bet) {
                    return (
                        acc +
                        (betStatus.includes(bet.betStatus)
                            ? bet.plays.reduce(function (acc, play) {
                                  return acc + (play.amount ? play.amount : 0);
                              }, 0)
                            : 0)
                    );
                }, 0);
            case PosibleSums.amountWin:
                return bets.reduce(function (acc, bet) {
                    return acc + (betStatus.includes(bet.betStatus) ? (bet.amountWin ? bet.amountWin : 0) : 0);
                }, 0);
            case PosibleSums.count:
                return bets.filter((bet) => betStatus.includes(bet.betStatus)).length;
        }
        return 0;
    }
}

enum PosibleSums {
    'amount',
    'amountWin',
    'count',
}
