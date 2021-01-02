import {Injectable, Req, UseGuards} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@src/modules/database/datamodels/schemas/user';
import { UserDto } from '@users/dtos/user.dto';
import {Role} from "@database/datamodels/enums/role";
import {AuthService} from "@auth/auth.service";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private authService: AuthService) {}

    async getAll(request: any): Promise<Array<User>> {
        const user = await this.authService.getLoggedUser(request);
        let isAdmin: boolean = false;
        if (user.role === Role.admin){
            isAdmin = true;
        }
        return this.userModel.find({ role: Role.admin }).exec();
    }

    async getFiltered(q: string, value: string): Promise<Array<User>> {
        return this.userModel.find({ [q]: value }).exec();
    }

    async create(dto: UserDto): Promise<User> {
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
