import {dataObject} from "./DataObject";
import { bankingPreferences } from "./BankingPreferences";
import {Transaction} from "./Transaction";

export class Banking implements dataObject {
    ownerId?: string;
    bankingPreferences?: bankingPreferences;
    transactions?: Transaction[];

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;

}