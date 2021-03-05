import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { AppLogger } from "@src/common/logger/app.logger";
import { Connection, Model } from "mongoose";
import { start } from "repl";
import { EventMovement } from "../database/datamodels/schemas/event.movement";
import { ConstApp } from "../utils/const.app";
import { EventsConst } from "./events.const";
import { CreateEvent } from "./events/create.event";

@Injectable()
export class EventsListener{
    constructor(@InjectConnection(ConstApp.EVENT) private readonly connection:Connection,
    @InjectModel(EventMovement.name) private readonly eventMovement: Model<EventMovement>,
    private readonly logger: AppLogger= new AppLogger(),
    ){}


  @OnEvent(EventsConst.CREATE_EVENT,{ async:true })
  async handleSignInEvent(createEvent: CreateEvent) {
    let session = await this.connection.startSession();
    session.startTransaction();
    try{
    let eventMovement = new this.eventMovement();
    eventMovement.payload = { _id:createEvent.id , description: createEvent.description, time: createEvent.time};
    await eventMovement.save();
    session.commitTransaction();
    }
    catch(error){
      session.abortTransaction();
      this.logger.error(ConstApp.EVENT_ERROR + error);
    }
  }
}