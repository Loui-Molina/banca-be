import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
import {ReclaimBetDto} from "@betting.panel/dtos/reclaim.bet.dto";

@Injectable()
export class BettingPanelService {
    constructor(
        @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
        @InjectModel(Bet.name) private betModel: Model<Bet>,
        @InjectModel(Banking.name) private bankingModel: Model<Banking>,
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
        const pendingPayments: number = bets.reduce(function (acc, bet) {
            return (
                acc +
                (bet.betStatus === BetStatus.winner
                    ? bet.plays.reduce(function (acc, play) {
                          return acc + play.amount;
                      }, 0)
                    : 0)
            );
        }, 0);
        const totalSells: number = bets.reduce(function (acc, bet) {
            return (
                acc +
                (bet.betStatus !== BetStatus.cancelled
                    ? bet.plays.reduce(function (acc, play) {
                          return acc + play.amount;
                      }, 0)
                    : 0)
            );
        }, 0);
        const totalAwards: number = bets.reduce(function (acc, bet) {
            return (
                acc +
                (bet.betStatus === BetStatus.winner || bet.betStatus === BetStatus.reclaimed
                    ? bet.plays.reduce(function (acc, play) {
                          return acc + play.amount;
                      }, 0)
                    : 0)
            );
        }, 0);
        return {
            balance: await banking.calculateBalance(),
            pendingPayments: pendingPayments,
            cancelledBets: bets.filter((bet) => bet.betStatus === BetStatus.cancelled).length,
            pendingBets: bets.filter((bet) => bet.betStatus === BetStatus.pending).length,
            winnerBets: bets.filter((bet) => bet.betStatus === BetStatus.winner).length,
            loserBets: bets.filter((bet) => bet.betStatus === BetStatus.loser).length,
            reclaimedBets: bets.filter((bet) => bet.betStatus === BetStatus.reclaimed).length,
            totalBets: bets.length,
            totalSells: totalSells,
            totalAwards: totalAwards,
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
        const banking = (await this.bankingModel.find({ ownerUserId: loggedUser._id })).pop();
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
        const newObject = new this.betModel({
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
        return this.mapToDto(newObject);
    }

    async cancelBet(dto: UpdateBetDto, loggedUser: User): Promise<BetDto> {
        const banking = (await this.bankingModel.find({ ownerUserId: loggedUser._id })).pop();
        const bet = banking.bets.filter((bet) => bet._id.toString() === dto._id.toString()).pop();
        if (bet.betStatus !== BetStatus.pending || !(await this.canCancelTicket(bet))) {
            throw new BadRequestException();
        }
        let betFounded: Bet = null;
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
        return this.mapToDto(betFounded);
    }

    async reclaimTicket(dto: ReclaimBetDto, loggedUser: User): Promise<BetDto> {
        const banking = (await this.bankingModel.find({ ownerUserId: loggedUser._id })).pop();
        const bet = banking.bets.filter((bet) => bet.sn.toString() === dto.sn.toString()).pop();
        if (bet.betStatus !== BetStatus.winner || !(await this.canReclaimTicket(bet))) {
            throw new BadRequestException();
        }
        let betFounded: Bet = null;
        let total = 0;
        banking.bets.map((bet: Bet) => {
            if (bet.sn === dto.sn) {
                bet.betStatus = BetStatus.reclaimed;
                betFounded = bet;
                bet.plays.map((play: Play) => {
                    total += play.amount;
                });
            }
        });
        const balance = await banking.calculateBalance();
        // TODO calcular cuanto gano la persona y hacer bien la transferencia
        // con el monto correspondiente
        const transaction = new this.transactionModel({
            type: TransactionType.debit,
            originId: null,
            originObject: TransactionObjects.unknown,
            destinationId: banking._id,
            destinationObject: TransactionObjects.banking,
            amount: total * -1,
            description: 'A client reclaimed a bet',
            creationUserId: loggedUser._id,
            modificationUserId: loggedUser._id,
            lastBalance: balance,
            actualBalance: balance + total * -1,
        });
        banking.transactions.push(transaction);
        await banking.save();
        return this.mapToDto(betFounded);
    }

    async get(id: string): Promise<BetDto> {
        return this.mapToDto(await this.betModel.findById(id).exec());
    }

    async mapToDto(bet: Bet): Promise<BetDto> {
        const { _id, plays, date, sn, betStatus } = bet;
        return {
            _id,
            plays,
            date,
            sn,
            betStatus,
        };
    }

    private async canCancelTicket(bet: Bet): Promise<boolean> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const diffMs = new Date(bet.date) - new Date();
        const diffMins = diffMs / 60000; // minutes
        return diffMins > -5;
    }

    private async canReclaimTicket(bet: Bet): Promise<boolean> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const diffDays = (new Date(bet.date) - new Date()) / 86400000;
        // No se paga el ticket si ya pasaron 5 dias desde la creacion del mismo
        return diffDays > -5;
    }

    private async createSN(): Promise<string> {
        return new Date().getTime().toString() + parseInt(String(Math.random() * (999 - 100) + 100), 0).toString();
    }
}
