import { User } from '@database/datamodels/schemas/user';
import { ObjectId } from 'mongoose';

export interface Repository<MODEL, DTO> {
    getAll(limit?: number, offset?: number): Promise<Array<MODEL | DTO>>;

    find(q: string, value: any): Promise<MODEL[] | DTO[]>;

    findOne(q: string, value: any): Promise<MODEL | DTO>;

    update(dto: DTO, loggedUser: User, ...args: any[]): Promise<MODEL | DTO>;

    delete(_id: ObjectId): Promise<MODEL | DTO>;

    get(_id: ObjectId): Promise<MODEL | DTO>;

    create?(dto: DTO): Promise<MODEL | DTO>;
}
