import { ObjectId } from 'mongoose';

export interface DataObject {
    creationUserId: string | ObjectId;
    modificationUserId: string | ObjectId;
    deletionDate?: Date;
    //TODO ADD SOMETHING GONZA SAID BUT I DONT REMEMBER
}
