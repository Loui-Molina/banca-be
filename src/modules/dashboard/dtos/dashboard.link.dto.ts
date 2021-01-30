import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DashboardDiagramLinkDto {
    @ApiProperty() @IsString() id: string;
    @ApiProperty() @IsString() source: string;
    @ApiProperty() @IsString() target: string;

    constructor(id: string, source: string, target: string) {
        this.id = id;
        this.source = source;
        this.target = target;
    }
}
