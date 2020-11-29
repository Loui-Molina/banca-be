import {DataObject} from "./DataObject";
import {lotteryTypes} from "./LotteryTypes";
import {DominicanLotteryPlays} from "./DominicanLotteryPlays";
import {UsLotteryPlays} from "./UsLotteryPlays";
import {BrasilPlays} from "./BrasilPlays";

export class Bet implements DataObject {
    amount?: number;
    eventId?: string;
    lotteryType?: lotteryTypes;
    playType?: DominicanLotteryPlays | UsLotteryPlays | BrasilPlays;

    // Data object members
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    creationDate: Date;
}