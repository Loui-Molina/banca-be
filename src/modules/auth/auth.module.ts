import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
        defaultStrategy:'jwt'
    }),
    JwtModule.register({
      secret:'topSecret51',
      signOptions:{
        expiresIn: 3600,
      }
    }),
    UsersModule,],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
