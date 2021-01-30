import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class DashboardDiagramClusterDto {
    @ApiProperty() @IsString() id: string;
    @ApiProperty() @IsString() label: string;
    @ApiProperty() @IsArray() childNodeIds: string[];

    constructor(id: string, label: string, childNodeIds: string[]) {
        this.id = id;
        this.label = label;
        this.childNodeIds = childNodeIds;
    }
}
