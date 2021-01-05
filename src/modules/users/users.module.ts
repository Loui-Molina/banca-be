import {  Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '@users/user.controller';
import { UserService } from '@users/user.service';
import { User, UserSchema } from '@src/modules/database/datamodels/schemas/user';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user'),
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user')],
})
export class UsersModule {}
