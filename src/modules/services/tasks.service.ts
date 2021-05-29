import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Consortium } from '@database/datamodels/schemas/consortium';
import { Model } from 'mongoose';
import { Banking } from '@database/datamodels/schemas/banking';
import { BetStatus } from '@database/datamodels/enums/bet.status';
import { Message } from '@database/datamodels/schemas/message';
import { PlayPool } from '@database/datamodels/schemas/playPool';
import { DateHelper, MINUTE_LENGTH, SECOND_LENGTH } from '@utils/date.helper';
import { BankingAccounting } from '@database/datamodels/schemas/bankingAccounting';
import { Transaction } from '@database/datamodels/schemas/transaction';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        @InjectModel(Consortium.name) private readonly consortiumModel: Model<Consortium>,
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        @InjectModel(BankingAccounting.name) private readonly bankingAccountingModel: Model<BankingAccounting>,
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
        @InjectModel(PlayPool.name) private readonly playPoolModel: Model<PlayPool>,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    handleCron() {
        this.expireBets();
        this.deleteOldMessages();
        this.deleteOldPlayPools();
    }

    @Cron(/*CronExpression.EVERY_MINUTE*/ '59 23 * * 0')
    async bankingBalance(): Promise<void> {
        //Day variables
        const sunday: number = new Date().setHours(23, 59, 59, 0);
        const monday: number = new Date(DateHelper.getWeekBefore(sunday) + SECOND_LENGTH).getTime();

        //bankings list
        const bankings: Array<Banking> = await this.bankingModel.find().exec();

        // weekly earnings total amount
        let weeklyTotal: number;

        bankings.forEach((banking: Banking) => {
            const inRangeTransactions: Transaction[] = banking.transactions.filter((transaction: Transaction) =>
                DateHelper.isInRange(
                    {
                        initialDate: monday,
                        finalDate: sunday,
                    },
                    new Date(transaction.createdAt).getTime(),
                ),
            );
            const lastTransaction = inRangeTransactions.last();
            let actualBalance = 0;
            if (lastTransaction) {
                actualBalance = lastTransaction.actualBalance;
            }
            const accounting: BankingAccounting = new this.bankingAccountingModel({
                isPayed: false,
                modificationUserId: banking.ownerUserId,
                creationUserId: banking.ownerUserId,
                week: new Date(sunday),
                dueBalance: actualBalance * (banking.earningPercentage / 100),
                earningPercentage: banking.earningPercentage,
            } as BankingAccounting);
            let lastWeeklyAccounting = new Date().getTime();
            if (banking && banking.weeklyAccounting && banking.weeklyAccounting.last()) {
                const last = banking.weeklyAccounting.last();
                if (last && last.week) {
                    lastWeeklyAccounting = last.week.getTime();
                }
            }
            if (
                !DateHelper.isInRange(
                    {
                        initialDate: monday,
                        finalDate: sunday,
                    },
                    lastWeeklyAccounting,
                )
            ) {
                banking.weeklyAccounting.push(accounting);
                banking.save();
            }
        });
        let accounting: BankingAccounting;
    }

    async expireBets(): Promise<void> {
        // FIXME TRANSACCION

        // Se ejecuta para expirar bets en pending o winner
        // si ya pasaron 5 dias se expiran
        const days = 5;
        const dateOffset = days * 24 * 3600 * 1000; //5 days
        const myDate = new Date();
        myDate.setTime(myDate.getTime() - dateOffset);
        const bankings = await this.bankingModel.find().exec();
        for (const banking of bankings) {
            const bets = banking.bets.filter(
                (bet) => [BetStatus.pending, BetStatus.winner].includes(bet.betStatus) && bet.date < myDate,
            );
            for (const bet of bets) {
                this.logger.debug(bet.date.toISOString() + ' ' + myDate.toISOString());
                bet.betStatus = BetStatus.expired;
            }
            banking.save();
        }
        this.logger.debug('Se ejecuto expireBets');
    }

    async deleteOldMessages(): Promise<void> {
        // FIXME TRANSACCION

        // Se ejecuta para eliminar viejos
        // si ya pasaron 30 dias se eliminan
        const days = 30;
        const dateOffset = days * 24 * 3600 * 1000; //5 days
        const myDate = new Date();
        myDate.setTime(myDate.getTime() - dateOffset);
        const messages = await this.messageModel
            .find({
                date: {
                    $lte: myDate,
                },
            })
            .exec();
        for (const msg of messages) {
            msg.delete();
        }
        this.logger.debug('Se ejecuto deleteOldMessages');
    }

    async deleteOldPlayPools(): Promise<void> {
        // Se ejecuta para eliminar viejos
        // si ya pasaron 5 dias se eliminan
        // FIXME TRANSACCION
        const days = 5;
        const dateOffset = days * 24 * 3600 * 1000; //5 days
        const myDate = new Date();
        myDate.setTime(myDate.getTime() - dateOffset);
        const playPools = await this.playPoolModel
            .find({
                date: {
                    $lte: myDate,
                },
            })
            .exec();
        for (const playPool of playPools) {
            playPool.delete();
        }
        this.logger.debug('Se ejecuto deleteOldPlayPools');
    }
}
