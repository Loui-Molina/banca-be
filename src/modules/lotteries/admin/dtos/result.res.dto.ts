import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Result } from '@database/datamodels/schemas/result';
import { Draw } from '@database/datamodels/schemas/draw';

export class AdminLotteryResDto extends PartialType(Result) {
    @ApiProperty() _id: ObjectId;
    @ApiProperty() date: Date;
    @ApiProperty() draw?: Draw;
    @ApiProperty() creationUserId: ObjectId;
    @ApiProperty() deletionDate?: Date;
    @ApiProperty() modificationUserId: ObjectId;
    @ApiProperty() createdAt: Date;
}
