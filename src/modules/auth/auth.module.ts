import { Global, Module } from '@nestjs/common';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@auth/jwt.strategy';
import { AuthUserModule } from '@auth.user/auth.user.module';
import { TokenService } from '@auth/token.service';
import { RefreshStrategy } from '@auth/refresh.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Banking, BankingSchema } from '@database/datamodels/schemas/banking';
import { ConstApp } from '@utils/const.app';
import { Consortium, ConsortiumSchema } from '@database/datamodels/schemas/consortium';
import { UsersAdminInitializeService } from '@auth/users.admin.initialize.service';
import {WebUser, WebUserSchema} from "@database/datamodels/schemas/web.user";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: WebUser.name, schema: WebUserSchema }], ConstApp.BANKING),
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('TOKEN_SECRET_KEY'),
                    signOptions: {
                        expiresIn: configService.get<string>('TOKEN_EXPIRES'),
                    },
                };
            },
            inject: [ConfigService],
        }),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        AuthUserModule,
    ],
    providers: [AuthService, UsersAdminInitializeService, JwtStrategy, TokenService, RefreshStrategy],
    controllers: [AuthController],
    exports: [
        JwtModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtStrategy,
        RefreshStrategy,
        TokenService,
        AuthUserModule,
    ],
})
export class AuthModule {}
