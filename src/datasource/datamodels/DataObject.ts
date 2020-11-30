export interface DataObject {
    id: string;
    creationDate: Date;
    creationUserId: string;
    modificationDate: Date;
    modificationUserId: string;
    deletionDate?: Date;
}