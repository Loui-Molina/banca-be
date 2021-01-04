import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ConsortiumDto} from '@src/modules/consortiums/dtos/consortium.dto';
import {Consortium, ConsortiumDocument} from "@src/modules/database/datamodels/schemas/consortium";
import {UserDocument} from "@database/datamodels/schemas/user";
import {UserService} from "@users/user.service";

@Injectable()
export class ConsortiumService {
    constructor(@InjectModel(Consortium.name) private consortiumModel: Model<ConsortiumDocument>,
                /*private userService: UserService*/) {
    }

    async getAll(): Promise<Array<ConsortiumDto>> {
        let consortiums: Array<ConsortiumDocument> = await this.consortiumModel.find({}).exec();
        return Promise.all(consortiums.map(consortium => this.mapToUser(consortium)));
    }

    async getFiltered(q: string, value: any): Promise<Array<Consortium>> {
        return this.consortiumModel.find({[q]: value}).exec();
    }

    async create(dto: ConsortiumDto, loggedUser: UserDocument): Promise<Consortium> {
        //CREATE user
        const newObject = new this.consortiumModel({
            ...dto,
            creationUserId: loggedUser._id,
            modificationUserId: loggedUser._id,
        });
        await newObject.save();
        return newObject;
    }

    async update(dto: ConsortiumDto, loggedUser: UserDocument): Promise<Consortium> {
        //UPDATE USER
        return this.consortiumModel.findByIdAndUpdate(
            dto._id,
            {
                name: dto.name,
                // ownerUserId: dto.ownerUserId, //TODO falta
                status: dto.status,
                modificationUserId: loggedUser._id
            },
            {
                new: false,
            },
        );
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
