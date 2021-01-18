import { Role } from '@database/datamodels/enums/role';
import { ObjectId } from 'mongoose';

export interface JwtPayload {
    userId: ObjectId;
    role: Role;
}
