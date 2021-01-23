import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from '@database/datamodels/schemas/refresh.token';
import { AuthUserService } from '@auth.user/auth.user.service';
import { EventSchema, Event } from '../database/datamodels/schemas/event';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [UsersModule,
        MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], 'user'),
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }], 'user'),
    ],
    providers: [AuthUserService],
    exports: [
        AuthUserService,
        MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], 'user'),
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }], 'user'),
    ],
})
export class AuthUserModule {}
