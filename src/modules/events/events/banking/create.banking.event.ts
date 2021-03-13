import { ObjectId } from "mongoose";

export class CreateBankingEvent{
    creationUserId:ObjectId;
    bankingId:ObjectId;
    consortiumId:ObjectId;
    description:string;
    userId:ObjectId;
}