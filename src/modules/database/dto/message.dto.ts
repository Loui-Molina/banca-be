import { PartialType } from '@nestjs/swagger';
import { Message } from '@database/datamodels/schemas/message';

export class MessageDto extends PartialType(Message) {}
