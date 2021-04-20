import { SetMetadata } from '@nestjs/common';
import { Role } from '@database/datamodels/enums/role';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Roles = (...roles: Role[]) => SetMetadata('roles', [...roles, Role.sysadmin]);
