import {DataObject} from "./DataObject";
import {DominicanLotteryPrizes} from "./DominicanLotteryPrizes";
import {UsLotteryPrizes} from "./UsLotteryPrizes";
import {BrasilPrizes} from "./BrasilPrizes";

// Porcentaje que se le paga a cada banca por cada jugada que vende
export class BankingFeeLimit implements DataObject {
    playType?: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes;
    feePercentage?: number;

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    id: string;
}