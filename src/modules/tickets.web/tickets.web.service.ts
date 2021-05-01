import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@database/datamodels/schemas/user';
import { Model } from 'mongoose';
import { Banking } from '@database/datamodels/schemas/banking';
import { PlayTypes } from '@database/datamodels/enums/play.types';
import { Bet } from '@database/datamodels/schemas/bet';
import { PlayDto } from '@betting.panel/dtos/play.dto';
import { Play } from '@database/datamodels/schemas/play';
import { ConsortiumService } from '@consortiums/consortium.service';
import { Lottery } from '@database/datamodels/schemas/lottery';
import { Role } from '@database/datamodels/enums/role';
import { TicketWebDto } from '@src/modules/tickets.web/dtos/ticket.web.dto';
import { WebUser } from '@database/datamodels/schemas/web.user';

@Injectable()
export class TicketsWebService {
    constructor(
        private readonly consortiumService: ConsortiumService,
        @InjectModel(Banking.name) private bankingModel: Model<Banking>,
        @InjectModel(WebUser.name) private webUserModel: Model<WebUser>,
        @InjectModel(Lottery.name) private readonly lotteryModel: Model<Lottery>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async getAll(loggedUser: User): Promise<Array<TicketWebDto>> {
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
            case Role.banker:
                bankings = await this.bankingModel.find({ ownerUserId: loggedUser._id }).exec();
                break;
        }
        const tickets = [];
        for await (const banking of bankings) {
            const webusers: WebUser[] = await this.webUserModel.find({ bankingId: banking._id }).exec();
            for await (const webuser of webusers) {
                const user: User = await this.userModel.findById(webuser.ownerUserId).exec();
                for await (const bet of webuser.bets) {
                    tickets.push(await this.mapTicket(bet, user, webuser, banking));
                }
            }
        }
        tickets.sort((a, b) => (a.date < b.date ? 1 : b.date < a.date ? -1 : 0));
        return tickets;
    }

    private async mapTicket(bet: Bet, user: User, webuser: WebUser, banking: Banking): Promise<TicketWebDto> {
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
            amountWin: bet.amountWin,
            bankingName: banking.name,
            consortiumName: consortium.name,
            username: user.username,
            name: user.name,
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
            playWinner: play.playWinner,
            lotteryIdSuperpale: play.lotteryIdSuperpale,
            lotteryName: lotteryName,
        };
    }
}