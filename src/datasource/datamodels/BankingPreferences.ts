import {dataObject} from "./DataObject";

export class bankingPreferences implements dataObject {
    logo?: ImageBitmap;
    primaryColor?: string;
    secondaryColor?: string;
    tertiaryColor?: string;
    bankingTitleColor?: string;
    bankingTitleBGColor?: string;
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
}