import { User } from '@database/datamodels/schemas/user';
import { ObjectId } from 'mongoose';
import { MutableObject } from '@common/interfaces/MutableObject';

export interface Repository<MODEL, DTO> {
    getAll(limit?: number, offset?: number, loggedUser?: User): Promise<Array<MODEL | DTO>>;

    find?(q: string, value: any, loggedUser?: User): Promise<MODEL[] | DTO[]>;

    findOne?(q: string, value: any, loggedUser?: User): Promise<MODEL | DTO>;

    update?(dto: DTO, loggedUser?: User, ...args: any[]): Promise<MODEL | DTO>;

    delete?(_id: ObjectId, loggedUser?: User): Promise<MODEL | DTO>;

    // eslint-disable-next-line @typescript-eslint/ban-types
    get(_id: ObjectId | MutableObject<ObjectId>, loggedUser?: User): Promise<MODEL | DTO>;

    create?(dto: DTO, loggedUser?: User): Promise<MODEL | DTO>;
}
