import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DashboardDiagramDto } from '@src/modules/dashboard/dtos/dashboard.dto';
import { DashboardDiagramNodeDto } from '@src/modules/dashboard/dtos/dashboard.node.dto';
import { DashboardDiagramLinkDto } from '@src/modules/dashboard/dtos/dashboard.link.dto';
import { DashboardDiagramClusterDto } from '@src/modules/dashboard/dtos/dashboard.cluster.dto';
import { Consortium, ConsortiumDocument } from '@src/modules/database/datamodels/schemas/consortium';
import { Banking, BankingDocument } from '@src/modules/database/datamodels/schemas/banking';
import { DashboardConsortiumDto } from '@src/modules/dashboard/dtos/dashboard.consortium.dto';
import { DashboardBankingDto } from '@src/modules/dashboard/dtos/dashboard.banking.dto';
import { User, UserDocument } from '@database/datamodels/schemas/user';
import { Role } from '@database/datamodels/enums/role';
import { DashboardGraphConsortiumDto } from '@src/modules/dashboard/dtos/dashboard.graph.consortium.dto';
import { DashboardGraphBankingDto } from '@src/modules/dashboard/dtos/dashboard.graph.banking.dto';
import { DashboardWidgetsDto } from '@src/modules/dashboard/dtos/dashboard.widgets.dto';
import {DashboardGraphBalanceBankingDto} from "@src/modules/dashboard/dtos/dashboard.graph.balance.banking.dto";
import {Transaction} from "@database/datamodels/schemas/transaction";

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel(Consortium.name) private consortiumModel: Model<ConsortiumDocument>,
        @InjectModel(Banking.name) private bankingModel: Model<BankingDocument>,
    ) {}

    async getDashboardDiagram(): Promise<DashboardDiagramDto> {
        const res = new DashboardDiagramDto();
        const consortiumIds: string[] = [];
        const bankingIds: string[] = [];
        const consortiums: Array<ConsortiumDocument> = await this.consortiumModel.find().exec();
        const bankings: Array<BankingDocument> = await this.bankingModel.find().exec();
        consortiums.forEach((consortium, index) => {
            res.nodes.push(new DashboardDiagramNodeDto(consortium._id.toString(), consortium.name));
            consortiumIds.push(consortium._id.toString());
            bankings.forEach((banking: BankingDocument, index2) => {
                if (banking.consortiumId.toString() === consortium._id.toString()) {
                    bankingIds.push(banking._id.toString());
                    res.nodes.push(new DashboardDiagramNodeDto(banking._id.toString(), banking.name));
                    res.links.push(
                        new DashboardDiagramLinkDto(
                            'link' + (index + 1).toString() + (index2 + 1).toString(),
                            consortium._id.toString(),
                            banking._id.toString(),
                        ),
                    );
                }
            });
        });
        if (consortiumIds.length > 0) {
            res.clusters.push(new DashboardDiagramClusterDto('cluster0', 'Consorcios', consortiumIds));
        }
        if (bankingIds.length > 0) {
            res.clusters.push(new DashboardDiagramClusterDto('cluster1', 'Bancas', bankingIds));
        }
        return res;
    }

    async getConsortiumsStatistics(): Promise<DashboardConsortiumDto[]> {
        const consortiumsDto: DashboardConsortiumDto[] = [];
        const consortiums: Array<ConsortiumDocument> = await this.consortiumModel.find().exec();
        for await (const consortium of consortiums) {
            const balance = await consortium.calculateBalance();
            consortiumsDto.push({
                _id: consortium._id,
                name: consortium.name,
                balance,
            });
        }
        return consortiumsDto;
    }

    async getAdminWidgetsStatistics(): Promise<DashboardWidgetsDto> {
        const consortiums: Array<ConsortiumDocument> = await this.consortiumModel.find().exec();
        let balance = 0;
        let losses = 0;
        let profits = 0;
        let ticketsSold = 0;
        for await (const consortium of consortiums) {
            balance += await consortium.calculateBalance();
            losses += 1;
            profits += 1;
            ticketsSold += 1;
        }
        return {
            balance,
            losses,
            profits,
            ticketsSold,
        };
    }

    async getConsortiumWidgetsStatistics(loggedUser: UserDocument): Promise<DashboardWidgetsDto> {
        const consortiums = await this.consortiumModel.find({ ownerUserId: loggedUser._id }).exec();
        if (consortiums.length === 0) {
            throw new BadRequestException();
        }
        const consortium = consortiums.pop();
        const bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
        let balance = 0;
        let losses = 0;
        let profits = 0;
        let ticketsSold = 0;
        for await (const banking of bankings) {
            balance += await banking.calculateBalance();
            losses += 1;
            profits += 1;
            ticketsSold += 1;
        }
        return {
            balance,
            losses,
            profits,
            ticketsSold,
        };
    }

    async getBankingWidgetsStatistics(loggedUser: UserDocument): Promise<DashboardWidgetsDto> {
        const bankings = await this.bankingModel.find({ ownerUserId: loggedUser._id }).exec();
        if (bankings.length === 0) {
            throw new BadRequestException();
        }
        const banking = bankings.pop();
        return {
            balance: await banking.calculateBalance(),
            losses: 0,
            profits: 0,
            ticketsSold: 0,
        };
    }
    async getBankingsStatistics(loggedUser: UserDocument): Promise<DashboardBankingDto[]> {
        let bankings: Array<BankingDocument> = [];
        if (loggedUser.role === Role.consortium) {
            //If is consortium
            const consortiums = await this.consortiumModel.find({ ownerUserId: loggedUser._id }).exec();
            if (consortiums.length === 0) {
                throw new BadRequestException();
            }
            const consortium = consortiums.pop();
            bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
        } else {
            //If is admin
            bankings = await this.bankingModel.find().exec();
        }
        const bankingsDto: DashboardBankingDto[] = [];
        for await (const banking of bankings) {
            const balance = await banking.calculateBalance();
            bankingsDto.push({
                _id: banking._id,
                name: banking.name,
                balance,
            });
        }
        return bankingsDto;
    }

    async getGraphConsortiumStatistics(): Promise<DashboardGraphConsortiumDto[]> {
        const consortiumsDto: DashboardGraphConsortiumDto[] = [];
        const consortiums: Array<ConsortiumDocument> = await this.consortiumModel.find().exec();
        for await (const consortium of consortiums) {
            const balance = await consortium.calculateBalance();
            consortiumsDto.push({
                _id: consortium._id,
                name: consortium.name,
                value: balance,
            });
        }
        return consortiumsDto;
    }

    async getGraphBankingStatistics(loggedUser: UserDocument): Promise<DashboardGraphBankingDto[]> {
        const bankingsDto: DashboardGraphBankingDto[] = [];
        let bankings: Array<BankingDocument> = [];
        if (loggedUser.role === Role.consortium) {
            //If is consortium
            const consortiums = await this.consortiumModel.find({ ownerUserId: loggedUser._id }).exec();
            if (consortiums.length === 0) {
                throw new BadRequestException();
            }
            const consortium = consortiums.pop();
            bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
        } else {
            //If is admin
            bankings = await this.bankingModel.find().exec();
        }
        for await (const banking of bankings) {
            const balance = await banking.calculateBalance();
            bankingsDto.push({
                _id: banking._id,
                name: banking.name,
                value: balance,
            });
        }
        return bankingsDto;
    }

    async getGraphBankingBalanceStatistics(loggedUser: UserDocument): Promise<DashboardGraphBalanceBankingDto[]> {
        const bankings = await this.bankingModel.find({ ownerUserId: loggedUser._id }).exec();
        if (bankings.length === 0) {
            throw new BadRequestException();
        }
        const data: DashboardGraphBalanceBankingDto[] = [];
        const banking = bankings.pop();
        const dates: Date[] = [];
        for (let i = 0; i < 30; i++) {
            dates.unshift(await this.sumDate(-i));
        }
        for await (const date of dates) {
            const balance = await this.getBalanceByDate(banking.transactions, date);
            data.push({
                name: date.toISOString(),
                value: balance,
            });
        }
        return data;
    }

    private async getBalanceByDate(transactions: Transaction[], date: Date){
        let balance = 0;
        transactions.forEach((item) => {
            if (item.createdAt < date) {
                balance += item.amount;
            }
        });
        return balance;
    }

    private async sumDate(days: number): Promise<Date> {
        const now = new Date();
        return new Date(now.getTime() + 24*60*60*1000 * days)
    }
}
