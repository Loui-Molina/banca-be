import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Days } from '@database/datamodels/enums/days';
import { Result } from '@database/datamodels/schemas/result';
import { Lottery } from '@database/datamodels/schemas/lottery';
import { Prop } from '@nestjs/mongoose';
import { Draw, DrawSchema } from '@database/datamodels/schemas/draw';

export class AdminLotteryResDto extends PartialType(Result) {
    @ApiProperty() _id: ObjectId;
    @ApiProperty() date: Date;
    @ApiProperty() draw?: Draw;
    @ApiProperty() creationUserId: string;
    @ApiProperty() deletionDate?: Date;
    @ApiProperty() modificationUserId: string;
    @ApiProperty() createdAt: Date;
}
