import {
    ConflictException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from '@auth/dtos/auth.credentials.dto';
import { ResponsePayload } from '@users/dtos/response.payload.dto';
import { ConstApp } from '@utils/const.app';
import { ResponseDto } from '@utils/dtos/response.dto';
import { User, UserDocument } from '@src/modules/database/datamodels/schemas/user';
import { UserCreatedEntity } from '@users/entities/user.created.entity';
import { RefreshToken, RefreshTokenDocument } from '@database/datamodels/schemas/refresh.token';
import { ChangeCredentialsDto } from '../auth/dtos/change.credentials.dto';

@Injectable()
export class AuthUserService {
    private readonly logger: Logger = new Logger(AuthUserService.name);

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshTokenDocument>,
    ) {}

    async singUp(authCredentialsDto: AuthCredentialsDto, loggedUser: UserDocument = null): Promise<UserCreatedEntity> {
        const { username, password, role } = authCredentialsDto;
        let userCreated: UserCreatedEntity = new UserCreatedEntity();
        const user = new this.userModel();
        const refreshToken = new this.refreshTokenModel();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.role = role;
        user.creationUserId = loggedUser ? loggedUser.id : '1';
        user.modificationUserId = loggedUser ? loggedUser.id : '1';
        try {
            userCreated.user = await user.save();
            refreshToken.userId = userCreated.user._id;
            refreshToken.refreshTokenId = '';
            refreshToken.ipAddress = '';
            await refreshToken.save();
        } catch (error) {
            this.logger.error(error);
            if (error.code === 11000) {
                throw new ConflictException(ConstApp.USERNAME_EXISTS_ERROR);
            } else {
                throw new InternalServerErrorException();
            }
        }
        userCreated.response = { message: ConstApp.USER_CREATED_OK, statusCode: 201 } as ResponseDto;
        return userCreated;
    }

    async updateUsername(id: ObjectId, username: string, loggedUser: UserDocument) {
        const user = await this.userModel.findById(id).exec();
        user.username = username;
        user.modificationUserId = loggedUser._id;
        await user.save();
        return user;
    }

    async deleteUser(id: ObjectId) {
        const user = await this.userModel.findById(id).exec();
        await user.delete();
        return user;
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<ResponsePayload> {
        const { username, password } = authCredentialsDto;
        const user = await this.userModel.findOne({ username });
        this.logger.log(user);
        let responsePayload: ResponsePayload = new ResponsePayload();
        if (user && (await user.validatePassword(password))) {
            responsePayload.userId = user.id;
            responsePayload.role = user.role;
            return responsePayload;
        } else {
            throw new UnauthorizedException(ConstApp.INVALID_CREDENTIALS_ERROR);
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async getUserRefresh(userId: string): Promise<UserDocument> {
        let _id = userId;
        let user = await this.userModel.findOne({ _id });
        this.logger.debug('User find' + user);
        return user;
    }

    async changePassword(changeCredentialsDto:ChangeCredentialsDto, userLogged:UserDocument,ipAddress:string):Promise<ResponseDto>{
        const { username, password } = changeCredentialsDto;
        const user = await this.userModel.findOne({ username });
        if (user && (await user.validatePassword(password))) {
            try{user.salt = await bcrypt.genSalt();
            user.password = await this.hashPassword(changeCredentialsDto.newPassword, user.salt);
            user.modificationUserId = userLogged._id;
            await user.save();}
            catch(error){
                throw new InternalServerErrorException(ConstApp.COULD_NOT_CHANGE_PASSWORD);
            }
            const responseDto:ResponseDto= new ResponseDto();
            responseDto.message=ConstApp.PASSWORD_CHANGED;
            responseDto.statusCode=HttpStatus.OK;
            return responseDto;
        } else {
            throw new UnauthorizedException(ConstApp.INVALID_CREDENTIALS_ERROR);
        }
    }
}
