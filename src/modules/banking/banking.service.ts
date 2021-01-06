import {BadRequestException, Injectable} from "@nestjs/common";
import {UserDocument} from "@database/datamodels/schemas/user";
import {UserService} from "@users/user.service";
import {InjectModel} from "@nestjs/mongoose";
import {CreateBankingDto} from "@src/modules/banking/dto/create.banking.dto";
import {Role} from "@database/datamodels/enums/role";
import {Consortium, ConsortiumDocument} from "@database/datamodels/schemas/consortium";
import {Model} from "mongoose";
import {ConsortiumService} from "@src/modules/consortiums/consortium.service";
import {BankingDto} from "@src/modules/banking/dto/banking.dto";
import {UpdateBankingDto} from "@src/modules/banking/dto/update.banking.dto";
import {BankingDocument} from "@database/datamodels/schemas/banking";
import {DeleteBankingDto} from "@src/modules/banking/dto/delete.banking.dto";
import { AuthUserService } from "../auth.user/auth.user..service";


@Injectable()
export class BankingService {
    constructor(
        @InjectModel(Consortium.name) private consortiumModel: Model<ConsortiumDocument>,
        private userAuthService: AuthUserService,
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
                createdUser = (await this.userAuthService.singUp({...createBankingDto.user}, loggedUser)).user;
                let newBaking: BankingDto = createBankingDto.banking;
                consortium.bankings.push({
                    ...newBaking,
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
        let bankings = await this.consortiumModel.aggregate([
            {$match: filter},
            {$unwind: '$bankings'},
            {
                $project: {
                    _id: '$bankings._id',
                    name: '$bankings.name',
                    status: '$bankings.status',
                    ownerUserId: '$bankings.ownerUserId',
                    creationDate: '$bankings.createdAt',
                    startOfOperation: '$bankings.firstTransactionDate',
                    showPercentage: '$bankings.showPercentage',
                    selectedConsortium: '$_id'
                }
            }]);
        return Promise.all(bankings.map(bankings => this.mapToUser(bankings)));
    }

    async getFiltered(field: string, value: any, loggedUser: UserDocument) {
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
        let consortiums: Array<ConsortiumDocument> = await this.consortiumModel.find(filter).exec();

        return consortiums.filter(
            consortium => consortium.bankings.filter(
                (banking: BankingDocument) => banking[field as keyof BankingDocument] === value)
        );
    }

    async update(updateBankingDto: UpdateBankingDto) {
        console.log(updateBankingDto)
        let consortium: ConsortiumDocument = (await this.consortiumModel.findById(updateBankingDto.selectedConsortium));
        consortium.bankings.map(
            (banking: BankingDocument, index: number) => {
                if ((updateBankingDto._id).toString() === (banking._id).toString()) {
                    banking.name = (updateBankingDto.name) ? updateBankingDto.name : banking.name;
                    banking.status = (updateBankingDto.status) ? updateBankingDto.status : banking.status;
                    banking.ownerUserId = (updateBankingDto.ownerUserId) ? updateBankingDto.ownerUserId : banking.ownerUserId;
                    banking.showPercentage = (updateBankingDto.showPercentage) ? updateBankingDto.showPercentage : banking.showPercentage;
                    // consortium.markModified('bankings');
                    console.log(`update name ${updateBankingDto.name}`);
                    console.log('update name ${updateBankingDto.name}');
                    console.log(banking)
                }
                return banking;
            });
        console.log(consortium.isModified())
        await consortium.save();
        return updateBankingDto;
    }

    async remove(deleteBankingDto: DeleteBankingDto) {
        let consortium: ConsortiumDocument = (await this.consortiumModel.findById(deleteBankingDto.consortiumId));
        consortium.bankings.splice(
            consortium.bankings.findIndex((banking: BankingDocument) => banking._id === deleteBankingDto.bankingId),
            1)
        consortium.save();
    }

    private async mapToUser(banking: BankingDto): Promise<BankingDto> {
        let bankingUser = (await this.userService.getFiltered('_id', banking.ownerUserId)).pop();
        if (bankingUser) {
            banking.ownerUsername = bankingUser.username;
        }
        return banking;
    }
}
