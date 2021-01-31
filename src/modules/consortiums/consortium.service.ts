import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ConsortiumDto } from '@consortiums/dtos/consortium.dto';
import { Consortium } from '@database/datamodels/schemas/consortium';
import { User } from '@database/datamodels/schemas/user';
import { AuthUserService } from '@auth.user/auth.user.service';
import { Role } from '@database/datamodels/enums/role';
import { CreateConsortiumDto } from '@consortiums/dtos/create.consortium.dto';
import { UsersService } from '@users/users.service';
import { Banking } from '@database/datamodels/schemas/banking';

@Injectable()
export class ConsortiumService {
    constructor(
        @InjectModel(Consortium.name) private consortiumModel: Model<Consortium>,
        @InjectModel(Banking.name) private bankingModel: Model<Banking>,
        private readonly userAuthService: AuthUserService,
        private readonly userService: UsersService,
    ) {}

    async getAll(): Promise<Array<ConsortiumDto>> {
        const consortiums: Array<Consortium> = await this.consortiumModel.find({}).exec();
        return Promise.all(consortiums.map((consortium) => this.mapToUser(consortium)));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    async getFiltered(q: string, value: any): Promise<Array<Consortium>> {
        return this.consortiumModel.find({ [q]: value }).exec();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    async getSingleFiltered(q: string, value: any): Promise<Consortium> {
        return (await this.consortiumModel.find({ [q]: value }).exec()).pop();
    }

    async create(dto: CreateConsortiumDto, loggedUser: User): Promise<Consortium> {
        //CREATE user
        dto.user.role = Role.consortium;
        const createdUser = (await this.userAuthService.signUp(dto.user, loggedUser)).user;
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

    async update(dto: CreateConsortiumDto, loggedUser: User): Promise<Consortium> {
        //UPDATE user
        await this.userAuthService.updateUser(dto.ownerUserId, dto.user, loggedUser);

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
        const bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
        bankings.map((banking) => {
            this.userAuthService.deleteUser(banking.ownerUserId);
            this.bankingModel.findByIdAndRemove({ id: banking._id }).exec();
        });
        bankings.map((banking) => {
            this.bankingModel.findByIdAndRemove(banking._id).exec();
        });
        return this.consortiumModel.findByIdAndRemove(id).exec();
    }

    async get(id: string): Promise<Consortium> {
        return await this.consortiumModel.findById(id).exec();
    }

    async mapToUser(consortium: Consortium): Promise<ConsortiumDto> {
        const foundUser = await this.userService.getSingleFiltered('_id', consortium.ownerUserId);
        const bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
        return {
            _id: consortium._id,
            name: consortium.name,
            startOfOperation: consortium.startOfOperation,
            status: consortium.status,
            createdAt: consortium.createdAt,
            bankings,
            ownerId: consortium.ownerUserId,
            ownerName: foundUser.name,
            ownerUsername: foundUser.username,
        } as ConsortiumDto;
    }

    // Returns the consortium if the user can modify it
    async getConsortiumForUser(consortiumId: ObjectId, loggedUser: User): Promise<Consortium> {
        let consortium: Consortium;
        if (loggedUser.role === Role.consortium) {
            //If is consortiums selects his consortium
            consortium = await this.getConsortiumOfUser(loggedUser);
            if (consortium && consortiumId && consortium._id.toString() !== consortiumId.toString()) {
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
        return consortium;
    }

    async getConsortiumOfUser(loggedUser: User): Promise<Consortium> {
        const consortiums = await this.consortiumModel.find({ ownerUserId: loggedUser._id });
        if (consortiums.length === 0) {
            throw new BadRequestException();
        }
        return consortiums.pop();
    }

    async getConsortiumName(loggedUser: User) {
        return (await this.getSingleFiltered('ownerUserId', loggedUser._id)).name;
    }
}
