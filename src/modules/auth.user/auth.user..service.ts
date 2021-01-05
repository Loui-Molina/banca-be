import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {  Model, ObjectId} from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from '@auth/dtos/auth.credentials.dto';
import { ResponsePayload } from '@users/dtos/response.payload.dto';
import { ConstApp } from '@utils/const.app';
import { ResponseDto } from '@utils/dtos/response.dto';
import { User, UserDocument } from '@src/modules/database/datamodels/schemas/user';
import { UserCreatedEntity } from '@users/entities/user.created.entity';

@Injectable()
export class AuthUserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async singUp(authCredentialsDto: AuthCredentialsDto, loggedUser: UserDocument = null): Promise<UserCreatedEntity> {
        const { username, password, role } = authCredentialsDto;
        let userCreated: UserCreatedEntity = new UserCreatedEntity();
        const user = new this.userModel();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.role = role;
        user.creationUserId = loggedUser?loggedUser.id: '1';
        user.modificationUserId = loggedUser?loggedUser.id:'1';
        try {
            userCreated.user = await user.save();
        } catch (error) {
            console.log(error);
            if (error.code === 11000) {
                throw new ConflictException(ConstApp.USERNAME_EXISTS_ERROR);
            } else {
                throw new InternalServerErrorException();
            }
        }
        userCreated.response = { message: ConstApp.USER_CREATED_OK, statusCode: 201 } as ResponseDto;
        return userCreated;
    }

    async updateUsername(id: ObjectId, username: string, loggedUser: UserDocument){
        const user = await this.userModel.findById(id).exec();
        user.username = username;
        user.modificationUserId = loggedUser._id;
        await user.save();
        return user;
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<ResponsePayload> {
        const { username, password } = authCredentialsDto;
        const user = await this.userModel.findOne({ username });
        let responsePayload: ResponsePayload = new ResponsePayload();
        if (user && (await user.validatePassword(password))) {
            responsePayload.username = user.username;
            responsePayload.role = user.role;
            return responsePayload;
        } else {
            throw new UnauthorizedException(ConstApp.INVALID_CREDENTIALS_ERROR);
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
