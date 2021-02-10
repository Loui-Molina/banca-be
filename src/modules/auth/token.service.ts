import {
    ForbiddenException,
    forwardRef,
    HttpStatus,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { Connection, Model, ObjectId } from 'mongoose';
import { ResponseSignInDto } from '@auth/dtos/response.sign.in.dto';
import { RefreshToken } from '@database/datamodels/schemas/refresh.token';
import { ConstApp } from '@utils/const.app';
import { JwtPayloadRefresh } from '@auth/jwt.payload.refresh.interface';
import { User } from '@database/datamodels/schemas/user';
import { AuthUserService } from '@auth.user/auth.user.service';
import { ResponsePayload } from '@users/dtos/response.payload.dto';
import { AuthService } from '@auth/auth.service';
import { ResponseDto } from '@utils/dtos/response.dto';

@Injectable()
export class TokenService {
    private readonly logger: Logger = new Logger(TokenService.name);

    constructor(
        @Inject(forwardRef(() => AuthUserService))
        private readonly userAuthService: AuthUserService,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshToken>,
        @InjectConnection(ConstApp.USER) private readonly connection: Connection,
    ) {}

    async getRefreshToken(ipAdress: string, refreshToken: RefreshToken, logged: boolean): Promise<ResponseSignInDto> {
        if (ipAdress === refreshToken.ipAddress) {
            const user: User = await this.userAuthService.getUser(refreshToken.userId);
            if (!user) {
                throw new InternalServerErrorException();
            }
            const responsePayload: ResponsePayload = new ResponsePayload();
            responsePayload.role = user.role;
            responsePayload.userId = user._id;
            const responseSignInDto: ResponseSignInDto = await this.authService.getToken(
                responsePayload,
                ipAdress,
                logged,
            );
            this.logger.debug('User ' + user);
            return responseSignInDto;
        } else {
            throw new UnauthorizedException();
        }
    }

    async saveRefreshTokenGenerated(userIp: string, userId: ObjectId): Promise<JwtPayloadRefresh> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const refreshTokenModel = await this.refreshTokenModel.findOne({ userId }).exec();
            const value = randomBytes(64).toString('hex');
            refreshTokenModel.refreshTokenId = value;
            refreshTokenModel.ipAddress = userIp;
            await refreshTokenModel.save();
            session.commitTransaction();
            return { value, userId } as JwtPayloadRefresh;
        } catch (error) {
            this.logger.error(ConstApp.REFRESH_TOKEN_ERROR + error);
            session.abortTransaction();
            throw new InternalServerErrorException(ConstApp.REFRESH_TOKEN_ERROR);
        }
        finally{
            session.endSession();
        }
    }

    async deleteRefreshToken(ipAddress: string, user: User, required: boolean): Promise<ResponseDto> {
        const responseDto: ResponseDto = new ResponseDto();
        let refreshTokenModel = new this.refreshTokenModel();
        const userId: ObjectId = user._id;
        if (required) {
            refreshTokenModel = await this.refreshTokenModel.findOne({ userId, ipAddress });
        } else {
            refreshTokenModel = await this.refreshTokenModel.findOne({ userId });
        }
        if (refreshTokenModel == null) {
            throw new ForbiddenException(ConstApp.COULD_NOT_LOG_OUT_ERROR);
        }
        const session = await this.connection.startSession();
        session.startTransaction();
        try{
        refreshTokenModel.ipAddress = '';
        refreshTokenModel.refreshTokenId = '';
        refreshTokenModel = await refreshTokenModel.save();
        session.commitTransaction();
        responseDto.message = ConstApp.LOG_OUT_OK;
        responseDto.statusCode = HttpStatus.OK;
        if (!refreshTokenModel) {
            throw new InternalServerErrorException(ConstApp.COULD_NOT_LOG_OUT_ERROR);
        }}
        catch(e){
            session.abortTransaction();
            throw new InternalServerErrorException(ConstApp.COULD_NOT_LOG_OUT_ERROR);
        }
        finally{
            session.endSession();
        }
        return responseDto;
    }

    async getRefreshTokenByUserId(userId: ObjectId) {
        return await this.refreshTokenModel.findOne({ userId }).exec();
    }

    async createRefreshToken(_id: ObjectId) {
        const refreshToken = new this.refreshTokenModel();
        refreshToken.userId = _id;
        refreshToken.refreshTokenId = null;
        refreshToken.ipAddress = '';
        await refreshToken.save();
    }

    async getRefreshTokenValidated(userId: ObjectId, refreshTokenId: string) {
        return await this.refreshTokenModel.findOne({ userId, refreshTokenId }).exec();
    }
}
