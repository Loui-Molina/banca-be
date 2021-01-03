import { UserPreference } from '@src/modules/database/datamodels/schemas/user.preference';
import { Prop } from '@nestjs/mongoose';
import { Role } from '@database/datamodels/enums/role';
import { User } from '@src/modules/database/datamodels/schemas/user';

class SupervisorUser extends User {
    // User members
    @Prop({ required: true, immutable: true }) creationDate: Date;
    @Prop({ required: true, immutable: true }) creationUserId: string;
    @Prop() deletionDate?: Date;
    @Prop({ required: true }) lastLogin: Date;
    @Prop({ required: true }) modificationDate: Date;
    @Prop({ required: true }) modificationUserId: string;
    @Prop({ required: true }) name: string;
    @Prop({ required: true }) password: string;
    @Prop({ required: true }) preferences: UserPreference;
    @Prop({ required: true, immutable: true }) role: Role.supervisor;
    @Prop({ required: true, immutable: true }) username: string;
}
