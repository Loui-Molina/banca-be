import { Roles } from '@database/datamodels/enums/Roles';

export interface JwtPayload {
  username: string;
  role: Roles;
}
