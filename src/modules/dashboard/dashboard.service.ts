import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DashboardDiagramDto } from '@src/modules/dashboard/dtos/dashboard.dto';
import { DashboardDiagramNodeDto } from '@src/modules/dashboard/dtos/dashboard.node.dto';
import { DashboardDiagramLinkDto } from '@src/modules/dashboard/dtos/dashboard.link.dto';
import { DashboardDiagramClusterDto } from '@src/modules/dashboard/dtos/dashboard.cluster.dto';
import { Consortium, ConsortiumDocument } from '@src/modules/database/datamodels/schemas/consortium';
import { Banking, BankingDocument } from '@src/modules/database/datamodels/schemas/banking';

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
        consortiums.forEach((item) => {
            res.nodes.push(new DashboardDiagramNodeDto(item.id, item.name));
            consortiumIds.push(item.id);
            item.bankings.forEach((banking: BankingDocument) => {
                bankingIds.push(banking.id);
                res.nodes.push(new DashboardDiagramNodeDto(banking.id, banking.name));
                res.links.push(new DashboardDiagramLinkDto(item.id + banking.id, item.id, banking.id));
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
}
