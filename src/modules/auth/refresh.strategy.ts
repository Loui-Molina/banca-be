import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshToken, RefreshTokenDocument } from '@database/datamodels/schemas/refresh.token';
import { JwtPayloadRefresh } from '@auth/jwt.payload.refresh.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    private readonly logger: Logger = new Logger(RefreshStrategy.name);

    constructor(
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshTokenDocument>,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.REFRESH_TOKEN_SECRET_KEY,
        });
    }

    async validate(jwtPayloadRefresh: JwtPayloadRefresh) {
        const { userId, value } = jwtPayloadRefresh;
        const refreshTokenId = value;
        const refreshToken = await this.refreshTokenModel.findOne({ userId, refreshTokenId });
        if (!refreshToken) {
            throw new UnauthorizedException();
        }
        this.logger.debug('Refresh Token: ' + refreshToken);
        return refreshToken;
    }
}
