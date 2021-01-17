import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from '@database/datamodels/schemas/refresh.token';
import { User, UserSchema } from '@database/datamodels/schemas/user';
import { AuthUserService } from '@auth.user/auth.user.service';
import { Event, EventSchema } from '@database/datamodels/schemas/event';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user'),
        MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], 'user'),
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }], 'user'),
    ],
    providers: [AuthUserService],
    exports: [
        AuthUserService,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user'),
        MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], 'user'),
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }], 'user'),
    ],
})
export class AuthUserModule {}
