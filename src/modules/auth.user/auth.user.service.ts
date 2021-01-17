import {
    BadRequestException,
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
import { ResponsePayload } from '@users/dtos/response.payload.dto';
import { ConstApp } from '@utils/const.app';
import { ResponseDto } from '@utils/dtos/response.dto';
import { User, UserDocument } from '@database/datamodels/schemas/user';
import { UserCreatedEntity } from '@users/entities/user.created.entity';
import { RefreshToken, RefreshTokenDocument } from '@database/datamodels/schemas/refresh.token';
import { ChangePasswordDto } from '@auth/dtos/change.password.dto';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';
import { SignInCredentialsDto } from '@auth/dtos/sign.in.credentials.dto';
import { UserService } from '@users/user.service';

@Injectable()
export class AuthUserService {
    private readonly logger: Logger = new Logger(AuthUserService.name);

    constructor(
        private userService: UserService,
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshTokenDocument>,
        @InjectModel(User.name) private userModel:Model<UserDocument>,
    ) {}

    async singUp(
        signUpCredentialsDto: SignUpCredentialsDto,
        loggedUser: UserDocument = null,
    ): Promise<UserCreatedEntity> {
        const { username, password, role, name } = signUpCredentialsDto;
        const userCreated: UserCreatedEntity = new UserCreatedEntity();
        const user = this.userService.newUserModel();
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
        const user: UserDocument = await this.userService.get(id);
        user.name = name;
        user.username = username;
        user.modificationUserId = loggedUser._id;
        //TODO cambio de password aca sin revision solo hay q revisar q exista una password nueva
        await user.save();
        return user;
    }

    async deleteUser(id: ObjectId) {
        const user = await this.userService.get(id);
        await user.delete();
        return user;
    }

    async validateUserPassword(signInCredentialsDto: SignInCredentialsDto): Promise<ResponsePayload> {
        const { username, password } = signInCredentialsDto;
        const userDocument: UserDocument = await this.userService.getSingleFiltered('username', username);
        console.log(`found User ${userDocument}`);

        this.logger.log(userDocument);
        const responsePayload: ResponsePayload = new ResponsePayload();
        if (userDocument && (await userDocument.validatePassword(password))) {
            responsePayload.userId = userDocument.id;
            responsePayload.role = userDocument.role;
            return responsePayload;
        } else {
            throw new UnauthorizedException(ConstApp.INVALID_CREDENTIALS_ERROR);
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async getUserRefresh(userId: string): Promise<UserDocument> {
        const user = await this.userService.get(userId);
        this.logger.debug(`User find ${user}`);
        return user;
    }

    async changePassword(
        changePasswordDto: ChangePasswordDto,
        userLogged: UserDocument,
        ipAddress: string,
        remember: boolean,
    ): Promise<ResponseDto> {
        const { username, password, newPassword, verifyPassword } = changePasswordDto;
        const user = await this.userModel.findOne({ username }).select('+password').select('+salt');
        const userId = userLogged._id;
        const refreshToken = await this.refreshTokenModel.findOne({ userId });
        if (newPassword !== verifyPassword) {
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
