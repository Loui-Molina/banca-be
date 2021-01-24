import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '@src/modules/users/users.controller';
import { UsersService } from '@users/users.service';
import { User, UserSchema } from '@database/datamodels/schemas/user';
import { ConstApp } from '@utils/const.app';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], ConstApp.USER)],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], ConstApp.USER)],
})
export class UsersModule {}
