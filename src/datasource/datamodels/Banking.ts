import {DataObject} from "./DataObject";
import { BankingPreferences } from "./BankingPreferences";
import {Transaction} from "./Transaction";

export class Banking implements DataObject {
    ownerId?: string;
    bankingPreferences?: BankingPreferences;
    transactions?: Transaction[];

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;

}