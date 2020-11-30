import {DataObject} from "./DataObject";
import {PlayTypes} from "./PlayTypes";

export class Bet implements DataObject {
    plays?: Play[];
    date?: Date;


    // Data object members
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    creationDate: Date;
    id: string;
}

class Play implements DataObject {
    playType?: PlayTypes;
    amount?: number;


    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    id: string;
}