import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument} from '@database/datamodels/schemas/user';
import {AuthUserService} from '@src/modules/auth.user/auth.user.service';
import {UserService} from '@users/user.service';
import {Banking, BankingDocument} from '@database/datamodels/schemas/banking';
import {Bet, BetDocument} from '@database/datamodels/schemas/bet';
import {Play} from '@database/datamodels/schemas/play';
import {BetDto} from '@src/modules/betting.panel/dtos/bet.dto';
import {CreateBetDto} from '@src/modules/betting.panel/dtos/create.bet.dto';
import {BetStatus} from '@database/datamodels/enums/bet.status';
import {UpdateBetDto} from "@src/modules/betting.panel/dtos/update.bet.dto";

@Injectable()
export class BettingPanelService {
    constructor(
        @InjectModel(Bet.name) private betModel: Model<BetDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Banking.name) private bankingModel: Model<BankingDocument>,
        private userAuthService: AuthUserService,
        private userService: UserService,
    ) {}

    async getAll(loggedUser: UserDocument): Promise<Array<Bet>> {
        const banking = (await this.bankingModel.find({ ownerUserId: loggedUser._id })).pop();
        return banking.bets.reverse();
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

    async create(dto: CreateBetDto, loggedUser: UserDocument): Promise<BetDto> {
        const banking = (await this.bankingModel.find({ ownerUserId: loggedUser._id })).pop();
        const plays: Play[] = [];
        dto.plays.map((play) => {
            play.playNumbers.creationUserId = loggedUser._id;
            play.playNumbers.modificationUserId = loggedUser._id;
            plays.push({
                playNumbers: play.playNumbers,
                amount: play.amount,
                creationUserId: loggedUser._id,
                lotteryId: play.lotteryId,
                modificationUserId: loggedUser._id,
                playType: play.playType,
            });
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
        await banking.save();
        return this.mapToDto(newObject);
    }

    async cancelBet(dto: UpdateBetDto, loggedUser: UserDocument): Promise<BetDto> {
        const banking = (await this.bankingModel.find({ ownerUserId: loggedUser._id })).pop();
        const bet = banking.bets.filter((bet) => bet._id.toString() === dto._id.toString()).pop();
        if (bet.betStatus !== BetStatus.pending || !(await this.canCancelTicket(bet))) {
            throw new BadRequestException();
        }
        let betFounded: BetDocument = null;
        banking.bets.map((bet: BetDocument) => {
            if (bet._id.toString() === dto._id.toString()) {
                bet.betStatus = BetStatus.cancelled;
                betFounded = bet;
            }
        });
        await banking.save();
        return this.mapToDto(betFounded);
    }

    private async canCancelTicket(bet: Bet): Promise<boolean> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const diffMs = new Date(bet.date) - new Date();
        const diffMins = diffMs / 60000; // minutes
        return diffMins > -5;
    }

    async get(id: string): Promise<BetDto> {
        return this.mapToDto(await this.betModel.findById(id).exec());
    }

    async mapToDto(bet: BetDocument): Promise<BetDto> {
        const { _id, plays, date, sn, betStatus } = bet;
        return {
            _id,
            plays,
            date,
            sn,
            betStatus,
        };
    }

    private async createSN(): Promise<string> {
        return new Date().getTime().toString() + parseInt(String(Math.random() * (999 - 100) + 100), 0).toString();
    }
}
