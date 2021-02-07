import { PartialType } from '@nestjs/swagger';
import { RefreshToken } from '@database/datamodels/schemas/refresh.token';

export class RefreshTokenDto extends PartialType(RefreshToken) {}
