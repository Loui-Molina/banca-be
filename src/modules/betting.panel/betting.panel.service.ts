import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@database/datamodels/schemas/user';
import { Banking, BankingDocument } from '@database/datamodels/schemas/banking';
import { Bet, BetDocument } from '@database/datamodels/schemas/bet';
import { Play } from '@database/datamodels/schemas/play';
import { BetDto } from '@src/modules/betting.panel/dtos/bet.dto';
import { CreateBetDto } from '@src/modules/betting.panel/dtos/create.bet.dto';

@Injectable()
export class BettingPanelService {
    constructor(
        @InjectModel(Bet.name) private betModel: Model<BetDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Banking.name) private bankingModel: Model<BankingDocument>,
    ) {}

    async getAll(): Promise<Array<Bet>> {
        return await this.betModel.find({}).exec();
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
        });
        await banking.bets.push(newObject);
        await banking.save();
        return this.mapToDto(newObject);
    }

    async get(id: string): Promise<BetDto> {
        return this.mapToDto(await this.betModel.findById(id).exec());
    }

    async mapToDto(bet: BetDocument): Promise<BetDto> {
        return {
            _id: bet._id,
            plays: bet.plays,
            date: bet.date,
            sn: bet.sn,
        };
    }

    private async createSN(): Promise<string> {
        return new Date().getTime().toString() + parseInt(String(Math.random() * (999 - 100) + 100), 0).toString();
    }
}
