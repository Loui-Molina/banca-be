import { forwardRef, Global, Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "@database/datamodels/schemas/User";
import {JwtStrategy} from "@auth/jwt.strategy";


@Global()
@Module({
    imports: [
        forwardRef(() => UsersModule),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
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
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [JwtModule, AuthService, PassportModule.register({
        defaultStrategy: 'jwt',
    }), JwtStrategy],
})
export class AuthModule {}
