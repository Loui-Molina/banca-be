import {dataObject} from "./DataObject";
import {blockedNumber} from "./BlockedNumber";
import {lotteryTypes} from "./LotteryTypes";
import {DomenicanLotteryPlays} from "./DomenicanLotteryPlays";
import {UsLotteryPlays} from "./UsLotteryPlays";
import {BrasilPlays} from "./BrasilPlays";

export class bettingLimit implements dataObject {
    blockedNumbers?: blockedNumber[];
    limit?: number;
    lotteryPlays?: DomenicanLotteryPlays | UsLotteryPlays | BrasilPlays;
    appliedBankingsIds?: string[];
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
}