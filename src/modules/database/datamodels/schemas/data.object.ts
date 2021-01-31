import { ObjectId } from 'mongoose';

export interface DataObject {
    creationUserId: ObjectId;
    modificationUserId: ObjectId;
    deletionDate?: Date;
    //TODO ADD SOMETHING GONZA SAID BUT I DONT REMEMBER
}
