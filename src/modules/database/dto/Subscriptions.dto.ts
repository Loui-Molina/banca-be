import { PartialType } from '@nestjs/swagger';
import { Subscriptions } from '@database/datamodels/schemas/subscriptions';

export class SubscriptionsDto extends PartialType(Subscriptions) {}
