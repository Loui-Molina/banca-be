import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@database/datamodels/schemas/user';
import { UsersService } from '@users/users.service';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateBankingDto } from '@bankings/dto/create.banking.dto';
import { Role } from '@database/datamodels/enums/role';
import { Connection, Model, ObjectId } from 'mongoose';
import { BankingDto } from '@bankings/dto/banking.dto';
import { UpdateBankingDto } from '@bankings/dto/update.banking.dto';
import { Banking } from '@database/datamodels/schemas/banking';
import { AuthUserService } from '@auth.user/auth.user.service';
import { ConsortiumService } from '@consortiums/consortium.service';
import { ConstApp } from '@utils/const.app';
import { CreateEvent } from '../events/events/create.event';
import { EventsConst } from '../events/events.const';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateBankingEvent } from '../events/events/banking/create.banking.event';

@Injectable()
export class BankingsService {
    constructor(
        private readonly usersService: UsersService,
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        private readonly userAuthService: AuthUserService,
        private readonly consortiumService: ConsortiumService,
        @InjectConnection(ConstApp.BANKING) private readonly connection: Connection,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async findAll(loggedUser: User): Promise<BankingDto[]> {
        let filter;
        switch (loggedUser.role) {
            case Role.admin:
                filter = {};
                break;
            case Role.consortium:
                // eslint-disable-next-line no-case-declarations
                const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
                filter = { consortiumId: consortium._id };
                break;
            default:
                throw new BadRequestException(ConstApp.UNAUTHORIZED);
        }

        const bankings: Array<Banking> = await this.bankingModel.find(filter).exec();
        const bankingsDto: BankingDto[] = [];
        for await (const banking of bankings) {
            bankingsDto.push(await this.mapBanking(banking));
        }
        return bankingsDto;
    }

    async getFiltered(field: string, value: any, loggedUser: User): Promise<BankingDto[]> {
        let filter;
        switch (loggedUser.role) {
            case Role.admin:
                filter = { [field]: value };
                break;
            case Role.consortium:
                // eslint-disable-next-line no-case-declarations
                const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
                filter = { [field]: value, consortiumId: consortium._id };
                break;
            default:
                throw new BadRequestException(ConstApp.UNAUTHORIZED);
        }
        const bankings: Array<Banking> = await this.bankingModel.find(filter).exec();
        return Promise.all(
            bankings
                .filter((banking: Banking) => banking[field as keyof Banking] === value)
                .map((banking) => this.mapBanking(banking)),
        );
    }

    async getSingleFiltered(field: string, value: any, loggedUser: User): Promise<BankingDto> {
        let filter;
        switch (loggedUser.role) {
            case Role.admin:
                filter = { [field]: value };
                break;
            case Role.consortium:
                // eslint-disable-next-line no-case-declarations
                const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
                filter = { [field]: value, consortiumId: consortium._id };
                break;
            case Role.banker:
                filter = { [field]: value, ownerUserId: loggedUser._id };
                break;
            default:
                throw new BadRequestException(ConstApp.UNAUTHORIZED);
        }
        // TODO aca falta chekear Role.banker para devolver en establishment name
        const banking: Banking = await this.bankingModel.findOne(filter).exec();
        return this.mapBanking(banking);
    }

    async create(createBankingDto: CreateBankingDto, loggedUser: User): Promise<Banking> {
        const consortium = await this.consortiumService.getConsortiumForUser(createBankingDto.consortiumId, loggedUser);
        const {
            showPercentage,
            name,
            status,
            earningPercentage,
            header,
            footer,
            cancellationTime,
        } = createBankingDto.banking;
        if (!consortium.startOfOperation) {
            //Inicio de operacion
            consortium.startOfOperation = new Date();
        }
        //The rol is hardcoded to prevent issues
        createBankingDto.user.role = Role.banker;

        let createdUser: User;
        let banking: Banking;
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            createdUser = (await this.userAuthService.signUp(createBankingDto.user, loggedUser)).user;
            banking = new this.bankingModel({
                name,
                status,
                consortiumId: consortium._id,
                ownerUserId: createdUser.id,
                showPercentage: showPercentage,
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
                earningPercentage,
                cancellationTime,
                header,
                footer,
            } as Banking);
            await banking.save();
            await consortium.save();
            let createBanking = new CreateBankingEvent();
            //createBanking.id = banking._id;
            createBanking.description = EventsConst.CREATE_BANKING;
            this.eventEmitter.emit(EventsConst.CREATE_EVENT, createBanking);  
            session.commitTransaction();
        } catch (e) {
            session.abortTransaction();
            if (createdUser) {
                await this.usersService.delete(createdUser._id);
            }
            throw new BadRequestException(ConstApp.SOMETHING_WRONG_EXCEPTION);
        }
        finally{
            session.endSession();
        }
        return banking;
    }

