import { User } from '@database/datamodels/schemas/user';
import { ObjectId } from 'mongoose';

export interface AbmMethods<T, E> {
    getAll(): Promise<Array<T>>;

    getFiltered(q: string, value: any): Promise<T[]>;

    getSingleFiltered(q: string, value: any): Promise<T>;

    update(dto: E, loggedUser: User, ...args: any[]): Promise<T>;

    delete(id: ObjectId): Promise<T>;

    get(id: ObjectId): Promise<T>;
}
