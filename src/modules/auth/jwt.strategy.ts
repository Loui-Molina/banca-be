import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthUserService } from '../auth.user/auth.user.service';
import { User } from '../database/datamodels/schemas/user';
import { JwtPayload } from './jwt.payload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger: Logger = new Logger(JwtStrategy.name);

    constructor(private readonly authUserService: AuthUserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.TOKEN_SECRET_KEY,
        });
    }

    async validate(payload: JwtPayload) {
        const { role } = payload;
        const _id: ObjectId = payload.userId;
        const user: User = await this.authUserService.getForValidation(_id, role);
        if (!user) {
            throw new UnauthorizedException();
        }
        this.logger.debug('User: ' + user._id + ' request validated');
        return user;
    }
}
