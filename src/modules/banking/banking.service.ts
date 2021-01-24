import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { User } from '@database/datamodels/schemas/user';
import { UsersService } from '@users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBankingDto } from '@src/modules/banking/dto/create.banking.dto';
import { Role } from '@database/datamodels/enums/role';
import { Model } from 'mongoose';
import { BankingDto } from '@src/modules/banking/dto/banking.dto';
import { UpdateBankingDto } from '@src/modules/banking/dto/update.banking.dto';
import { Banking } from '@database/datamodels/schemas/banking';
import { AuthUserService } from '@auth.user/auth.user.service';
import { ConsortiumService } from '../consortiums/consortium.service';

@Injectable()
export class BankingService {
    constructor(
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        @Inject(forwardRef(() => AuthUserService))
        private readonly userAuthService: AuthUserService,
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,
        private readonly consortiumService: ConsortiumService,
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
                throw new BadRequestException();
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
                throw new BadRequestException();
        }
        const bankings: Array<Banking> = await this.bankingModel.find({ [field]: value }).exec();
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
            default:
                throw new BadRequestException();
        }
        const banking: Banking = (await this.bankingModel.find({ [field]: value }).exec()).pop();
        return this.mapBanking(banking);
    }

    async create(createBankingDto: CreateBankingDto, loggedUser: User): Promise<Banking> {
        const consortium = await this.consortiumService.getConsortiumForUser(createBankingDto.consortiumId, loggedUser);

        //The rol is hardcoded to prevent issues
        createBankingDto.user.role = Role.banker;

        let createdUser: User;
        let newObject: Banking;
        try {
            createdUser = (await this.userAuthService.singUp(createBankingDto.user, loggedUser)).user;
            newObject = new this.bankingModel({
                name: createBankingDto.banking.name,
                status: createBankingDto.banking.status,
                consortiumId: consortium._id,
                ownerUserId: createdUser.id,
                showPercentage: createBankingDto.banking.showPercentage,
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
            });
            await newObject.save();
        } catch (e) {
            if (createdUser) {
                await this.userService.delete(createdUser._id);
            }
            throw new BadRequestException();
        }
        return newObject;
    }

    async update(updateBankingDto: UpdateBankingDto, loggedUser: User): Promise<Banking> {
        const consortium = await this.consortiumService.getConsortiumForUser(
            updateBankingDto.selectedConsortium,
            loggedUser,
        );

        await this.userAuthService.updateUser(updateBankingDto.ownerUserId, updateBankingDto.user, loggedUser);
        const banking: Banking = await this.bankingModel.findById(updateBankingDto._id);
        banking.name = updateBankingDto.name;
        banking.status = updateBankingDto.status;
        banking.showPercentage = updateBankingDto.showPercentage;
        banking.consortiumId = loggedUser.role === Role.admin ? consortium._id : banking.consortiumId;
        banking.modificationUserId = loggedUser._id;
        //TODO checkear que el modificatedAt cambie
        await banking.save();
        return banking;
    }

    async delete(id: string, loggedUser: User) {
        const banking = await this.bankingModel.findById(id).exec();
        if (loggedUser.role === Role.consortium) {
            const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
            if (consortium._id.toString() !== banking.consortiumId.toString()) {
                //Cant modify a bank that is not yours
                throw new BadRequestException();
            }
        }
        await this.userAuthService.deleteUser(banking.ownerUserId);
        return this.bankingModel.findByIdAndRemove(id).exec();
    }

    private async mapBanking(banking: BankingDto): Promise<BankingDto> {
        // we get the username of the assigned user
        const bankingUser = await this.userService.getSingleFiltered('_id', banking.ownerUserId);
        return {
            _id: banking._id,
            consortiumId: banking.consortiumId,
            createdAt: banking.createdAt,
            name: banking.name,
            ownerUserId: banking.ownerUserId,
            showPercentage: banking.showPercentage,
            startOfOperation: banking.startOfOperation,
            status: banking.status,
            ownerUsername: bankingUser ? bankingUser.username : null,
            ownerName: bankingUser ? bankingUser.name : null,
        };
    }

    async getBankingName(loggedUser: User): Promise<string> {
        return (await this.getSingleFiltered('ownerUserId', loggedUser._id, loggedUser)).name;
    }
}
