import { Injectable } from "@nestjs/common";
import { Repository } from "src/common/interfaces/repository";
import { ObjectId } from "mongoose";
import { Subscriptions } from "../database/datamodels/schemas/subscriptions";
import { User } from "../database/datamodels/schemas/user";


@Injectable()
export class SubscriptionsService implements Repository<Subscriptions, any> {
    delete(id: ObjectId): Promise<any> {
        return Promise.resolve(undefined);
    }

    get(id: ObjectId): Promise<any> {
        return Promise.resolve(undefined);
    }

    getAll(limit?: number, offset?: number): Promise<Array<any>> {
        return Promise.resolve(undefined);
    }

    find(q: string, value: any): Promise<any[]> {
        return Promise.resolve([]);
    }

    findOne(q: string, value: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    update(dto: any, loggedUser: User, ...args: any[]): Promise<any> {
        return Promise.resolve(undefined);
    }

    create(dto: any): Promise<any> {
        return dto;
    }
}
