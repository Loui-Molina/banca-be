import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ConsortiumDto} from '@src/modules/consortiums/dtos/consortium.dto';
import {Consortium, ConsortiumDocument} from "@src/modules/database/datamodels/schemas/consortium";
import {User, UserDocument} from "@database/datamodels/schemas/user";
import {CreateConsortiumDto} from "@src/modules/consortiums/dtos/create.consortium.dto";
import {UserAuthService} from "@users/user.auth.service";
import {UserService} from "@users/user.service";
import {Role} from "@database/datamodels/enums/role";

@Injectable()
export class ConsortiumService {
    constructor(@InjectModel(Consortium.name) private consortiumModel: Model<ConsortiumDocument>,
                @InjectModel(User.name) private userModel: Model<UserDocument>,
                private userAuthService: UserAuthService
                ) {}

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
        return this.consortiumModel.findByIdAndRemove(id).exec();
    }

    async get(id: string): Promise<Consortium> {
        return await this.consortiumModel.findById(id).exec();
    }

    async mapToUser(consortium: ConsortiumDocument): Promise<ConsortiumDto> {
        // let foundUser = (await this.userService.getFiltered('_id', consortium.ownerUserId)).pop();
        return {
            name: consortium.name,
            _id: consortium._id,
            ownerId: consortium.ownerUserId,
            status: consortium.status,
            createdAt: consortium.createdAt,
            // ownerName: foundUser.username
        } as ConsortiumDto;
    }
}
