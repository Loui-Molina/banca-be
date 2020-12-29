import { ApiProperty } from '@nestjs/swagger';

export class ConsortiumDto {
  @ApiProperty({ type: String })
  _id: string;
  @ApiProperty({ type: String })
  name: string;
}
