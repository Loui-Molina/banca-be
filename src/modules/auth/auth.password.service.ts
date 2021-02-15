import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { SomethingWentWrongException } from '@src/common/exceptions/something.went.wrong.exception';
import { Connection } from 'mongoose';
import { AuthUserService } from '../auth.user/auth.user.service';
import { Role } from '../database/datamodels/enums/role';
import { User } from '../database/datamodels/schemas/user';
import { ConstApp } from '../utils/const.app';
import { ResponseDto } from '../utils/dtos/response.dto';
import { ChangeOldPasswordDto } from './dtos/change.old.password.dto';
import { ChangePasswordDto } from './dtos/change.password.dto';
import { SignInCredentialsDto } from './dtos/sign.in.credentials.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthPasswordService {
    private logger: Logger = new Logger(AuthPasswordService.name);

    constructor(
        private readonly userAuthService: AuthUserService,
        private readonly tokenService: TokenService,
        @InjectConnection(ConstApp.USER) private readonly connection: Connection,
    ) {}

    async changePasswordRemember(
        userIp: string,
        changeOldPasswordDto: ChangeOldPasswordDto,
        userLogged: User,
    ): Promise<ResponseDto> {
        const { _id, oldPassword, newPassword, verifyPassword } = changeOldPasswordDto;
        let responseDto: ResponseDto = new ResponseDto();
        let signInCredentialsDto: SignInCredentialsDto = new SignInCredentialsDto();
        let changed: boolean;
        if (newPassword !== verifyPassword) {
            throw new BadRequestException(ConstApp.PASSWORD_NOT_MATCH);
        }
        if (oldPassword === newPassword) {
            throw new BadRequestException(ConstApp.PASSWORD_SHOULD_NOT_BE_THE_SAME_ERROR);
        }
        const user = await this.userAuthService.getUserByIdComplete(_id);
        if (!user) {
            throw new BadRequestException(ConstApp.USER_NOT_FOUND);
        }
        const refreshToken = await this.tokenService.getRefreshTokenByUserId(userLogged._id);
        if (!refreshToken) {
            throw new SomethingWentWrongException();
        }
        this.logger.debug(' refreshToken userId: ' + refreshToken.userId + '  userId: ' + user._id);
        if (refreshToken.userId.toString() !== user._id.toString()) {
            throw new SomethingWentWrongException();
        }
        if (refreshToken.ipAddress === '' || refreshToken.refreshTokenId === '') {
            /**
             * Esta exception no tiene mensaje porque
             * se supone que esta cambiando la pass sin estar loggeado
             * **/
            throw new BadRequestException();
        }
        if (refreshToken.ipAddress !== userIp) {
            /**
             * Esta exception no tiene mensaje porque
             * se supone que esta intentando acceder de otro dispositivo
             * **/
            throw new BadRequestException();
        }
        signInCredentialsDto.username = user.username;
        signInCredentialsDto.password = oldPassword;
        const valid = await this.userAuthService.validateUserPassword(signInCredentialsDto);
        this.logger.debug('Is valid: ' + valid);
        if (!valid) {
            throw new BadRequestException(ConstApp.PASSWORD_NOT_MATCH);
        }
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            changed = await this.changeUserPassword(user, newPassword, userLogged);
            session.commitTransaction();
            responseDto.message = 'Password changed';
            responseDto.statusCode = 200;
        } catch (e) {
            session.abortTransaction();
            if (e instanceof ForbiddenException) {
                throw new ForbiddenException(ConstApp.UNABLE_TO_CHANGE_PASSWORD);
            }
            if (e instanceof BadRequestException) {
                throw new BadRequestException(ConstApp.PASSWORD_SHOULD_NOT_BE_OLD);
            }
            throw new SomethingWentWrongException();
        } finally {
            session.endSession();
        }
        return responseDto;
    }

    async changePassword(userIp: string, changePasswordDto: ChangePasswordDto, userLogged: User): Promise<ResponseDto> {
        const { _id, newPassword, verifyPassword } = changePasswordDto;
        let responseDto: ResponseDto = new ResponseDto();
        let changed: boolean;
        if (newPassword !== verifyPassword) {
            throw new BadRequestException(ConstApp.PASSWORD_NOT_MATCH);
        }
        const user = await this.userAuthService.getUserByIdComplete(_id);
        if (!user) {
            throw new BadRequestException(ConstApp.USER_NOT_FOUND);
        }
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            switch (userLogged.role) {
                case Role.admin:
                    if (user.role === Role.admin) {
                        throw new ForbiddenException(ConstApp.UNAUTHORIZE_TO_CHANGE_PASSWORD);
                    }
                    try {
                        changed = await this.changeUserPassword(user, newPassword, userLogged);
                        session.commitTransaction();
                    } catch (e) {
                        throw new BadRequestException(ConstApp.PASSWORD_SHOULD_NOT_BE_OLD);
                    }
                    break;
                case Role.consortium:
                    if (user.role === Role.consortium || user.role === Role.admin) {
                        throw new ForbiddenException(ConstApp.CANNOT_CHANGE_PASSWORD_OF_THE_SAME_ROLE);
                    }
                    try {
                        changed = await this.changeUserPassword(user, newPassword, userLogged);
                        session.commitTransaction();
                    } catch (e) {
                        throw new BadRequestException(ConstApp.PASSWORD_SHOULD_NOT_BE_OLD);
                    }
                    break;
                case Role.banker:
                    if (user.role === Role.consortium || user.role === Role.admin || user.role === Role.banker) {
                        throw new ForbiddenException(ConstApp.CANNOT_CHANGE_PASSWORD_OF_THE_SAME_ROLE);
                    }
                    try {
                        changed = await this.changeUserPassword(user, newPassword, userLogged);
                        session.commitTransaction();
                    } catch (e) {
                        throw new BadRequestException(ConstApp.PASSWORD_SHOULD_NOT_BE_OLD);
                    }
                    break;
                default:
                    throw new ForbiddenException(ConstApp.CANNOT_CHANGE_PASSWORD_OF_THE_SAME_ROLE);
            }
            responseDto.message = 'Password changed';
            responseDto.statusCode = 200;
        } catch (e) {
            session.abortTransaction();
            if (e instanceof ForbiddenException) {
                throw new ForbiddenException(ConstApp.UNABLE_TO_CHANGE_PASSWORD);
            }
            if (e instanceof BadRequestException) {
                throw new BadRequestException(ConstApp.PASSWORD_SHOULD_NOT_BE_OLD);
            }
            throw new SomethingWentWrongException();
        } finally {
            session.endSession();
        }
        return responseDto;
    }

    private async changeUserPassword(user: User, newPassword: string, userLogged: User): Promise<boolean> {
        let userSaved = false;
        user.password = await this.userAuthService.hashPassword(newPassword, user.salt);
        const valid = await this.userAuthService.validateOldPassword(user, newPassword);
        if (!valid) {
            user.oldPasswords.push(user.password);
            await this.tokenService.deleteRefreshToken(null, user, false);
            user.modificationUserId = userLogged._id;
            await user.save();
            userSaved = true;
        } else {
            userSaved = false;
            throw new BadRequestException(ConstApp.PASSWORD_SHOULD_NOT_BE_OLD);
        }
        return userSaved;
    }
}
