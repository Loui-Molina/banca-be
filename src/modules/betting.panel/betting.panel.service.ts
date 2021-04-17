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
import { Lottery } from '@database/datamodels/schemas/lottery';
import { PlayDto } from '@betting.panel/dtos/play.dto';
import { PlayPool } from '@database/datamodels/schemas/playPool';
import { LimitVerifyDto } from '@betting.panel/dtos/limit.verify.dto';
import { BankingLotteryService } from '@lotteries/banking/banking.lottery.service';
import { PlayTypes } from '@database/datamodels/enums/play.types';
import { WebUser } from '@database/datamodels/schemas/web.user';
import { Role } from '@database/datamodels/enums/role';
import { BankingLotteryDto } from '@lotteries/banking/dtos/banking.lottery.dto';
import { WebUserLotteryService } from '@lotteries/web-user/web-user.lottery.service';

@Injectable()
export class BettingPanelService {
    private readonly logger: Logger = new Logger(BettingPanelService.name);

    constructor(
        @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
        @InjectModel(Lottery.name) private readonly lotteryModel: Model<Lottery>,
        @InjectModel(Bet.name) private readonly betModel: Model<Bet>,
        @InjectConnection(ConstApp.BANKING) private readonly connection: Connection,
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        @InjectModel(WebUser.name) private readonly webUserModel: Model<WebUser>,
        @InjectModel(PlayPool.name) private readonly playPoolModel: Model<PlayPool>,
        private readonly bankingLotteryService: BankingLotteryService,
        private readonly webUserLotteryService: WebUserLotteryService,
    ) {}

    async getAll(loggedUser: User): Promise<Array<BetDto>> {
        let bets: Bet[] = [];
        if (loggedUser.role === Role.webuser) {
            const webuser = await this.webUserModel.findOne({ ownerUserId: loggedUser._id });
            bets = webuser.bets;
        } else if (loggedUser.role === Role.banker) {
            const banking = await this.bankingModel.findOne({ ownerUserId: loggedUser._id });
            bets = banking.bets;
        }
        const betDtos: BetDto[] = [];
        for await (const bet of bets) {
            betDtos.push(await this.mapToDto(bet));
        }
        return betDtos.reverse();
    }

