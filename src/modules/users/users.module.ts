import {  Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@database/datamodels/schemas/User';
import { UserController } from '@users/user.controller';
import { UserService } from '@users/user.service';
import { UserAuthService } from '@users/user.auth.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }],"user"),
  ],
  providers: [UserService,UserAuthService],
  controllers: [UserController],
  exports: [UserService,UserAuthService, MongooseModule]
})
export class UsersModule {}
