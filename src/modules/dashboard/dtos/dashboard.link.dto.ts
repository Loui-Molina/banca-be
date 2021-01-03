import { ApiProperty } from '@nestjs/swagger';

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
