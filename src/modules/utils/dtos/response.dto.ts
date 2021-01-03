import { ApiProperty } from '@nestjs/swagger';
import { User } from '@database/datamodels/schemas/user';

export class ResponseDto {
    @ApiProperty({ type: String })
    message: string;
    @ApiProperty({ type: [String] })
    error: string[];
    @ApiProperty({ type: String })
    statusCode: number;
}
