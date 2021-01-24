import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '@users/user.controller';
import { UserService } from '@users/user.service';
import { User, UserSchema } from '@src/modules/database/datamodels/schemas/user';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], ConstApp.USER)],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], ConstApp.USER)],
})
export class UsersModule {}
