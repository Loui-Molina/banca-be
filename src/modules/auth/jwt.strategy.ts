import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from '@auth/jwt.payload.interface';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User, UserDocument } from '@src/modules/database/datamodels/schemas/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger : Logger = new Logger(JwtStrategy.name);

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.TOKEN_SECRET_KEY,
        });
    }

    async validate(payload: JwtPayload) {
        const { role } = payload;
        const _id = payload.userId;
        const user = await this.userModel.findOne({ _id, role });
        this.logger.log("User"+ user);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}
