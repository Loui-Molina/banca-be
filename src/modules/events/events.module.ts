import { Global, Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { MongooseModule } from "@nestjs/mongoose";
import { EventMovement, EventMovementSchema } from "../database/datamodels/schemas/event.movement";
import { ConstApp } from "../utils/const.app";
import { EventsListener } from "./events.listener";

@Global()
@Module({
    imports:[EventEmitterModule.forRoot(),
        MongooseModule.forFeature([{ name: EventMovement.name, schema: EventMovementSchema }], ConstApp.EVENT),],
    providers:[EventsListener]
})
export class EventsModule{

}