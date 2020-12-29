import { Roles } from '@database/datamodels/enums/Roles';
import { ApiProperty } from '@nestjs/swagger';

export class ResponsePayload {
  @ApiProperty({ type: String })
  username: string;
  @ApiProperty({ type: String })
  role: Roles;
}
