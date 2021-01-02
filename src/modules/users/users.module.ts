import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '@users/user.controller';
import { UserService } from '@users/user.service';
import { UserAuthService } from '@users/user.auth.service';
import { AuthModule } from '../auth/auth.module';
import {AuthService} from "@auth/auth.service";
import {User, UserSchema} from "@database/datamodels/schemas/User";
import {ConsortiumService} from "@src/modules/consortiums/consortium.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user'), forwardRef(() => AuthModule),],
    providers: [UserService, AuthService, UserAuthService, ConsortiumService],
    controllers: [UserController],
    exports: [MongooseModule,UserAuthService],
})
export class UsersModule {}
