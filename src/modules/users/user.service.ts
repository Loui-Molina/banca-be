import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { User, UserDocument } from '@src/modules/database/datamodels/schemas/user';
import { UserDto } from '@users/dtos/user.dto';
import {AuthUserService} from "@src/modules/auth.user/auth.user.service";
import {AuthCredentialsDto} from "@auth/dtos/auth.credentials.dto";
import {AuthUser} from "@src/common/decorators/auth.user.decorator";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private userAuthService: AuthUserService) {}

    async getAll(): Promise<Array<User>> {
        return this.userModel.find().exec();
    }

    async getFiltered(q: string, value: any): Promise<Array<User>> {
        return this.userModel.find({ [q]: value }).exec();
    }

    async create(dto: UserDto, loggedUser: UserDocument): Promise<User> {
        const authCredentials: AuthCredentialsDto = {
            username: dto.username,
            password: dto.password,
            role: dto.role,
        };
        return (await this.userAuthService.singUp(authCredentials, loggedUser)).user;
    }

    async update(dto: UserDto, loggedUser: UserDocument): Promise<User> {
        return this.userModel.findByIdAndUpdate(
            dto._id,
            {
                username: dto.username,
                password: dto.password,
                name: dto.name,
                modificationDate: new Date(),
                modificationUserId: loggedUser._id,
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
