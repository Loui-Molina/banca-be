import {DataObject} from "./DataObject";
import {ConsortiumPreferences} from "./ConsortiumPreferences";
import {Supervisor} from "./Supervisor";
import {Banking} from "./Banking";
import {Transaction} from "./Transaction";
import {Lottery} from "./Lottery";

export class Consortium implements DataObject {
    supervisors: Map<string, Supervisor>
    consortiumPrefs?: ConsortiumPreferences;
    bankings?: Map<string, Banking>;
    lotteries?: Map<string, Lottery>;
    userId: string;
    transactions?: Transaction[];

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    id: string;
}