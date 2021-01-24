import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from '@database/datamodels/schemas/refresh.token';
import { AuthUserService } from '@auth.user/auth.user.service';
import { UserService } from '@users/user.service';

@Module({
    imports: [
        UsersModule,
        MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], ConstApp.USER),
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }], ConstApp.USER),
    ],
    providers: [AuthUserService, UsersService],
    exports: [
        AuthUserService,
        MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], ConstApp.USER),
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }], ConstApp.USER),
    ],
})
export class AuthUserModule {}
