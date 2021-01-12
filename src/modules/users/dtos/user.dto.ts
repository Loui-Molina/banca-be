import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@database/datamodels/enums/role';

export class UserDto {
    @ApiProperty({ type: String })
    _id: string;
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    username?: string;
    @ApiProperty({ type: String })
    password?: string;
    @ApiProperty({ type: String, enum: Role })
    role?: Role;
}
