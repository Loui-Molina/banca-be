import { Injectable, Logger } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { User } from '@database/datamodels/schemas/user';
import { InjectModel } from '@nestjs/mongoose';
import { Banking } from '@database/datamodels/schemas/banking';
import { BankingAccounting } from '@database/datamodels/schemas/bankingAccounting';
import { Consortium } from '@database/datamodels/schemas/consortium';
import { AccountingDto } from './dto/accounting.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { ResponseQueryDto } from '@common/dto/response-query.dto';
import { DashboardService } from '@dashboard/dashboard.service';
import { DashboardBankingDto } from '@dashboard/dtos/dashboard.banking.dto';
import { FilterQueryTypeEnumDto } from '@common/dto/filter-query-type-enum.dto';

@Injectable()
export class AccountingService {
    /* TODO CHANGE REPOSITORY PARAMS*/
    private readonly logger: Logger = new Logger(AccountingService.name);

    constructor(
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        @InjectModel(Consortium.name) private readonly consortiumModel: Model<Consortium>,
        @InjectModel(BankingAccounting.name) private readonly bankingAccountingModel: Model<BankingAccounting>,
        private readonly dashboardService: DashboardService,
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

    async getAll(req: PaginationQueryDto, loggedUser: User): Promise<ResponseQueryDto> {
        const filters = [];
        let interval: { initial: Date; final: Date };
        if (req.filters) {
            for (const filter of req.filters) {
                if (filter.type === FilterQueryTypeEnumDto.daterange) {
                    interval = { initial: filter.value[0], final: filter.value[1] };
                } else {
                    filters.push({ [filter.key]: { $regex: filter.value } });
                }
            }
        }

        const bankingsStatistics: DashboardBankingDto[] = await this.dashboardService.getBankingsStatistics(
            loggedUser,
            interval,
        );
        return bankingsStatistics ? new ResponseQueryDto({ data: bankingsStatistics }) : null;
    }

    async update(dto: AccountingDto): Promise<AccountingDto> {
        const { weekId, bankingId } = dto;
        console.log({ weekId, bankingId, dto });
        const banking: Banking | null = await this.bankingModel.findById(bankingId).exec();
        banking.weeklyAccounting.find((accounting: BankingAccounting) => {
            if (accounting._id.equals(weekId)) {
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
