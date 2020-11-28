import {dataObject} from "./DataObject";
import {consortiumPreferences} from "./ConsortiumPreferences";
import {Supervisor} from "./Supervisor";
import {Banking} from "./Banking";
import {Transaction} from "./Transaction";
import {Lottery} from "./Lottery";

export class Consortium implements dataObject {
    supervisors: Map<string, Supervisor>
    consortiumPrefs?: consortiumPreferences;
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
}