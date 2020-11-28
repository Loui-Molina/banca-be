import {Banking} from "./Banking";
import {dataObject} from "./DataObject";

export class Supervisor implements dataObject{
    userId: string;
    idBanca: string[];

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
}