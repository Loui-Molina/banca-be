import { ApiProperty } from '@nestjs/swagger';

export class DashboardDiagramNodeDto {
    @ApiProperty() id: string;
    @ApiProperty() label: string;


    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }
}
