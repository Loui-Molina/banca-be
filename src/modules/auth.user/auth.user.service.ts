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
import { User } from '@src/modules/database/datamodels/schemas/user';
import { UserCreatedEntity } from '@users/entities/user.created.entity';
import { RefreshToken } from '@database/datamodels/schemas/refresh.token';
import { UsersService } from '@users/users.service';
import { ChangePasswordDto } from '@auth/dtos/change.password.dto';
import { SignInCredentialsDto } from '@auth/dtos/sign.in.credentials.dto';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';

@Injectable()
export class AuthUserService {
    private readonly logger: Logger = new Logger(AuthUserService.name);

    constructor(
        private readonly userService: UsersService,
        @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshToken>,
    ) {}

    async singUp(signUpCredentialsDto: SignUpCredentialsDto, loggedUser: User = null): Promise<UserCreatedEntity> {
        const { username, password, role, name } = signUpCredentialsDto;
        const userCreated: UserCreatedEntity = new UserCreatedEntity();
        const user = this.userService.newUserModel();
        const refreshToken = new this.refreshTokenModel();
        user.name = name;
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.role = role;
        user.creationUserId = user._id;
        user.modificationUserId = user._id;
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

    async updateUser(id: ObjectId, userChanged: SignUpCredentialsDto, loggedUser: User) {
        const { username, name } = userChanged;
        const user: User = await this.userService.get(id);
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
        const user: User = await this.userService.getSingleFilteredComplete('username', username);
        console.log(`found User ${user}`);

        this.logger.log(user);
        const responsePayload: ResponsePayload = new ResponsePayload();
        if (user && (await user.validatePassword(password))) {
            responsePayload.userId = user._id;
            responsePayload.role = user.role;
            return responsePayload;
        } else {
            throw new UnauthorizedException(ConstApp.INVALID_CREDENTIALS_ERROR);
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async getUserRefresh(userId: ObjectId): Promise<User> {
        const user = await this.userService.get(userId);
        this.logger.debug(`User find ${user}`);
        return user;
    }

    async changePassword(
        changePasswordDto: ChangePasswordDto,
        userLogged: User,
        ipAddress: string,
        remember: boolean,
    ): Promise<ResponseDto> {
        const { username, password, newPassword, verifyPassword } = changePasswordDto;
        const user = await this.userService.getSingleFilteredComplete('username', username);
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
