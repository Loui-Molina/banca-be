import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@src/modules/database/datamodels/enums/role';

export class ResponsePayload {
    @ApiProperty({ type: String })
    userId: string;
    @ApiProperty({ type: String })
    role: Role;
}
