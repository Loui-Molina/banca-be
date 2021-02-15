import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Consortium, ConsortiumSchema } from "../database/datamodels/schemas/consortium";
import { ConstApp } from "../utils/const.app";
import { SubscriptionsController } from "./subscriptions.controller";
import { SubscriptionsService } from "./subscriptions.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], ConstApp.BANKING)],
    controllers: [SubscriptionsController],
    providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
