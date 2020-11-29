import {DataObject} from "./DataObject";
import {BlockedNumber} from "./BlockedNumber";
import {DominicanLotteryPlays} from "./DominicanLotteryPlays";
import {UsLotteryPlays} from "./UsLotteryPlays";
import {BrasilPlays} from "./BrasilPlays";

export class BettingLimit implements DataObject {
    limit?: number;
    lotteryPlays?: DominicanLotteryPlays | UsLotteryPlays | BrasilPlays;
    appliedBankingsIds?: string[];

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
}