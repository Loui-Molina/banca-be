import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateBankingDto} from './dto/create-banking.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Consortium, ConsortiumDocument} from '@database/datamodels/schemas/consortium';
import {Model} from 'mongoose';
import {UserAuthService} from '@users/user.auth.service';
import {BankingDto} from '@src/modules/banking/dto/banking.dto';
import {UserDocument} from '@database/datamodels/schemas/user';
import {Role} from '@database/datamodels/enums/role';
import {Banking} from '@database/datamodels/schemas/banking';
import {UserService} from "@users/user.service";
import {ConsortiumService} from "@src/modules/consortiums/consortium.service";

@Injectable()
export class BankingService {
    constructor(
        @InjectModel(Consortium.name) private consortiumModel: Model<ConsortiumDocument>,
        private userAuthService: UserAuthService,
        private userService: UserService,
        private consortiumService: ConsortiumService
    ) {
    }

    async create(createBankingDto: CreateBankingDto, loggedUser: UserDocument) {
        if (loggedUser.role === Role.consortium) {
            createBankingDto.consortiumId =
                (await this.consortiumService.getFiltered('ownerUserId', loggedUser._id)).pop()._id;
            //TODO DONT GET CLOSE, IT WILL STEAL FROM YOU
        }
        let consortium = await this.consortiumModel.findOne({_id: createBankingDto.consortiumId}).exec();
        let createdUser: UserDocument;
        try {
            if (consortium) {
                createdUser = (await this.userAuthService.singUp({...createBankingDto.user})).user;
                let newBaking: BankingDto = createBankingDto.banking;
                consortium.bankings.push({
                    name: newBaking.name,
                    balance: 0,
                    creationUserId: loggedUser._id,
                    modificationUserId: loggedUser._id,
                    ownerUserId: createdUser._id,
                });
                await consortium.save();
                return newBaking;
            }
        } catch (e) {
            this.userService.delete(createdUser._id);
        }
        throw new BadRequestException();
    }

    async findAll(loggedUser: UserDocument): Promise<BankingDto[]> {
        let filter;
        switch (loggedUser.role) {
            case Role.admin:
                filter = {};
                break;
            case Role.consortium:
                filter = {ownerUserId: loggedUser._id};
                break;
            default:
                return [];
        }
        let bankings: BankingDto[] = await this.consortiumModel.aggregate([
            {$match: filter},
            {$unwind: '$bankings'},
            {
                $project: {
                    _id:'$banking._id',
                    name:'$banking.name',
                    status:'$banking.status',
                    ownerUserId:'$banking.ownerUserId',
                    creationDate:'$banking.createdAt',
                    startOfOperation:'$banking.firstTransactionDate',
                    showPercentage:'$banking.showPercentage',
                }
            }]);
        console.log(bankings)
        let bankingDtos = bankings.map(bankings => this.mapToUser(bankings));
        console.log(bankingDtos)
        return bankingDtos;
    }

    findOne(id: string) {
        return `This action returns a #${id} banking`;
    }

    update(updateBankingDto: BankingDto) {
        return `This action updates a #${updateBankingDto._id} banking`;
    }

    remove(id: string) {
        return `This action removes a #${id} banking`;
    }

    private mapToUser(banking: BankingDto): BankingDto {
        return banking;
    }
}
