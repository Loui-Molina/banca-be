import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from '@auth/jwt.payload.interface';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {User, UserDocument} from "@database/datamodels/schemas/User";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.TOKEN_SECRET_KEY,
        });
    }

    async validate(payload: JwtPayload) {
        const { username, role } = payload;
        const user = await this.userModel.findOne({ username, role });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
