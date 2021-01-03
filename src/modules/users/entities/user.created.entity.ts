import { ResponseDto } from '@utils/dtos/response.dto';
import { User, UserDocument } from '@database/datamodels/schemas/user';

export class UserCreatedEntity {
    response: ResponseDto;
    user: UserDocument;
}
