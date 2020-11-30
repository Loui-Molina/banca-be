import {DataObject} from "./DataObject";
import {DominicanLotteryPrizes} from "./DominicanLotteryPrizes";
import {UsLotteryPrizes} from "./UsLotteryPrizes";
import {BrasilPrizes} from "./BrasilPrizes";

// Monto a pagar por cada unidad monetaria al momento de haber un ganador
export class PrizeLimit implements DataObject {
    playType?: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
    paymentAmount?: number;

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    id: string;
}