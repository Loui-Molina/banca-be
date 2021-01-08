import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, ObjectId} from 'mongoose';
import {ConsortiumDto} from '@src/modules/consortiums/dtos/consortium.dto';
import {Consortium, ConsortiumDocument} from "@src/modules/database/datamodels/schemas/consortium";
import {User, UserDocument} from "@database/datamodels/schemas/user";
import {AuthUserService} from "@src/modules/auth.user/auth.user..service";
import {Role} from "@database/datamodels/enums/role";
import {CreateConsortiumDto} from "@src/modules/consortiums/dtos/create.consortium.dto";
import {UserService} from "@users/user.service";
import {Banking, BankingDocument} from "@database/datamodels/schemas/banking";

@Injectable()
export class ConsortiumService {
    constructor(@InjectModel(Consortium.name) private consortiumModel: Model<ConsortiumDocument>,
                @InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(Banking.name) private bankingModel: Model<BankingDocument>,
                private userAuthService: AuthUserService,
                private userService: UserService,
    ) {
    }

    async getAll(): Promise<Array<ConsortiumDto>> {
        let consortiums: Array<ConsortiumDocument> = await this.consortiumModel.find({}).exec();
        return Promise.all(consortiums.map(consortium => this.mapToUser(consortium)));
    }

    async getFiltered(q: string, value: any): Promise<Array<Consortium>> {
        return this.consortiumModel.find({[q]: value}).exec();
    }

    async create(dto: CreateConsortiumDto, loggedUser: UserDocument): Promise<Consortium> {
        //CREATE user
        dto.user.role = Role.consortium
        const createdUser = (await this.userAuthService.singUp(dto.user, loggedUser)).user;
        const newObject = new this.consortiumModel({
            name: dto.name,
            status: dto.status,
            ownerUserId: createdUser.id,
            creationUserId: loggedUser._id,
            modificationUserId: loggedUser._id,
        });
        await newObject.save();
        return newObject;
    }

    async update(dto: CreateConsortiumDto, loggedUser: UserDocument): Promise<Consortium> {
        //UPDATE user
        await this.userAuthService.updateUsername(dto.ownerUserId, dto.user.username, loggedUser);

        const consortium = await this.consortiumModel.findById(dto._id);
        consortium.name = dto.name;
        consortium.status = dto.status;
        consortium.modificationUserId = loggedUser._id;
        await consortium.save();
        return consortium;
    }

    async delete(id: string): Promise<Consortium> {
        //DELETE user
        const consortium = await this.get(id);
        await this.userAuthService.deleteUser(consortium.ownerUserId);
        const bankings = await this.bankingModel.find({consortiumId: consortium._id}).exec();
        bankings.map(banking => {
            this.userAuthService.deleteUser(banking.ownerUserId);
            this.bankingModel.findByIdAndRemove({id: banking._id}).exec();
        });

        return this.consortiumModel.findByIdAndRemove(id).exec();
    }

    async get(id: string): Promise<Consortium> {
        return await this.consortiumModel.findById(id).exec();
    }

    async mapToUser(consortium: ConsortiumDocument): Promise<ConsortiumDto> {
        let foundUser = (await this.userService.getFiltered('_id', consortium.ownerUserId)).pop();
        const bankings = await this.bankingModel.find({consortiumId: consortium._id}).exec();
        return {
            _id: consortium._id,
            name: consortium.name,
            firstTransactionDate: consortium.firstTransactionDate,
            status: consortium.status,
            createdAt: consortium.createdAt,
            bankings: bankings,
            ownerId: consortium.ownerUserId,
            ownerName: foundUser.name,
            ownerUsername: foundUser.username,
        } as ConsortiumDto;
    }


    // Returns the consortium if the user can modify it
    async getConsortiumForUser(consortiumId: ObjectId, loggedUser: UserDocument): Promise<Consortium> {
        let consortium: Consortium;
        if (loggedUser.role === Role.consortium) {
            //If is consortiums selects his consortium
            const consortiums = await this.getFiltered('ownerUserId', loggedUser._id);
            if (consortiums.length === 0) {
                throw new BadRequestException();
            }
            consortium = consortiums.pop();
            if (consortium &&
                consortiumId &&
                consortium._id.toString() !== consortiumId.toString()) {
                //Doesnt have permission to modify another consortium
                throw new BadRequestException();
            }
        } else {
            //If is admin
            consortium = await this.get(consortiumId.toString());
            if (!consortium) {
                throw new BadRequestException();
            }
        }
        return consortium
    }

}
