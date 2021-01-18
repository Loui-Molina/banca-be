import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from '@auth/jwt.payload.interface';
import { PassportStrategy } from '@nestjs/passport';
import { Model, ObjectId } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@src/modules/database/datamodels/schemas/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger: Logger = new Logger(JwtStrategy.name);

    constructor(@InjectModel(User.name) private userModel: Model<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.TOKEN_SECRET_KEY,
        });
    }

    async validate(payload: JwtPayload) {
        const { role } = payload;
        const _id: ObjectId = payload.userId;
        const user: User = await this.userModel.findOne({ _id, role });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
