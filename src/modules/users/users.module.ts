import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@src/modules/database/datamodels/schemas/user';
import { UserController } from '@users/user.controller';
import { UserService } from '@users/user.service';
import { UserAuthService } from '@users/user.auth.service';
import { AuthModule } from '@auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user'), forwardRef(() => AuthModule),],
    providers: [UserService, UserAuthService],
    controllers: [UserController],
    exports: [MongooseModule,UserAuthService],
})
export class UsersModule {}
