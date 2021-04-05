import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsDate, IsMongoId, IsObject } from 'class-validator';
import { Draw } from '@database/datamodels/schemas/draw';
import { ResultDto } from '@results/dtos/result.dto';

export class AdminLotteryResDto extends PartialType(ResultDto) {
    @ApiProperty() @IsMongoId() _id: ObjectId;
    @ApiProperty() @IsDate() date: Date;
    @ApiProperty() @IsObject() draw?: Draw;
    @ApiProperty() @IsMongoId() creationUserId: ObjectId;
    @ApiProperty() @IsDate() deletionDate?: Date;
    @ApiProperty() @IsMongoId() modificationUserId: ObjectId;
    @ApiProperty() @IsDate() createdAt: Date;
}
