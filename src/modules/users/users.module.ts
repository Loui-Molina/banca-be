import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../database/datamodels/schemas/user";
import { ConstApp } from "../utils/const.app";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], ConstApp.USER)],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
