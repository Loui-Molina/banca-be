import { forwardRef, Global, Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import {JwtModule, JwtService} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@auth/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "@database/datamodels/schemas/User";

@Global()
@Module({
    imports: [
        forwardRef(() => UsersModule),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user'), forwardRef(() => AuthModule),
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
        UsersModule,
        JwtStrategy
    ],
    providers: [AuthService, JwtService ],
    controllers: [AuthController], 
    exports: [AuthService, UsersModule, PassportModule.register({
        defaultStrategy: 'jwt',
    }), JwtStrategy],
})
export class AuthModule {}
