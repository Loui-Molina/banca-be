import { SetMetadata } from '@nestjs/common';
import { Role } from '@src/modules/database/datamodels/enums/role';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
