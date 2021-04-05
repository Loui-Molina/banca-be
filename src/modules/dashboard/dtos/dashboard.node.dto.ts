import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DashboardDiagramNodeDto {
    @ApiProperty() @IsString() id: string;
    @ApiProperty() @IsString() label: string;

    constructor(id: string, label: string) {
        this.id = id;
        this.label = label;
    }
}
