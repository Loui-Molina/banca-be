import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthUserModule } from "../auth.user/auth.user.module";
import { BankingsModule } from "../bankings/bankings.module";
import { ConsortiumModule } from "../consortiums/consortium.module";
import { Banking, BankingSchema } from "../database/datamodels/schemas/banking";
import { WebUser, WebUserSchema } from "../database/datamodels/schemas/web.user";
import { ConstApp } from "../utils/const.app";
import { WebUsersController } from "./web.users.controller";
import { WebUsersService } from "./web.users.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: WebUser.name, schema: WebUserSchema }], ConstApp.BANKING),
        MongooseModule.forFeature([{ name: Banking.name, schema: BankingSchema }], ConstApp.BANKING),
        AuthUserModule,
        ConsortiumModule,
        BankingsModule,
    ],
    controllers: [WebUsersController],
    providers: [WebUsersService],
    exports: [WebUsersService],
})
export class WebUsersModule {}
