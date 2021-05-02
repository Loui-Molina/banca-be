import { Injectable, Logger } from '@nestjs/common';
import { Repository } from '@common/interfaces/repository';
import { Model, ObjectId } from 'mongoose';
import { User } from '@database/datamodels/schemas/user';
import { InjectModel } from '@nestjs/mongoose';
import { Banking } from '@database/datamodels/schemas/banking';
import { BankingAccounting } from '@database/datamodels/schemas/bankingAccounting';
import { Consortium } from '@database/datamodels/schemas/consortium';
import { AccountingDto } from './dto/accounting.dto';

@Injectable()
export class AccountingService implements Repository<any, AccountingDto> {
    /* TODO CHANGE REPOSITORY PARAMS*/
    private readonly logger: Logger = new Logger(AccountingService.name);

    constructor(
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        @InjectModel(Consortium.name) private readonly consortiumModel: Model<Consortium>,
        @InjectModel(BankingAccounting.name) private readonly bankingAccountingModel: Model<BankingAccounting>,
    ) {}

    async create(dto: any, user: User): Promise<AccountingDto> {
        /*TODO IMPL*/
        return Promise.resolve(undefined);
    }

    async get(ids: { weekId: ObjectId; bankingId: ObjectId }): Promise<AccountingDto> {
        const banking = await this.bankingModel.findById(ids.bankingId).populate('consortiumId').exec();
        const { weekId, bankingId } = ids;
        const { name, consortiumId: consortium, weeklyAccounting } = banking;
        let accountingDto = new AccountingDto();
        if (banking) {
            const accounting: BankingAccounting = await weeklyAccounting.find((value: BankingAccounting) =>
                value._id.equals(weekId),
            );

            if (accounting) {
                const { isPayed, week, earningPercentage } = accounting;
                accountingDto = {
                    banking: name,
                    bankingId: bankingId,
                    weekId: weekId,
                    isPayed: isPayed,
                    percentage: earningPercentage,
                    week: week,
                    consortium: ((consortium as unknown) as Consortium).name,
                };
            }
        }
        return accountingDto;
    }

    async getAll(limit?: number, offset?: number): Promise<Array<AccountingDto>> {
        const pipeline = this.bankingModel.aggregate().match({});
        if (limit && offset) {
            pipeline.skip(offset).limit(limit);
        }
        return pipeline
            .lookup({
                from: 'consortiums',
                localField: 'consortiumId',
                foreignField: '_id',
                as: 'consortiums',
            })
            .unwind('$weeklyAccounting')
            .project({
                bankingId: '$_id',
                weekId: '$weeklyAccounting._id',
                week: '$weeklyAccounting.week',
                isPayed: '$weeklyAccounting.isPayed',
                banking: '$name',
                consortium: { $arrayElemAt: ['$consortiums.name', 0] },
                dueBalance: '$weeklyAccounting.dueBalance',
                percentage: '$weeklyAccounting.earningPercentage',
                _id: 0,
            })
            .exec();
    }

    async update(dto: AccountingDto): Promise<AccountingDto> {
        const { weekId, bankingId } = dto;
        console.log({ weekId, bankingId, dto });
        const banking: Banking | null = await this.bankingModel.findById(bankingId).exec();
        banking.weeklyAccounting.find((accounting: BankingAccounting) => {
            if (accounting?._id?.equals(weekId)) {
                Object.keys(dto).forEach((field: string) => {
                    if (dto[field as keyof AccountingDto]) {
                        (accounting as any)[field] = dto[field as keyof AccountingDto];
                    }
                });
            }
        });
        banking.save();
        return dto;
    }
}