    async update(updateBankingDto: UpdateBankingDto, loggedUser: User): Promise<Banking> {
        const consortium = await this.consortiumService.getConsortiumForUser(
            updateBankingDto.selectedConsortium,
            loggedUser,
        );

        //FIXME TRANSACTION
        await this.userAuthService.updateUser(updateBankingDto.ownerUserId, updateBankingDto.user, loggedUser);
        const banking: Banking = await this.bankingModel.findById(updateBankingDto._id);
        banking.name = updateBankingDto.name;
        banking.status = updateBankingDto.status;
        banking.showPercentage = updateBankingDto.showPercentage;
        banking.cancellationTime = updateBankingDto.cancellationTime;
        banking.consortiumId = loggedUser.role === Role.admin ? consortium._id : banking.consortiumId;
        banking.modificationUserId = loggedUser._id;
        banking.header = updateBankingDto.header;
        banking.footer = updateBankingDto.footer;
        //TODO checkear que el modificatedAt cambie
        await banking.save();
        return banking;
    }

    async delete(id: string | ObjectId, loggedUser: User) {
        const banking = await this.bankingModel.findById(id).exec();
        if (loggedUser.role === Role.consortium) {
            const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
            if (consortium._id.toString() !== banking.consortiumId.toString()) {
                //Cant modify a bank that is not yours
                throw new BadRequestException(ConstApp.ESTABLISHMENT_NOT_FOUND);
            }
        }
        await this.userAuthService.deleteUser(banking.ownerUserId);
        return this.bankingModel.findByIdAndRemove(id).exec();
    }

    async getBankingName(loggedUser: User): Promise<string> {
        return (await this.getSingleFiltered('ownerUserId', loggedUser._id, loggedUser)).name;
    }

    private async mapBanking(banking: BankingDto): Promise<BankingDto> {
        // we get the username of the assigned user
        const bankingUser = await this.usersService.findOne('_id', banking.ownerUserId);
        return {
            _id: banking._id,
            consortiumId: banking.consortiumId,
            createdAt: banking.createdAt,
            name: banking.name,
            ownerUserId: banking.ownerUserId,
            showPercentage: banking.showPercentage,
            startOfOperation: banking.startOfOperation,
            status: banking.status,
            earningPercentage: banking.earningPercentage,
            ownerUsername: bankingUser ? bankingUser.username : null,
            ownerName: bankingUser ? bankingUser.name : null,
            header: banking.header,
            footer: banking.footer,
            cancellationTime: banking.cancellationTime,
        };
    }

    /**
     * METHODS THAT RETURN THE UNALTERED DOCUMENT
     * DO NOT RETURN THIS TO THE FRONT END
     * ONLY FOR INTERNAL USE
     * */

    async findAllDocuments(loggedUser: User): Promise<Banking[]> {
        let filter;
        switch (loggedUser.role) {
            case Role.admin:
                filter = {};
                break;
            case Role.consortium:
                // eslint-disable-next-line no-case-declarations
                const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
                filter = { consortiumId: consortium._id };
                break;
            default:
                throw new BadRequestException(ConstApp.UNAUTHORIZED);
        }
        return await this.bankingModel.find(filter).exec();
    }

    async getFilteredDocuments(field: string, value: any, loggedUser: User): Promise<Banking[]> {
        let filter;
        switch (loggedUser.role) {
            case Role.admin:
                filter = { [field]: value };
                break;
            case Role.consortium:
                // eslint-disable-next-line no-case-declarations
                const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
                filter = { [field]: value, consortiumId: consortium._id };
                break;
            default:
                throw new BadRequestException(ConstApp.UNAUTHORIZED);
        }
        return await this.bankingModel.find(filter).exec();
    }

    async getSingleFilteredDocument(field: string, value: any, loggedUser: User): Promise<Banking> {
        let filter;
        switch (loggedUser.role) {
            case Role.admin:
                filter = { [field]: value };
                break;
            case Role.consortium:
                // eslint-disable-next-line no-case-declarations
                const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
                filter = { [field]: value, consortiumId: consortium._id };
                break;
            case Role.banker:
                filter = { [field]: value, ownerUserId: loggedUser._id };
                break;
            default:
                throw new BadRequestException(ConstApp.UNAUTHORIZED);
        }
        return (await this.bankingModel.find(filter).exec()).pop();
    }

    async getUserBanking(loggedUser: User): Promise<Banking> {
        if (loggedUser.role === Role.banker) {
            const banking = await this.bankingModel.findOne({ ownerUserId: loggedUser._id }).exec();
            if (!banking) throw new BadRequestException(ConstApp.ESTABLISHMENT_NOT_FOUND);
            return banking;
        }
        throw new BadRequestException(ConstApp.ESTABLISHMENT_NOT_FOUND);
    }
}
