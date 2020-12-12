import {UserPreference} from './UserPreference';
import {Roles} from '../enums/Roles';
import {User} from './User';
import {Prop, SchemaFactory} from '@nestjs/mongoose';

class SupervisorUser extends User {
    // User members
    @Prop({required: true, immutable: true}) creationDate: Date;
    @Prop({required: true, immutable: true}) creationUserId: string;
    @Prop({required: true}) deletionDate: Date;
    @Prop({required: true}) lastLogin: Date;
    @Prop({required: true}) modificationDate: Date;
    @Prop({required: true}) modificationUserId: string;
    @Prop({required: true}) name: string;
    @Prop({required: true}) password: string;
    @Prop({required: true}) preferences: UserPreference;
    @Prop({required: true, immutable: true}) role: Roles.supervisor;
    @Prop({required: true, immutable: true}) username: string;
}

export const SupervisorUserSchema = SchemaFactory.createForClass(SupervisorUser);