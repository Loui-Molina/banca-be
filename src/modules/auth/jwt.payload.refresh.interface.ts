import { ObjectId } from 'mongoose';

export interface JwtPayloadRefresh {
    userId: ObjectId;
    value: string;
}
