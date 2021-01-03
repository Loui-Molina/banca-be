import {Injectable, Req, UseGuards} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model, ObjectId} from 'mongoose';
import { UserDto } from '@users/dtos/user.dto';
import {Role} from "@database/datamodels/enums/role";
import {AuthService} from "@auth/auth.service";
import {ConsortiumService} from "@src/modules/consortiums/consortium.service";
import {User, UserDocument} from "@database/datamodels/schemas/user";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private authService: AuthService, private consortiumService: ConsortiumService) {}

    async getAll(): Promise<Array<User>> {
        return this.userModel.find().exec();
    }

    async getFiltered(q: string, value: string): Promise<Array<User>> {
        return this.userModel.find({ [q]: value }).exec();
    }

    async create(dto: UserDto): Promise<User> {
        //TODO crear usuario con signUp
        const newObject = new this.userModel({
            ...dto,
            creationDate: new Date(),
            creationUserId: '1',
            modificationDate: new Date(),
            modificationUserId: '1',
        });
        await newObject.save();
        return newObject;
    }

    async update(dto: UserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(
            dto._id,
            {
                username: dto.username,
                password: dto.password,
                name: dto.name,
                modificationDate: new Date(),
                modificationUserId: '1',
            },
            {
                new: true,
            },
        );
    }

    async delete(id: string): Promise<User> {
        return this.userModel.findByIdAndRemove(id).exec();
    }

    async get(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }
}
