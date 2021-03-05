import { ObjectId } from "mongoose";

export class CreateEvent{
    id:ObjectId;
    description:string;
    time:Date;
}