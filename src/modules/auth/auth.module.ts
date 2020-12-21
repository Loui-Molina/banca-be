import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
        defaultStrategy:'jwt'
    }),
    JwtModule.register({
      secret:'topSecret51',
      signOptions:{
        expiresIn: 3600,
      }
    })
    ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController, ],
  exports: [AuthService, PassportModule, JwtStrategy],
})
export class AuthModule {}
