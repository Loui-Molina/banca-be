import { IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionDto } from '@transactions/dtos/transaction.dto';

export class ResponseQueryDto {
    @ApiProperty({ type: Object, isArray: true })
    // eslint-disable-next-line @typescript-eslint/ban-types
    data: Object[];

    @IsPositive()
    @ApiProperty({ type: Number, required: true })
    total: number;

    constructor(response: any) {
        this.data = response.data;
        if (response.metadata.length > 0) {
            this.total = response.metadata.pop().total;
        }
    }
}
