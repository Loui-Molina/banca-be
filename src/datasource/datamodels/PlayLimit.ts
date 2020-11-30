import {DataObject} from "./DataObject";
import {DominicanLotteryPrizes} from "./DominicanLotteryPrizes";
import {UsLotteryPrizes} from "./UsLotteryPrizes";
import {BrasilPrizes} from "./BrasilPrizes";

// cantidad de veces que se puede hacer una jugada
export class PlayLimit implements DataObject {
    limit?: number;
    playType?: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
    appliedBankingsIds?: string[];

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    id: string;
}