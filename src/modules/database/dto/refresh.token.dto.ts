import { PartialType } from '@nestjs/swagger';
import { RefreshToken } from '../datamodels/schemas/refresh.token';

export class RefreshTokenDto extends PartialType(RefreshToken) {}
