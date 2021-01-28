import { ResponseDto } from '@utils/dtos/response.dto';
import { User } from '@database/datamodels/schemas/user';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreatedEntity {
    @ApiProperty() response: ResponseDto;
    @ApiProperty() user: User;
}
