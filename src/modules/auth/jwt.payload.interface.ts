import { Role } from '@database/datamodels/enums/role';

export interface JwtPayload {
    userId: string;
    role: Role;
}
