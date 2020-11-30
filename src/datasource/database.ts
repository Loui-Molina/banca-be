import {Data} from "./datamodels/Data";
import {User} from "./datamodels/User";
import {endWith} from "rxjs/operators";
import {Consortium} from "./datamodels/Consortium";

export class database {
    db: Data = {
        consortium: undefined,
        creationDate: undefined,
        creationUserId: "",
        deletionDate: undefined,
        id: "",
        lastBackup: undefined,
        lastChange: undefined,
        modificationDate: undefined,
        modificationUserId: "",
        users: undefined
    };


// insertValue = () => {
// }
// deleteValue = () => {
// }
// updateValue = () => {
// }
// getValue = () => {
// }
}


