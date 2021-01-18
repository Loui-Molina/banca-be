import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from '@src/modules/database/datamodels/schemas/user';
import { UserDto } from '@users/dtos/user.dto';
import { AbmMethods } from '@src/common/interfaces/abm.methods';

@Injectable()
export class UserService implements AbmMethods<User, UserDto> {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getAll(limit:number,offset:number): Promise<Array<User>> {
        return this.userModel.find().skip(offset).limit(limit).exec();
    }

    async getFiltered(q: string, value: any): Promise<User[]> {
        return await this.userModel.find({ [q]: value }).exec();
    }

    async getSingleFiltered(q: string, value: any): Promise<User> {
        return (await this.userModel.find({ [q]: value }).exec()).pop();
    }

    async getSingleFilteredComplete(q: string, value: any): Promise<User> {
        return (
            await this.userModel
                .find({ [q]: value })
                .select('+password')
                .select('+salt')
                .exec()
        ).pop();
    }

    async update(dto: UserDto, loggedUser: User, userIp: string): Promise<User> {
        //TODO cambio de password no funciona
        /*if (dto.password != null && dto.password.length > 0){
            const userChange: User = await this.userModel.findById(dto._id).exec();
            await this.userAuthService.changePassword({
                userChange.username,
                password
            }, loggedUserIp)
        }*/
        return this.userModel.findByIdAndUpdate(
            dto._id,
            {
                username: dto.username,
                // password: dto.password,
                name: dto.name,
                modificationDate: new Date(),
                modificationUserId: loggedUser._id,
            },
            {
                new: true,
            },
        );
    }

    async delete(id: ObjectId): Promise<User> {
        return this.userModel.findByIdAndRemove(id).exec();
    }

    async get(id: ObjectId): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    newUserModel(): User {
        return new this.userModel();
    }

    getEstablishmentName(loggedUser: User) {
        return Promise.resolve({ name: 'test' });
    }
}
