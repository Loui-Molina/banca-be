import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@database/datamodels/schemas/User';
import { UserController } from '@users/user.controller';
import { UserService } from '@users/user.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }],"user"),
  ],
  providers: [User, UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UsersModule {}
