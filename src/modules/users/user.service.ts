import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { User, UserDocument } from '@src/modules/database/datamodels/schemas/user';
import { UserDto } from '@users/dtos/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getAll(): Promise<Array<User>> {
        return this.userModel.find().exec();
    }

    async getFiltered(q: string, value: any): Promise<Array<User>> {
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

    async get(id: any): Promise<User> {
        return await this.userModel.findById(id).exec();
    }
}
