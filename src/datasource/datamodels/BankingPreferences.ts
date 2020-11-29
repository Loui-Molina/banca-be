import {DataObject} from "./DataObject";

export class BankingPreferences implements DataObject {
    logo?: ImageBitmap;
    primaryColor?: string;
    secondaryColor?: string;
    tertiaryColor?: string;
    bankingTitleColor?: string;
    bankingTitleBGColor?: string;

    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
}