import { PartialType } from '@nestjs/swagger';
import { User } from '../datamodels/schemas/user';


export class UserDto extends PartialType(User) {}
