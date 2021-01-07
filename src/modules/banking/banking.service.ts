import {BadRequestException, Injectable} from "@nestjs/common";
import {UserDocument} from "@database/datamodels/schemas/user";
import {UserService} from "@users/user.service";
import {InjectModel} from "@nestjs/mongoose";
import {CreateBankingDto} from "@src/modules/banking/dto/create.banking.dto";
import {Role} from "@database/datamodels/enums/role";
import {Consortium, ConsortiumDocument} from "@database/datamodels/schemas/consortium";
import {Model, ObjectId} from "mongoose";
import {BankingDto} from "@src/modules/banking/dto/banking.dto";
import {UpdateBankingDto} from "@src/modules/banking/dto/update.banking.dto";
import {Banking, BankingDocument} from "@database/datamodels/schemas/banking";
import { AuthUserService } from "../auth.user/auth.user..service";


@Injectable()
export class BankingService {
    constructor(
        @InjectModel(Consortium.name) private consortiumModel: Model<ConsortiumDocument>,
        @InjectModel(Banking.name) private bankingModel: Model<BankingDocument>,
        private userAuthService: AuthUserService,
        private userService: UserService
    ) {
    }


    async findAll(loggedUser: UserDocument): Promise<BankingDto[]> {
        let bankings = [];
        switch (loggedUser.role) {
            case Role.admin:
                bankings = await this.bankingModel.find().exec();
                break;
            case Role.consortium:
                const consortiums = await this.consortiumModel.find({ownerUserId: loggedUser._id}).exec();
                if(consortiums.length === 0){
                    throw new BadRequestException();
                }
                const consortium = consortiums.pop();
                bankings = await this.bankingModel.find({consortiumId:consortium._id}).exec();
                break;
            default:
                throw new BadRequestException();
        }
        //TODO no se trae el username
        return Promise.all(bankings.map(banking => this.mapToUser(banking)));
    }

    async getFiltered(field: string, value: any, loggedUser: UserDocument): Promise<BankingDto[]> {
        let bankings = [];
        switch (loggedUser.role) {
            case Role.admin:
                bankings = await this.bankingModel.find().exec();
                break;
            case Role.consortium:
                const consortiums = await this.consortiumModel.find({ownerUserId: loggedUser._id}).exec();
                if(consortiums.length === 0){
                    throw new BadRequestException();
                }
                const consortium = consortiums.pop();
                bankings = await this.bankingModel.find({consortiumId:consortium._id}).exec();
                break;
            default:
                throw new BadRequestException();
        }

        return Promise.all(bankings.filter((banking: BankingDocument) =>
            banking[field as keyof BankingDocument] === value).map(banking => this.mapToUser(banking)));
    }

    async create(createBankingDto: CreateBankingDto, loggedUser: UserDocument): Promise<Banking> {
        //TODO handle transaction
        const consortium = await this.getConsortiumOfUser(createBankingDto.consortiumId, loggedUser);

        //The rol is harcoded to prevent issues
        createBankingDto.user.role = Role.banker
        const createdUser = (await this.userAuthService.singUp(createBankingDto.user, loggedUser)).user;
        const newObject = new this.bankingModel({
            name: createBankingDto.banking.name,
            status: createBankingDto.banking.status,
            consortiumId: consortium._id,
            ownerUserId: createdUser.id,
            showPercentage: createBankingDto.banking.showPercentage,
            creationUserId: loggedUser._id,
            modificationUserId: loggedUser._id,
        });
        await newObject.save();
        return newObject;
    }

    async update(updateBankingDto: UpdateBankingDto, loggedUser: UserDocument): Promise<Banking> {
        //TODO handle transaction
        const consortium = await this.getConsortiumOfUser(updateBankingDto.selectedConsortium, loggedUser);

        //TODO UPDATE user
        //await this.userAuthService.updateUsername(updateBankingDto.ownerUserId, updateBankingDto.user.username, loggedUser);
        const banking = await this.bankingModel.findById(updateBankingDto._id);
        banking.name = updateBankingDto.name;
        banking.status = updateBankingDto.status;
        banking.showPercentage = updateBankingDto.showPercentage;
        //Solo si es admin se modifica este parametro sino se pisa con el mismo
        banking.consortiumId = consortium._id;
        banking.modificationUserId = loggedUser._id;
        await banking.save();
        return banking;
    }

    async delete(id: string, loggedUser: UserDocument) {
        const banking = await this.bankingModel.findById(id).exec();
        if(loggedUser.role === Role.consortium) {
            const consortiums = await this.consortiumModel.find({ownerUserId: loggedUser._id}).exec();
            if(consortiums.length === 0){
                throw new BadRequestException();
            }
            const consortium = consortiums.pop();
            if(consortium.id.toString() !== banking.consortiumId.toString()){
                //Cant modify a bank that is not yours
                throw new BadRequestException();
            }
        }

        await this.userAuthService.deleteUser(banking.ownerUserId);
        return this.bankingModel.findByIdAndRemove(id).exec();
    }

    private async mapToUser(banking: BankingDto): Promise<BankingDto> {
        let bankingUser = (await this.userService.getFiltered('_id', banking.ownerUserId)).pop();
        if (bankingUser) {
            banking.ownerUsername = bankingUser.username;
        }
        return banking;
    }


    private async getConsortiumOfUser(consortiumId: ObjectId, loggedUser: UserDocument): Promise<Consortium> {
        let consortium: Consortium;
        if(loggedUser.role === Role.consortium) {
            //If is consortiums selects his consortium
            const consortiums = await this.consortiumModel.find({ownerUserId: loggedUser._id}).exec();
            if(consortiums.length === 0){
                throw new BadRequestException();
            }
            consortium = consortiums.pop();
            if(consortiumId && consortium._id.toString() !== consortiumId.toString()){
                //Doesnt have permission to modify another consortium
                throw new BadRequestException();
            }
        } else {
            //If is admin
            consortium = await this.consortiumModel.findOne({_id: consortiumId}).exec()
            if(!consortium){
                throw new BadRequestException();
            }
        }
        return consortium
    }
}
