import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Consortium } from '@database/datamodels/schemas/consortium';
import { Model } from 'mongoose';
import { Banking } from '@database/datamodels/schemas/banking';
import { BetStatus } from '@database/datamodels/enums/bet.status';
import { Message } from '@database/datamodels/schemas/message';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        @InjectModel(Consortium.name) private readonly consortiumModel: Model<Consortium>,
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    handleCron() {
        this.expireBets();
        this.deleteOldMessages();
    }

    async expireBets(): Promise<void> {
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
}
