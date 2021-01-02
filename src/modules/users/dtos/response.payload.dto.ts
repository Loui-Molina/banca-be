
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@src/modules/database/datamodels/enums/role';

export class ResponsePayload {
    @ApiProperty({ type: String })
    username: string;
    @ApiProperty({ type: String })
    role: Role;
}