    async getResumeSells(loggedUser: User): Promise<ResumeSellsDto> {
        const banking = await this.bankingModel.findOne({ ownerUserId: loggedUser._id });
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

    async verifyLimit(req: LimitVerifyDto, loggedUser: User): Promise<number> {
        let lotteries: BankingLotteryDto[] = [];
        if (loggedUser.role === Role.banker) {
            lotteries = await this.bankingLotteryService.getAll(loggedUser);
        }
        if (loggedUser.role === Role.webuser) {
            lotteries = await this.webUserLotteryService.getAll(loggedUser);
        }
        const lottery = lotteries.find((lottery) => lottery._id.toString() === req.lotteryId);
        if (!lottery) {
            return null;
        }
        const limit = lottery.bettingLimits.find(
            (bettingLimit) => bettingLimit.playType === req.playType && bettingLimit.status === true,
        );
        if (!limit) {
            return null;
        }
        let sum = 0;
        const date = new Date();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        const filterDateA = new Date(`${date.getFullYear()}-${month}-${day}T00:00:00.000Z`);
        const filterDateB = new Date(`${date.getFullYear()}-${month}-${day}T23:59:59.000Z`);

        let filter: any[] = [];
        if (req.playType === PlayTypes.direct) {
            filter = [{ 'playNumbers.first': req.playNumbers.first }];
        }
        if (req.playType === PlayTypes.pale) {
            filter = [
                {
                    $or: [
                        { 'playNumbers.first': req.playNumbers.first, 'playNumbers.second': req.playNumbers.second },
                        { 'playNumbers.first': req.playNumbers.second, 'playNumbers.second': req.playNumbers.first },
                    ],
                },
            ];
        }
        if (req.playType === PlayTypes.tripleta) {
            filter = [
                {
                    $or: [
                        {
                            'playNumbers.first': req.playNumbers.first,
                            'playNumbers.second': req.playNumbers.second,
                            'playNumbers.third': req.playNumbers.third,
                        },
                        {
                            'playNumbers.first': req.playNumbers.third,
                            'playNumbers.second': req.playNumbers.first,
                            'playNumbers.third': req.playNumbers.second,
                        },
                        {
                            'playNumbers.first': req.playNumbers.second,
                            'playNumbers.second': req.playNumbers.third,
                            'playNumbers.third': req.playNumbers.first,
                        },
                        {
                            'playNumbers.first': req.playNumbers.first,
                            'playNumbers.second': req.playNumbers.third,
                            'playNumbers.third': req.playNumbers.second,
                        },
                        {
                            'playNumbers.first': req.playNumbers.second,
                            'playNumbers.second': req.playNumbers.first,
                            'playNumbers.third': req.playNumbers.third,
                        },
                        {
                            'playNumbers.first': req.playNumbers.third,
                            'playNumbers.second': req.playNumbers.second,
                            'playNumbers.third': req.playNumbers.first,
                        },
                    ],
                },
            ];
        }
        let playPools = await this.playPoolModel
            .find()
            .and([{ playType: req.playType }, { date: { $gte: filterDateA } }, { date: { $lte: filterDateB } }])
            .and(filter)
            .exec();
        playPools = playPools.filter((playPool) => playPool.lotteryId.toString() === req.lotteryId);
        for await (const play of playPools) {
            sum += play.amount;
        }
        let finalLimit = limit.betAmount - sum;
        if (finalLimit < 0) {
            finalLimit = 0;
        }
        return finalLimit;
    }

    async create(dto: CreateBetDto, loggedUser: User): Promise<BetDto> {
        const session = await this.connection.startSession();
        session.startTransaction();
        let newObject: Bet = null;
        try {
            const banking = await this.bankingModel.findOne({ ownerUserId: loggedUser._id });
            if (!banking.startOfOperation) {
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

                const playPool = new this.playPoolModel({
                    date: new Date(),
                    playNumbers: play.playNumbers,
                    playType: play.playType,
                    lotteryId: play.lotteryId,
                    lotteryIdSuperpale: play.lotteryIdSuperpale,
                    amount: play.amount,
                });
                playPool.save();
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

    async createForWebUser(dto: CreateBetDto, loggedUser: User): Promise<BetDto> {
        const session = await this.connection.startSession();
        session.startTransaction();
        let newObject: Bet = null;
        try {
            const webuser = await this.webUserModel.findOne({ ownerUserId: loggedUser._id });
            const balance = await webuser.calculateBalance();
            const banking = await this.bankingModel.findOne({ _id: webuser.bankingId });
            if (!webuser.startOfOperation) {
                //Inicio de operacion
                webuser.startOfOperation = new Date();
            }
            const plays: Play[] = [];
            let total = 0;
            dto.plays.map((play: Play) => {
                total += play.amount;
            });

            if (total > balance) {
                throw new BadRequestException(ConstApp.BALANCE_IS_NOT_ENOUGH);
            }

            dto.plays.map((play: Play) => {
                play.playNumbers.creationUserId = loggedUser._id;
                play.playNumbers.modificationUserId = loggedUser._id;
                play.creationUserId = loggedUser._id;
                play.modificationUserId = loggedUser._id;
                plays.push(play);
                const playPool = new this.playPoolModel({
                    date: new Date(),
                    playNumbers: play.playNumbers,
                    playType: play.playType,
                    lotteryId: play.lotteryId,
                    amount: play.amount,
                });
                playPool.save();
            });

            newObject = new this.betModel({
                plays: plays,
                date: new Date(),
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
                sn: await this.createSN(),
                betStatus: BetStatus.pending,
            });
            await webuser.bets.push(newObject);

            const transaction = new this.transactionModel({
                type: TransactionType.debit,
                originId: webuser._id,
                originObject: TransactionObjects.webuser,
                destinationId: null,
                destinationObject: TransactionObjects.unknown,
                amount: total * -1,
                description: 'Payed for a bet',
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
                lastBalance: balance,
                actualBalance: balance - total,
            });
            webuser.transactions.push(transaction);

            await webuser.save();
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            if (error.status === 400) {
                throw error;
            }
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
            const banking = await this.bankingModel.findOne({ ownerUserId: loggedUser._id });
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

    async getClaimTicket(dto: ClaimBetDto, loggedUser: User): Promise<BetDto> {
        const banking = await this.bankingModel.findOne({ ownerUserId: loggedUser._id });
        const bet = banking.bets.filter((bet) => bet.sn.toString() === dto.sn.toString()).pop();
        if (!bet) {
            throw new UnauthorizedException(ConstApp.CANNOT_FIND_TICKET);
        }
        if (bet.betStatus !== BetStatus.winner) {
            throw new UnauthorizedException(ConstApp.CANNOT_CLAIM_TICKET);
        }
        return this.mapToDto(bet);
    }

    async claimTicket(dto: ClaimBetDto, loggedUser: User): Promise<BetDto> {
        const session = await this.connection.startSession();
        session.startTransaction();
        let betFounded: Bet = null;
        try {
            const banking = await this.bankingModel.findOne({ ownerUserId: loggedUser._id });
            const bet = banking.bets.filter((bet) => bet.sn.toString() === dto.sn.toString()).pop();
            if (!bet) {
                throw new UnauthorizedException(ConstApp.CANNOT_FIND_TICKET);
            }
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

    async get(id: string, loggedUser: User): Promise<BetDto> {
        if (loggedUser.role === Role.webuser) {
            const webuser = await this.webUserModel.findOne({ ownerUserId: loggedUser._id });
            const bet = webuser.bets.find((bet) => bet._id.toString() === id);
            if (!bet) {
                throw new BadRequestException(ConstApp.BET_NOT_FOUND);
            }
            return this.mapToDto(bet);
        } else if (loggedUser.role === Role.banker) {
            const banking = await this.bankingModel.findOne({ ownerUserId: loggedUser._id });
            const bet = banking.bets.find((bet) => bet._id.toString() === id);
            if (!bet) {
                throw new BadRequestException(ConstApp.BET_NOT_FOUND);
            }
            return this.mapToDto(bet);
        }
        throw new UnauthorizedException(ConstApp.UNAUTHORIZED);
    }

    async mapToDto(bet: Bet): Promise<BetDto> {
        const { _id, plays, date, betStatus, amountWin, claimDate } = bet;
        let { sn } = bet;
        if (!(await this.canSeeSn(bet))) {
            sn = null;
        }
        const playDtos: PlayDto[] = [];
        for await (const play of plays) {
            const lottery = await this.lotteryModel.findOne({ _id: play.lotteryId });
            let lotteryName = '';
            if (lottery) {
                lotteryName = lottery.name;
            }
            if (play.playType === PlayTypes.superPale) {
                const lottery2 = await this.lotteryModel.findOne({ _id: play.lotteryIdSuperpale });
                if (lottery2) {
                    lotteryName += '-' + lottery2.name;
                }
            }
            playDtos.push({
                amount: play.amount,
                lotteryId: play.lotteryId,
                lotteryIdSuperpale: play.lotteryIdSuperpale,
                playNumbers: play.playNumbers,
                playWinner: play.playWinner,
                playType: play.playType,
                lotteryName,
            });
        }
        return {
            _id,
            plays: playDtos,
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

    private async canSeeSn(bet: Bet): Promise<boolean> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const diffMs = new Date(bet.date) - new Date();
        const diffMins = diffMs / 60000; // minutes
        return diffMins > -10;
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
