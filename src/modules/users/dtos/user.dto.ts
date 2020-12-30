import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({ type: String })
    _id: string;
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    username?: string;
    @ApiProperty({ type: String })
    password?: string;
}
