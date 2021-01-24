import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '@src/modules/users/users.controller';
import { UsersService } from '@users/users.service';
import { User, UserSchema } from '@database/datamodels/schemas/user';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user')],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user')],
})
export class UsersModule {}
