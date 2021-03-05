import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from '@database/datamodels/schemas/refresh.token';
import { AuthUserService } from '@auth.user/auth.user.service';
import { UsersModule } from '@users/users.module';
import { ConstApp } from '@utils/const.app';

@Module({
    imports: [
        UsersModule,
        MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], ConstApp.USER),
    ],
    providers: [AuthUserService],
    exports: [
        AuthUserService,
        MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], ConstApp.USER),
        UsersModule,
    ],
})
export class AuthUserModule {}
