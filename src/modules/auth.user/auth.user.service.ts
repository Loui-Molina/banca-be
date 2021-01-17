import {
    BadRequestException,
    ConflictException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ResponsePayload } from '@users/dtos/response.payload.dto';
import { ConstApp } from '@utils/const.app';
import { ResponseDto } from '@utils/dtos/response.dto';
import { User, UserDocument } from '@database/datamodels/schemas/user';
import { UserCreatedEntity } from '@users/entities/user.created.entity';
import { RefreshToken, RefreshTokenDocument } from '@database/datamodels/schemas/refresh.token';
import { ChangePasswordDto } from '@auth/dtos/change.password.dto';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';
import { SignInCredentialsDto } from '@auth/dtos/sign.in.credentials.dto';
import { Event } from '../database/datamodels/schemas/event';

@Injectable()
export class AuthUserService {
    private readonly logger: Logger = new Logger(AuthUserService.name);

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshTokenDocument>,
        @InjectConnection(ConstApp.USER) private readonly connection: Connection,
        @InjectModel(Event.name) private readonly event:Event,
    ) {}

    async singUp(
        signUpCredentialsDto: SignUpCredentialsDto,
        loggedUser: UserDocument = null,
    ): Promise<UserCreatedEntity> {
        const { username, password, role, name } = signUpCredentialsDto;
        const userCreated: UserCreatedEntity = new UserCreatedEntity();
        const user = new this.userModel();
        const refreshToken = new this.refreshTokenModel();
        user.name = name;
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.role = role;
        user.creationUserId = loggedUser ? loggedUser.id : '1';
        user.modificationUserId = loggedUser ? loggedUser.id : '1';
        try {
            userCreated.user = await user.save();
            refreshToken.userId = userCreated.user._id;
            refreshToken.refreshTokenId = null;
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

    async updateUser(id: ObjectId, userChanged: SignUpCredentialsDto, loggedUser: UserDocument) {
        const { username, name } = userChanged;
        const user = await this.userModel.findById(id).exec();
        user.name = name;
        user.username = username;
        user.modificationUserId = loggedUser._id;
        //TODO cambio de password aca sin revision solo hay q revisar q exista una password nueva
        await user.save();
        return user;
    }

    async deleteUser(id: ObjectId) {
        const user = await this.userModel.findById(id).exec();
        await user.delete();
        return user;
    }

    async validateUserPassword(signInCredentialsDto: SignInCredentialsDto): Promise<ResponsePayload> {
        const { username, password } = signInCredentialsDto;
        const user = await this.userModel.findOne({ username }).select('+password').select('+salt');
        this.logger.log(user);
        const responsePayload: ResponsePayload = new ResponsePayload();
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
        const _id = userId;
        const user = await this.userModel.findOne({ _id });
        this.logger.debug('User find' + user);
        return user;
    }

    async changePassword(
        changePasswordDto: ChangePasswordDto,
        userLogged: UserDocument,
        ipAddress: string,
        remember:boolean
    ): Promise<ResponseDto> {
        const { username, password, newPassword, verifyPassword } = changePasswordDto;
        const user = await this.userModel.findOne({ username }).select('+password').select('+salt');
        const userId = userLogged._id;
        const refreshToken = await this.refreshTokenModel.findOne({ userId }); 
        if(newPassword !== verifyPassword){
            throw new BadRequestException(ConstApp.PASSWORD_NOT_MATCH);
        }
        if (!refreshToken) {
            throw new InternalServerErrorException();
        } else if (refreshToken.ipAddress === ipAddress) {
            //TODO para que lo puedan utilizar ahora
            if (/*(user && await user.validatePassword(password))||*/ remember) {
                try {
                    user.salt = await bcrypt.genSalt();
                    user.password = await this.hashPassword(newPassword, user.salt);
                    user.modificationUserId = userLogged._id;
                    await user.save();
                } catch (error) {
                    throw new InternalServerErrorException(ConstApp.COULD_NOT_CHANGE_PASSWORD);
                }
                const responseDto: ResponseDto = new ResponseDto();
                responseDto.message = ConstApp.PASSWORD_CHANGED;
                responseDto.statusCode = HttpStatus.OK;
                return responseDto;
            } else {
                throw new UnauthorizedException(ConstApp.INVALID_CREDENTIALS_ERROR);
            }
        } else {
            throw new UnauthorizedException();
        }
    }
}
