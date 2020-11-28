import {dataObject} from "./DataObject";

enum transactionType {
    deposit, // Deposito realizado por el Boludo
    extraction, // Extraccion realizada por el boludo
    adjust // en caso de robo, imprevisto, etc
}


export class Transaction implements dataObject {
    transactionId?: string;
    amount?: number;
    type?: transactionType;
    lastBalance?: number;
    actualBalance?: number;

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
}
