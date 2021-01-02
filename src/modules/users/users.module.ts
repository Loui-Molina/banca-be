import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '@users/user.controller';
import { UserService } from '@users/user.service';
import { UserAuthService } from '@users/user.auth.service';
import {AuthService} from "@auth/auth.service";
import {User, UserSchema} from "@src/modules/database/datamodels/schemas/user";
import {AuthModule} from "@auth/auth.module";
import {ConsortiumModule} from "@src/modules/consortiums/consortium.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user'), forwardRef(() => AuthModule),
        ConsortiumModule
    ],
    providers: [UserService, AuthService, UserAuthService],
    controllers: [UserController],
    exports: [UserService, MongooseModule, UserAuthService],
})
export class UsersModule {}
