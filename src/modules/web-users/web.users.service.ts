import {BadRequestException, Injectable} from '@nestjs/common';
import {User} from '@database/datamodels/schemas/user';
import {UsersService} from '@users/users.service';
import {InjectModel} from '@nestjs/mongoose';
import {Model, ObjectId} from 'mongoose';
import {AuthUserService} from '@auth.user/auth.user.service';
import {ConsortiumService} from '@consortiums/consortium.service';
import {WebUser} from '@database/datamodels/schemas/web.user';
import {WebUserDto} from '@web.users/dto/web.user.dto';
import {CreateWebUserDto} from '@web.users/dto/create.web.user.dto';
import {UpdateWebUserDto} from '@web.users/dto/update.web.user.dto';
import {Role} from '@database/datamodels/enums/role';
import {BankingsService} from '@bankings/bankings.service';
import {Banking} from '@database/datamodels/schemas/banking';

@Injectable()
export class WebUsersService {
    constructor(
        private readonly usersService: UsersService,
        @InjectModel(WebUser.name) private readonly webUserModel: Model<WebUser>,
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        private readonly userAuthService: AuthUserService,
        private readonly consortiumService: ConsortiumService,
        private readonly bankingService: BankingsService,
    ) {}

    async findAll(loggedUser: User): Promise<WebUserDto[]> {
        /*let filter;
        switch (loggedUser.role) {
            case Role.admin:
                filter = {};
                break;
            case Role.consortium:
                // eslint-disable-next-line no-case-declarations
                const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
                filter = { consortiumId: consortium._id };
                break;
            case Role.banker:
                // eslint-disable-next-line no-case-declarations
                const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
                filter = { consortiumId: consortium._id };
                break;
            default:
                throw new BadRequestException();
        }

        const bankings: Array<WebUser> = await this.bankingModel.find(filter).exec();
        const bankingsDto: WebUserDto[] = [];
        for await (const banking of bankings) {
            bankingsDto.push(await this.mapWebUser(banking));
        }*/
        const webUsers: Array<WebUser> = await this.webUserModel.find().exec();
        const webUsersDto: WebUserDto[] = [];
        for await (const webUser of webUsers) {
            webUsersDto.push(await this.mapWebUser(webUser));
        }
        return webUsersDto;
    }

    async getFiltered(field: string, value: any, loggedUser: User): Promise<WebUserDto[]> {
        const webUsers: Array<WebUser> = await this.webUserModel.find().exec();
        const webUsersDto: WebUserDto[] = [];
        for await (const webUser of webUsers) {
            webUsersDto.push(await this.mapWebUser(webUser));
        }
        return webUsersDto;
    }

    async getSingleFiltered(field: string, value: any, loggedUser: User): Promise<WebUserDto> {
        return this.mapWebUser(await this.webUserModel.findOne().exec());
    }

    async create(dto: CreateWebUserDto, loggedUser: User): Promise<WebUser> {
        let banking: Banking;
        if (loggedUser.role === Role.banker) {
            banking = await this.bankingModel.findOne({ ownerUserId: loggedUser._id }).exec();
        } else {
            banking = await this.bankingModel.findById(dto.webUser.bankingId).exec();
        }
        if (!banking) {
            throw new BadRequestException();
        }
        //The rol is hardcoded to prevent issues
        dto.user.role = Role.webuser;

        let createdUser: User;
        let newObject: WebUser;
        try {
            createdUser = (await this.userAuthService.signUp(dto.user, loggedUser)).user;
            newObject = new this.webUserModel({
                bankingId: banking._id,
                status: dto.webUser.status,
                ownerUserId: createdUser._id,
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
            } as WebUser);
            await newObject.save();
        } catch (e) {
            if (createdUser) {
                await this.usersService.delete(createdUser._id);
            }
            throw new BadRequestException();
        }
        return newObject;
    }

    async update(dto: UpdateWebUserDto, loggedUser: User): Promise<WebUser> {
        let banking: Banking;
        if (loggedUser.role === Role.banker) {
            banking = await this.bankingModel.findOne({ ownerUserId: loggedUser._id }).exec();
        } else {
            banking = await this.bankingModel.findById(dto.webUser.bankingId).exec();
        }
        if (!banking) {
            throw new BadRequestException();
        }

        await this.userAuthService.updateUser(dto.user._id, dto.user, loggedUser);
        const webUser: WebUser = await this.webUserModel.findById(dto.webUser._id);
        webUser.status = dto.webUser.status;
        webUser.bankingId = loggedUser.role === Role.admin ? banking._id : webUser.bankingId;
        webUser.modificationUserId = loggedUser._id;
        await webUser.save();
        return null;
    }

    async delete(id: string | ObjectId, loggedUser: User) {
        const webUser = await this.webUserModel.findById(id).exec();
        /*if (loggedUser.role === Role.consortium) {
            const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
            if (consortium._id.toString() !== banking.consortiumId.toString()) {
                //Cant modify a bank that is not yours
                throw new BadRequestException();
            }
        }*/
        await this.userAuthService.deleteUser(webUser.ownerUserId);
        return this.webUserModel.findByIdAndRemove(id).exec();
    }

    async getWebUserName(loggedUser: User): Promise<string> {
        return loggedUser.name;
    }

    private async mapWebUser(webUser: WebUser): Promise<WebUserDto> {
        // we get the username of the assigned user
        const webUserUser = await this.usersService.getSingleFiltered('_id', webUser.ownerUserId);
        return {
            _id: webUser._id,
            status: webUser.status,
            ownerUserId: webUser.ownerUserId,
            bankingId: webUser.bankingId,
            ownerUsername: webUserUser.username,
            ownerName: webUserUser.name,
            createdAt: webUser.createdAt,
            startOfOperation: webUser.startOfOperation,
        };
    }
}
