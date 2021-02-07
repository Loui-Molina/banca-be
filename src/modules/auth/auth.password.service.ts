import { BadRequestException, ForbiddenException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthUserService } from '@auth.user/auth.user.service';
import { User } from '@database/datamodels/schemas/user';
import { ChangePasswordDto } from '@auth/dtos/change.password.dto';
import { ConstApp } from '@utils/const.app';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { TokenService } from '@auth/token.service';
import { SomethingWentWrongException } from '@common/exceptions/something.went.wrong.exception';
import { Role } from '../database/datamodels/enums/role';
import { resolveConfig } from 'prettier';
import { ResponseDto } from '../utils/dtos/response.dto';
import { isInstance } from 'class-validator';

@Injectable()
export class AuthPasswordService {
    private logger: Logger = new Logger(AuthPasswordService.name);

    constructor(
        private readonly userAuthService: AuthUserService,
        private readonly tokenService: TokenService,
        @InjectConnection(ConstApp.USER) private readonly connection: Connection,
    ) {}

    async changePassword(userIp: string, changePasswordDto: ChangePasswordDto, userLogged: User): Promise<ResponseDto> {
        const { username, newPassword, verifyPassword } = changePasswordDto;
        let responseDto: ResponseDto = new ResponseDto();
        let changed: boolean;
        if (newPassword !== verifyPassword) {
            throw new BadRequestException(ConstApp.PASSWORD_NOT_MATCH);
        }
        this.logger.debug('user  logged ' + userLogged);
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const user = await this.userAuthService.getUserByUsername(username);
            this.logger.debug('user to change password ' + user);
            if (!user) {
                throw new BadRequestException(ConstApp.USER_NOT_FOUND);
            }
            switch (userLogged.role) {
                case Role.admin:
                    if (user.role === Role.admin) {
                        throw new ForbiddenException(ConstApp.UNAUTHORIZE_TO_CHANGE_PASSWORD);
                    }
                    try {
                        changed = await this.changeUserPassword(user, newPassword);
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
                        changed = await this.changeUserPassword(user, newPassword);
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

    private async changeUserPassword(user: User, newPassword: string): Promise<boolean> {
        let userSaved = false;
        user.password = await this.userAuthService.hashPassword(newPassword, user.salt);
        const valid = await this.userAuthService.validateOldPassword(user, newPassword);
        if (!valid) {
            user.oldPasswords.push(user.password);
            await this.tokenService.deleteRefreshToken(null, user, false);
            await user.save();
            userSaved = true;
        } else {
            userSaved = false;
            throw new BadRequestException(ConstApp.PASSWORD_SHOULD_NOT_BE_OLD);
        }
        return userSaved;
    }
}
