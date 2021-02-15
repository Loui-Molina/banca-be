import { PartialType } from '@nestjs/swagger';
import { PhoneNumber } from '../datamodels/schemas/phone.number';


export class PhoneNumberDto extends PartialType(PhoneNumber) {}
