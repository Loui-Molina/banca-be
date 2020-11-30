import {DataObject} from "./DataObject";

export class Supervisor implements DataObject{
    userId: string;
    idBanca: string[];

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    id: string;
}