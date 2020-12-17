import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@database/datamodels/schemas/User';
import { UserController } from '@users/user.controller';
import { UserService } from '@users/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, User],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
