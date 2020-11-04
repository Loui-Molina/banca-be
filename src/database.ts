export class database {
    private data: data = {};


    insertValue = () => {
    }
    deleteValue = () => {
    }
    updateValue = () => {
    }
    getValue = () => {
    }


}


export interface data {
    creationDate?: Date;
    consortium?: consortium;
    users?: user[];
    lastBackup?: Date;
}

export interface user {
    creationDate?: Date;
    deletionDate?: Date;
    lastLogin?: Date;
    idUser?: number;
    banking?: string;
    name?: string;
    username?: string;
    password?: string;
    email?: string;
    phone?: number | string;
    balance?: balance;
    role?: roles;
    preferences?: userPreferences;
}

export interface consortium {
    bankings?: banking[];
    consortiumPrefs?: consortiumPreferences;
}

export interface banking {
    owner?: user;
    bankingPreferences?: bankingPreferences;
}

export interface event {
    creationDate?: Date;
    eventId?: string;
}

export interface bet {
    creationDate?: Date;
    amount?: number;
    eventId?: string;
    lotteryType?: lotteryTypes;
    playType?: domenicanLotteryPlays | usLotteryPlays | brasilPlays;
}

export interface balance {
    creationDate?: Date;
    modificationDate?: Date;
    amount?: number;
}

export interface transaction {
    transactionId?: string;
    creationDate?: Date;
    amount?: number;
}

export interface userPreferences {
    language?: string;
}

export interface bankingPreferences {
    logo?: ImageBitmap;
    primaryColor?: string;
    secondaryColor?: string;
    tertiaryColor?: string;
    bankingTitleColor?: string;
    bankingTitleBGColor?: string;
}

export interface consortiumPreferences {
    limits?: bettingLimit[];
}

export interface bettingLimit {
    limit?: number;
    blockedNumbers?: blockedNumber;
    lotteryType?: lotteryTypes;
    lotteryPlays?: domenicanLotteryPlays | usLotteryPlays | brasilPlays;
}

export interface blockedNumber {
    number?: number;
    position?: number;
}

export enum roles {
    admin,
    banker,
    punter
}

export enum lotteryTypes {
    dominican,
    us,
    brazil
}

export enum domenicanLotteryPlays {
    first,
    second,
    third,
    double,
    pale,
    paleTwoThree,
    triplet,
    twoNumbers,
    superPale
}

export enum usLotteryPlays {
    cashThreeStraight,
    cashFourStraight,
    pickFiveStraight,
    cashThreeBox,
    cashFourBox,
    pickFiveBox
}

export enum brasilPlays {
    singulation,
    bolita
}