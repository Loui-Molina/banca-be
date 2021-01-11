import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '@users/user.controller';
import { UserService } from '@users/user.service';
import { User, UserSchema } from '@src/modules/database/datamodels/schemas/user';
import { AuthUserModule } from '@src/modules/auth.user/auth.user.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user'), AuthUserModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user')],
})
export class UsersModule {}
