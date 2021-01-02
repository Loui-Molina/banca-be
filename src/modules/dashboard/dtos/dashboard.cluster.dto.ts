import { ApiProperty } from '@nestjs/swagger';

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
