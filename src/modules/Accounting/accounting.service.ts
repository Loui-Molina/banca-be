import { Injectable, Logger } from '@nestjs/common';
import { Repository } from '@common/interfaces/repository';
import { Model, ObjectId } from 'mongoose';
import { User } from '@database/datamodels/schemas/user';
import { InjectModel } from '@nestjs/mongoose';
import { Banking } from '@database/datamodels/schemas/banking';
import { BankingAccounting } from '@database/datamodels/schemas/bankingAccounting';

/* TODO CHANGE REPOSITORY PARAMS*/
@Injectable()
export class AccountingService implements Repository<any, any> {
    private readonly logger: Logger = new Logger(AccountingService.name);

    constructor(
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        @InjectModel(BankingAccounting.name) private readonly bankingAccountingModel: Model<BankingAccounting>,
    ) {}

    async create(user: User): Promise<any> {
        const promise = await this.bankingModel.findById('607f7e64e6352f487401d390').exec();
        const accounting: BankingAccounting = new this.bankingAccountingModel();
        accounting.creationUserId = user._id;
        accounting.modificationUserId = user._id;
        accounting.isPayed = false;
        accounting.dueBalance = 1000;
        accounting.earningPercentage = 10;
        accounting.week = 'test';
        promise.weeklyAccounting.push(accounting);
        await promise.save();
        console.log('updated');
        return accounting;
    }

    delete(_id: ObjectId): Promise<any> {
        return Promise.resolve(undefined);
    }

    find(q: string, value: any): Promise<any[]> {
        return Promise.resolve(undefined);
    }

    findOne(q: string, value: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    get(_id: ObjectId): Promise<any> {
        return Promise.resolve(undefined);
    }

    async getAll(limit?: number, offset?: number): Promise<Array<any>> {
        return await this.bankingModel
            .aggregate()
            .match({})
            .lookup({
                from: 'consortiums',
                localField: 'consortiumId',
                foreignField: '_id',
                as: 'consortiums',
            })
            .unwind('$weeklyAccounting')
            .project({
                _id: '$weeklyAccounting._id',
                week: '$weeklyAccounting.week',
                isPayed: '$weeklyAccounting.isPayed',
                banking: '$name',
                consortium: { $arrayElemAt: ['$consortiums.name', 0] },
                dueBalance: '$weeklyAccounting.dueBalance',
                percentage: '$weeklyAccounting.earningPercentage',
            })
            .exec();
    }

    update(dto: any, loggedUser: User, ...args: any[]): Promise<any> {
        return Promise.resolve(undefined);
    }
}
