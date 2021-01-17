import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { User, UserDocument } from '@src/modules/database/datamodels/schemas/user';
import { UserDto } from '@users/dtos/user.dto';
import { AuthUserService } from '@src/modules/auth.user/auth.user.service';
import { SignUpCredentialsDto } from '@src/modules/auth/dtos/sign.up.credentials.dto';
import { AuthUser } from '@src/common/decorators/auth.user.decorator';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getAll(): Promise<Array<User>> {
        return this.userModel.find().exec();
    }

    async getFiltered(q: string, value: any): Promise<UserDocument[]> {
        return await this.userModel.find({ [q]: value }).exec();
    }

    async getSingleFiltered(q: string, value: any): Promise<UserDocument> {
        return (await this.userModel.find({ [q]: value }).exec()).pop();
    }

    /*
    async create(dto: UserDto, loggedUser: UserDocument): Promise<User> {
        const signUpCredentialsDto: SignUpCredentialsDto = {
            name: dto.name,
            username: dto.username,
            password: dto.password,
            role: dto.role,
        };
        return (await this.userAuthService.singUp(signUpCredentialsDto, loggedUser)).user;
    }
    */

    async update(dto: UserDto, loggedUser: UserDocument, userIp: string): Promise<User> {
        //TODO cambio de password no funciona
        /*if (dto.password != null && dto.password.length > 0){
            const userChange: User = await this.userModel.findById(dto._id).exec();
            await this.userAuthService.changePassword({
                userChange.username,
                password
            }, loggedUser, userIp)
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

    async delete(id: string): Promise<User> {
        return this.userModel.findByIdAndRemove(id).exec();
    }

    //TODO CHECK USAGE
    async get(id: any): Promise<UserDocument> {
        return await this.userModel.findById(id).exec();
    }

    newUserModel(): UserDocument {
        return new this.userModel();
    }
}
