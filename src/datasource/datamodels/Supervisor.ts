import {Banking} from "./Banking";
import {dataObject} from "./DataObject";

export class Supervisor implements dataObject{
    userId: string;
    idBanca: string[];
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
}