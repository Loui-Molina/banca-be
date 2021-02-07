import { PartialType } from '@nestjs/swagger';
import { User } from '@database/datamodels/schemas/user';

export class UserDto extends PartialType(User) {}
