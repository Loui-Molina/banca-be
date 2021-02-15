import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayloadRefresh } from './jwt.payload.refresh.interface';
import { TokenService } from './token.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    private readonly logger: Logger = new Logger(RefreshStrategy.name);

    constructor(private readonly tokenService: TokenService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.REFRESH_TOKEN_SECRET_KEY,
        });
    }

    async validate(jwtPayloadRefresh: JwtPayloadRefresh) {
        const refreshToken = await this.tokenService.getRefreshTokenValidated(
            jwtPayloadRefresh.userId,
            jwtPayloadRefresh.value,
        );
        if (!refreshToken) {
            throw new UnauthorizedException();
        }
        return refreshToken;
    }
}
