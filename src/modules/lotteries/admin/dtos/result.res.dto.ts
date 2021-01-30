import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Result } from '@database/datamodels/schemas/result';
import { Draw } from '@database/datamodels/schemas/draw';
import { IsDate, IsMongoId, IsObject } from 'class-validator';

export class AdminLotteryResDto extends PartialType(Result) {
    @ApiProperty() @IsMongoId() _id: ObjectId;
    @ApiProperty() @IsDate() date: Date;
    @ApiProperty() @IsObject() draw?: Draw;
    @ApiProperty() @IsMongoId() creationUserId: ObjectId;
    @ApiProperty() @IsDate() deletionDate?: Date;
    @ApiProperty() @IsMongoId() modificationUserId: ObjectId;
    @ApiProperty() @IsDate() createdAt: Date;
}
