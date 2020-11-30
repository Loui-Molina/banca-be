import {DataObject} from "./DataObject";
import {DominicanLotteryPrizes} from "./DominicanLotteryPrizes";
import {UsLotteryPrizes} from "./UsLotteryPrizes";
import {BrasilPrizes} from "./BrasilPrizes";
import {OCStatus} from "./OCStatus";


// Estado y limite de apuesta en cada jugada
export class BettingLimit implements DataObject{
    playType?: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
    status: OCStatus;
    betAmount?: number;

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    id: string;
}