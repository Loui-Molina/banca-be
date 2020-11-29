import {DataObject} from "./DataObject";

enum LotteryStatus {
    open = 'open',
    closed = 'closed'
}

enum Days {
    mon, tue, wed, thu, fri, sat, sun
}

class LotteryTime {
    day?: Days[];
    openTime?: string;
    closeTime?: string;
}

export class Lottery implements DataObject {
    lotteryId?: string;
    name?: string;
    nickname?: string;
    color?: string;
    logo?: string;
    status?: LotteryStatus;
    bankings?: string[];
    times?: LotteryTime[];

    //TODO lotteryLimits?: LotteryLimit[];

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
}