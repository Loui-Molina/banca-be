import { PartialType } from '@nestjs/swagger';
import { Message } from '../datamodels/schemas/message';


export class MessageDto extends PartialType(Message) {}
