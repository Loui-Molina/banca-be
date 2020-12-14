import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../database/datamodels/schemas/User';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, User],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
