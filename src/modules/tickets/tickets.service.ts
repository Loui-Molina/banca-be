import {Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@database/datamodels/schemas/user';
import { Model } from 'mongoose';
import { Banking } from '@database/datamodels/schemas/banking';
import { PlayTypes } from '@database/datamodels/enums/play.types';
import { Bet } from '@database/datamodels/schemas/bet';
import { TicketDto } from '@src/modules/tickets/dtos/ticket.dto';
import { PlayDto } from '@betting.panel/dtos/play.dto';
import { Play } from '@database/datamodels/schemas/play';
import { ConsortiumService } from '@consortiums/consortium.service';
import { Lottery } from '@database/datamodels/schemas/lottery';
import {Role} from "@database/datamodels/enums/role";
import {ConstApp} from "@utils/const.app";

@Injectable()
export class TicketsService {
    constructor(
        private readonly consortiumService: ConsortiumService,
        @InjectModel(Banking.name) private bankingModel: Model<Banking>,
        @InjectModel(Lottery.name) private readonly lotteryModel: Model<Lottery>,
    ) {}

    async getAll(loggedUser: User): Promise<Array<TicketDto>> {
        let bankings: Array<Banking> = [];
        switch (loggedUser.role) {
            case Role.consortium:
                // eslint-disable-next-line no-case-declarations
                const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
                bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
                break;
            case Role.admin:
                bankings = await this.bankingModel.find().exec();
                break;
        }
        const tickets = [];
        for await (const banking of bankings) {
            for await (const bet of banking.bets) {
                tickets.push(await this.mapTicket(bet, banking));
            }
        }
        return tickets;
    }

    private async mapTicket(bet: Bet, banking: Banking): Promise<TicketDto> {
        const consortium = await this.consortiumService.get(banking.consortiumId.toString());
        const playDtos: PlayDto[] = [];
        for await (const play of bet.plays) {
            playDtos.push(await this.mapPlay(play));
        }
        return {
            _id: bet._id,
            plays: playDtos,
            betStatus: bet.betStatus,
            date: bet.date,
            bankingName: banking.name,
            consortiumName: consortium.name,
        };
    }

    private async mapPlay(play: Play): Promise<PlayDto> {
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
        return {
            playType: play.playType,
            amount: play.amount,
            playNumbers: play.playNumbers,
            lotteryId: play.lotteryId,
            lotteryIdSuperpale: play.lotteryIdSuperpale,
            lotteryName: lotteryName,
        };
    }
}
