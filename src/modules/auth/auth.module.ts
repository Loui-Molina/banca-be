import { forwardRef, Global, Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@auth/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import {UserService} from "@users/user.service";

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
    providers: [AuthService, JwtStrategy, UserService],
    controllers: [AuthController], 
    exports: [AuthService, PassportModule.register({
        defaultStrategy: 'jwt',
    }), JwtStrategy],
})
export class AuthModule {}
