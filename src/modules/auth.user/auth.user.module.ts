import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from '../database/datamodels/schemas/event';
import { RefreshToken, RefreshTokenSchema } from '../database/datamodels/schemas/refresh.token';
import { UsersModule } from '../users/users.module';
import { ConstApp } from '../utils/const.app';
import { AuthUserService } from './auth.user.service';

@Module({
    imports: [
        UsersModule,
        MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], ConstApp.USER),
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }], ConstApp.USER),
    ],
    providers: [AuthUserService],
    exports: [
        AuthUserService,
        MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], ConstApp.USER),
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }], ConstApp.USER),
        UsersModule,
    ],
})
export class AuthUserModule {}
