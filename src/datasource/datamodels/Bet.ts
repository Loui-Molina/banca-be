import {dataObject} from "./DataObject";
import {lotteryTypes} from "./LotteryTypes";
import {DomenicanLotteryPlays} from "./DomenicanLotteryPlays";
import {UsLotteryPlays} from "./UsLotteryPlays";
import {BrasilPlays} from "./BrasilPlays";

export class bet implements dataObject {
    amount?: number;
    eventId?: string;
    lotteryType?: lotteryTypes;
    playType?: DomenicanLotteryPlays | UsLotteryPlays | BrasilPlays;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    creationDate: Date;
}