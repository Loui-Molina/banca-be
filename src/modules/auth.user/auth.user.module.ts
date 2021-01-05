import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../database/datamodels/schemas/user";
import { AuthUserService } from "./auth.user..service";

@Module({
    imports:[ MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user'),],
    providers:[AuthUserService],
    exports:[AuthUserService, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user'),],
})
export class AuthUserModule{}