import { ResponseDto } from '@utils/dtos/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/database/datamodels/schemas/user';

export class UserCreatedEntity {
    @ApiProperty() response: ResponseDto;
    @ApiProperty() user: User;
}
