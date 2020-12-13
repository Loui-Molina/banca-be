import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers:[UserService],
  controllers:[UserController],
  exports:[UserService]
})
export class UsersModule {
}
