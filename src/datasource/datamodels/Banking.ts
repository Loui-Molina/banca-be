import {DataObject} from "./DataObject";
import {BankingPreferences} from "./BankingPreferences";
import {Transaction} from "./Transaction";
import {Lottery} from "./Lottery";
import {Bet} from "./Bet";

export class Banking implements DataObject {
    ownerId?: string;
    bankingPreferences?: BankingPreferences;
    transactions?: Transaction[];
    lotteries?: Map<string, Lottery>;
    bets?: Bet[];

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    id: string;

}