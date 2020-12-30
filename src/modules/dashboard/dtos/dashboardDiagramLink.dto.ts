import { ApiProperty } from '@nestjs/swagger';
import {Consortium} from "@database/datamodels/schemas/Consortium";
import { ObjectId } from 'mongoose';

export class DashboardDiagramLinkDto {
    @ApiProperty() id: string;
    @ApiProperty() source: string;
    @ApiProperty() target: string;


    constructor(id: string, source: string, target: string) {
        this.id = id;
        this.source = source;
        this.target = target;
    }
}
