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
import { User } from '@database/datamodels/schemas/user';
import { UserCreatedEntity } from '@users/entities/user.created.entity';
import { UsersService } from '@users/users.service';
import { SignInCredentialsDto } from '@auth/dtos/sign.in.credentials.dto';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';
import { Role } from '@database/datamodels/enums/role';
import { TokenService } from '@auth/token.service';
import { CreateEvent } from '../events/events/create.event';
import { EventsConst } from '../events/events.const';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthUserService {
    private readonly logger: Logger = new Logger(AuthUserService.name);

    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
        private readonly eventEmitter: EventEmitter2,
        @InjectConnection(ConstApp.USER) private readonly connection: Connection,
    ) {}

    async signUp(signUpCredentialsDto: SignUpCredentialsDto, loggedUser: User): Promise<UserCreatedEntity> {
        const session = await this.connection.startSession();
        session.startTransaction();
        const userCreated: UserCreatedEntity = new UserCreatedEntity();
        try {
            const { username, password, role, name } = signUpCredentialsDto;
            const user = this.usersService.newUserModel();
            user.name = name;
            user.username = username;
            user.salt = await bcrypt.genSalt();
            user.password = await this.hashPassword(password, user.salt);
            user.oldPasswords[0] = user.password;
            user.role = role;
            if (!loggedUser) {
                user.creationUserId = user._id;
                user.modificationUserId = user._id;
            } else {
                user.creationUserId = loggedUser._id;
                user.modificationUserId = loggedUser._id;
            }
            userCreated.user = await user.save();
            this.tokenService.createRefreshToken(userCreated.user._id);
            userCreated.response = { message: ConstApp.USER_CREATED_OK, statusCode: 201 } as ResponseDto;
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(error);
            if (error.code === 11000) {
                throw new ConflictException(ConstApp.USERNAME_EXISTS_ERROR);
            } else {
                throw new InternalServerErrorException();
            }
        } finally {
            session.endSession();
        }
        return userCreated;
    }

    async updateUser(id: ObjectId, userChanged: SignUpCredentialsDto, loggedUser: User) {
        const { username, name } = userChanged;
        const user: User = await this.usersService.get(id);
        user.name = name;
        user.username = username;
        user.modificationUserId = loggedUser._id;
        await user.save();
        return user;
    }

    async deleteUser(id: ObjectId) {
        const user = await this.usersService.get(id);
        await user.delete();
        return user;
    }

    async validateUserPassword(signInCredentialsDto: SignInCredentialsDto): Promise<ResponsePayload> {
        const { username, password } = signInCredentialsDto;
        const user: User = await this.usersService.getSingleFilteredComplete('username', username);
        const responsePayload: ResponsePayload = new ResponsePayload();
        if (user && (await user.validatePassword(password))) {
            responsePayload.userId = user._id;
            responsePayload.role = user.role;
            return responsePayload;
        } else {
            throw new UnauthorizedException(ConstApp.INVALID_CREDENTIALS_ERROR);
        }
    }

    async getUser(_id: ObjectId) {
        return await this.usersService.get(_id);
    }

    async getForValidation(id: ObjectId, role: Role) {
        return await this.usersService.getForValidation(id, role);
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async getUserByUsernameRole(username: string, role: Role): Promise<User> {
        return await this.usersService.getUserByUsernameRole(username, role);
    }

    async getUserByIdComplete(_id: ObjectId): Promise<User> {
        return await this.usersService.getUserByUsernameAndSalt(_id);
    }

    async validateOldPassword(user: User, password: string): Promise<boolean> {
        return await user.validateOldPassword(password);
    }
}
