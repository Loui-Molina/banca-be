import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { AuthUserModule } from "../auth.user/auth.user.module";
import { Banking, BankingSchema } from "../database/datamodels/schemas/banking";
import { Consortium, ConsortiumSchema } from "../database/datamodels/schemas/consortium";
import { WebUser, WebUserSchema } from "../database/datamodels/schemas/web.user";
import { ConstApp } from "../utils/const.app";
import { AuthController } from "./auth.controller";
import { AuthPasswordController } from "./auth.password.controller";
import { AuthPasswordService } from "./auth.password.service";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { RefreshStrategy } from "./refresh.strategy";
import { TokenService } from "./token.service";
import { UsersAdminInitializeService } from "./users.admin.initialize.service";


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
    providers: [
        AuthService,
        AuthPasswordService,
        UsersAdminInitializeService,
        JwtStrategy,
        TokenService,
        RefreshStrategy,
    ],
    controllers: [AuthController, AuthPasswordController],
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
