export class database {
    users: Map<string, user> = new Map<string, user>();


    testUser: user = {
        idUser: 'juancito',
        balance: {amount: 100}

    }

    db: data = {};


// insertValue = () => {
// }
// deleteValue = () => {
// }
// updateValue = () => {
// }
// getValue = () => {
// }
}


// Main data object model
export class data implements dataObject {
    creationDate?: Date;
    modificationDate?: Date;
    modificationUserId?: string;
    lastChange?: Date;
    lastBackup?: Date;
    consortium?: consortium;
    users?: Map<string, user>;
}

// Users data object model
export class user implements dataObject {
    creationDate?: Date;
    modificationDate?: Date;
    modificationUserId?: string;
    lastLogin?: Date;
    idUser?: string;
    bankingId?: string;
    name?: string;
    username?: string;
    password?: string;
    email?: string;
    phone?: number | string;
    balance?: balance;
    role?: roles;
    preferences?: userPreferences;
    transactions?: transaction[];
}

export class consortium implements dataObject {
    bankings?: banking[];
    consortiumPrefs?: consortiumPreferences;
    creationDate?: Date;
    modificationDate?: Date;
    modificationUserId?: string;
}

export class banking implements dataObject {
    ownerId?: string;
    bankingPreferences?: bankingPreferences;
    creationDate?: Date;
    modificationDate?: Date;
    modificationUserId?: string;
}

export class betEvent implements dataObject {
    creationDate?: Date;
    eventId?: string;
    modificationDate?: Date;
    modificationUserId?: string;
}

export class bet implements dataObject {
    creationDate?: Date;
    amount?: number;
    eventId?: string;
    lotteryType?: lotteryTypes;
    playType?: domenicanLotteryPlays | usLotteryPlays | brasilPlays;
    modificationDate?: Date;
    modificationUserId?: string;
}

export class balance implements dataObject {
    creationDate?: Date;
    modificationDate?: Date;
    amount?: number;
    modificationUserId?: string;
}

export class transaction implements dataObject {
    transactionId?: string;
    creationDate?: Date;
    amount?: number;
    modificationDate?: Date;
    modificationUserId?: string;
}

export class userPreferences implements dataObject {
    language?: string;
    creationDate?: Date;
    modificationDate?: Date;
    modificationUserId?: string;
}

export class bankingPreferences implements dataObject {
    logo?: ImageBitmap;
    primaryColor?: string;
    secondaryColor?: string;
    tertiaryColor?: string;
    bankingTitleColor?: string;
    bankingTitleBGColor?: string;
    creationDate?: Date;
    modificationDate?: Date;
    modificationUserId?: string;
}

export class consortiumPreferences implements dataObject {
    limits?: bettingLimit[];
    creationDate?: Date;
    modificationDate?: Date;
    modificationUserId?: string;
}

export class bettingLimit implements dataObject {
    limit?: number;
    blockedNumbers?: blockedNumber[];
    lotteryType?: lotteryTypes;
    lotteryPlays?: domenicanLotteryPlays | usLotteryPlays | brasilPlays;
    creationDate?: Date;
    modificationDate?: Date;
    modificationUserId?: string;
}

export class blockedNumber implements dataObject {
    number?: number;
    position?: number;
    creationDate?: Date;
    modificationDate?: Date;
    modificationUserId?: string;
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

interface dataObject {
    creationDate?: Date;
    modificationDate?: Date;
    modificationUserId?: string;
}
