 class database {
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


 class data {
    creationDate?: Date;
    consortium?: consortium;
    users?: user[];
    lastBackup?: Date;
}

 class user {
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

 class consortium {
    bankings?: banking[];
    consortiumPrefs?: consortiumPreferences;
}

 class banking {
    owner?: user;
    bankingPreferences?: bankingPreferences;
}

 class betEvent {
    creationDate?: Date;
    eventId?: string;
}

 class bet {
    creationDate?: Date;
    amount?: number;
    eventId?: string;
    lotteryType?: lotteryTypes;
    playType?: domenicanLotteryPlays | usLotteryPlays | brasilPlays;
}

 class balance {
    creationDate?: Date;
    modificationDate?: Date;
    amount?: number;
}

 class transaction {
    transactionId?: string;
    creationDate?: Date;
    amount?: number;
}

 class userPreferences {
    language?: string;
}

 class bankingPreferences {
    logo?: ImageBitmap;
    primaryColor?: string;
    secondaryColor?: string;
    tertiaryColor?: string;
    bankingTitleColor?: string;
    bankingTitleBGColor?: string;
}

 class consortiumPreferences {
    limits?: bettingLimit[];
}

 class bettingLimit {
    limit?: number;
    blockedNumbers?: blockedNumber;
    lotteryType?: lotteryTypes;
    lotteryPlays?: domenicanLotteryPlays | usLotteryPlays | brasilPlays;
}

 class blockedNumber {
    number?: number;
    position?: number;
}

 enum roles {
    admin,
    banker,
    punter
}

 enum lotteryTypes {
    dominican,
    us,
    brazil
}

 enum domenicanLotteryPlays {
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

 enum usLotteryPlays {
    cashThreeStraight,
    cashFourStraight,
    pickFiveStraight,
    cashThreeBox,
    cashFourBox,
    pickFiveBox
}

 enum brasilPlays {
    singulation,
    bolita
}