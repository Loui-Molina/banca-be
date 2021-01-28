import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@src/modules/database/datamodels/enums/role';
import { ObjectId } from 'mongoose';

export class ResponsePayload {
    @ApiProperty({ type: String })
    userId: ObjectId;
    @ApiProperty({ type: String })
    role: Role;
}
