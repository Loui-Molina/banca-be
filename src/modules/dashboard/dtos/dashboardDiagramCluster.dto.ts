import { ApiProperty } from '@nestjs/swagger';
import {Consortium} from "@database/datamodels/schemas/Consortium";
import { ObjectId } from 'mongoose';

export class DashboardDiagramClusterDto {
    @ApiProperty() id: string;
    @ApiProperty() label: string;
    @ApiProperty() childNodeIds: string[];


    constructor(id: string, label: string, childNodeIds: string[]) {
        this.id = id;
        this.label = label;
        this.childNodeIds = childNodeIds;
    }
}
