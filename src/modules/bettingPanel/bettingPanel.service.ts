import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@database/datamodels/schemas/user';
import { AuthUserService } from '@src/modules/auth.user/auth.user..service';
import { UserService } from '@users/user.service';
import { Banking, BankingDocument } from '@database/datamodels/schemas/banking';
import { Bet, BetDocument } from '@database/datamodels/schemas/bet';
import { BetDto } from '@src/modules/bettingPanel/dtos/bet.dto';
import { CreateBetDto } from '@src/modules/bettingPanel/dtos/create.bet.dto';

@Injectable()
export class BettingPanelService {
    constructor(
        @InjectModel(Bet.name) private betModel: Model<BetDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Banking.name) private bankingModel: Model<BankingDocument>,
        private userAuthService: AuthUserService,
        private userService: UserService,
    ) {}

    async getAll(): Promise<Array<BetDto>> {
        const bets: Array<BetDocument> = await this.betModel.find({}).exec();
        const betsDto: BetDto[] = [];
        for await (const bet of bets) {
            betsDto.push(await this.mapToDto(bet));
        }
        return betsDto;
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
        //CREATE user
        console.log(dto, loggedUser);
        const newObject = new this.betModel({
            // name: dto.name,
            // status: dto.status,
            // ownerUserId: createdUser.id,
            // creationUserId: loggedUser._id,
            // modificationUserId: loggedUser._id,
        });
        await newObject.save();
        return this.mapToDto(newObject);
    }

    async get(id: string): Promise<BetDto> {
        return this.mapToDto(await this.betModel.findById(id).exec());
    }

    async mapToDto(bet: BetDocument): Promise<BetDto> {
        return {
            _id: bet._id,
        };
    }
}
