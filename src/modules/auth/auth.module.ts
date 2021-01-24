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

@Global()
@Module({
    imports: [
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
    providers: [AuthService, JwtStrategy, TokenService, RefreshStrategy],
    controllers: [AuthController],
    exports: [
        JwtModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtStrategy,
        RefreshStrategy,
        TokenService,
    ],
})
export class AuthModule {}
