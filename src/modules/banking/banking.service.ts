import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDocument } from '@database/datamodels/schemas/user';
import { UserService } from '@users/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBankingDto } from '@src/modules/banking/dto/create.banking.dto';
import { Role } from '@database/datamodels/enums/role';
import { Model } from 'mongoose';
import { BankingDto } from '@src/modules/banking/dto/banking.dto';
import { UpdateBankingDto } from '@src/modules/banking/dto/update.banking.dto';
import { Banking, BankingDocument } from '@database/datamodels/schemas/banking';
import { AuthUserService } from '../auth.user/auth.user.service';
import { ConsortiumService } from '@src/modules/consortiums/consortium.service';

@Injectable()
export class BankingService {
    constructor(
        @InjectModel(Banking.name) private bankingModel: Model<BankingDocument>,
        private userAuthService: AuthUserService,
        private userService: UserService,
        private consortiumService: ConsortiumService,
    ) {}

    async findAll(loggedUser: UserDocument): Promise<BankingDto[]> {
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

        const bankings: Array<BankingDocument> = await this.bankingModel.find(filter).exec();
        const bankingsDto: BankingDto[] = [];
        for await (const banking of bankings) {
            bankingsDto.push(await this.mapBanking(banking));
        }
        return bankingsDto;
    }

    async getFiltered(field: string, value: any, loggedUser: UserDocument): Promise<BankingDto[]> {
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
        const bankings: Array<BankingDocument> = await this.bankingModel.find({ [field]: value }).exec();
        return Promise.all(
            bankings
                .filter((banking: BankingDocument) => banking[field as keyof BankingDocument] === value)
                .map((banking) => this.mapBanking(banking)),
        );
    }

    async create(createBankingDto: CreateBankingDto, loggedUser: UserDocument): Promise<Banking> {
        const consortium = await this.consortiumService.getConsortiumForUser(createBankingDto.consortiumId, loggedUser);

        //The rol is hardcoded to prevent issues
        createBankingDto.user.role = Role.banker;

        let createdUser: UserDocument;
        let newObject: BankingDocument;
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

    async update(updateBankingDto: UpdateBankingDto, loggedUser: UserDocument): Promise<Banking> {
        const consortium = await this.consortiumService.getConsortiumForUser(
            updateBankingDto.selectedConsortium,
            loggedUser,
        );

        //TODO UPDATE user
        //await this.userAuthService.updateUsername(updateBankingDto.ownerUserId, updateBankingDto.user.username, loggedUser);
        const banking = await this.bankingModel.findById(updateBankingDto._id);
        banking.name = updateBankingDto.name;
        banking.status = updateBankingDto.status;
        banking.showPercentage = updateBankingDto.showPercentage;
        banking.consortiumId = loggedUser.role === Role.admin ? consortium._id : banking.consortiumId;
        banking.modificationUserId = loggedUser._id;
        //TODO checkear que el modificatedAt cambie
        await banking.save();
        return banking;
    }

    async delete(id: string, loggedUser: UserDocument) {
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
        const bankingUser = (await this.userService.getFiltered('_id', banking.ownerUserId)).pop();
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
        };
    }
}
