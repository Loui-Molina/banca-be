
import { ObjectId } from 'mongoose';
import { Role } from '../database/datamodels/enums/role';

export interface JwtPayload {
    userId: ObjectId;
    role: Role;
}
