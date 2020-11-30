import {DataObject} from "./DataObject";
import {TransactionType} from "./TransactionType";


export class Transaction implements DataObject {
    transactionId?: string;
    amount?: number;
    type?: TransactionType;
    lastBalance?: number;
    actualBalance?: number;
    originUserId?: string; //id del usuario donde se genero la transaccion
    destinationUserId?: string; //id del usuario donde se genero la transaccion

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    id: string;
}
