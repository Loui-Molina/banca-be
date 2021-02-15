import { PartialType } from '@nestjs/swagger';
import { Subscriptions } from '../datamodels/schemas/subscriptions';

export class SubscriptionsDto extends PartialType(Subscriptions) {}
