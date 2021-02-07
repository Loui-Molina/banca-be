import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsDate, IsMongoId, IsObject } from 'class-validator';
import { ResultDto } from '@database/dto/result.dto';
import { Draw } from '@database/datamodels/schemas/draw';

export class AdminLotteryResDto extends PartialType(ResultDto) {
    @ApiProperty() @IsMongoId() _id: ObjectId;
    @ApiProperty() @IsDate() date: Date;
    @ApiProperty() @IsObject() draw?: Draw;
    @ApiProperty() @IsMongoId() creationUserId: ObjectId;
    @ApiProperty() @IsDate() deletionDate?: Date;
    @ApiProperty() @IsMongoId() modificationUserId: ObjectId;
    @ApiProperty() @IsDate() createdAt: Date;
}
