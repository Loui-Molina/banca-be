import { ObjectId } from 'mongoose';

export interface JwtPayloadRefresh {
    userId: string | ObjectId;
    value: string;
}
