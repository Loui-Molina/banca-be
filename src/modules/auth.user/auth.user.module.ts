import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RefreshToken, RefreshTokenSchema } from "@database/datamodels/schemas/refresh.token";
import { User, UserSchema } from "@database/datamodels/schemas/user";
import { AuthUserService } from "@auth.user/auth.user.service";

@Module({
    imports:[ MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user'),
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], 'user'),],
    providers:[AuthUserService],
    exports:[AuthUserService, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user'),
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }], 'user'),],
})
export class AuthUserModule{}