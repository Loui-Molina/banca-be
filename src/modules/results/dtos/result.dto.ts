import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsDate, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Draw } from 'src/modules/database/datamodels/schemas/draw';

export class ResultDto {
    @ApiProperty() @IsMongoId() _id: ObjectId;
    @ApiProperty() @IsMongoId() lotteryId: ObjectId;
    @ApiProperty() @IsMongoId() creationUserId: ObjectId;
    @ApiProperty() @IsString() lotteryName: string;
    @ApiProperty() @IsString() creationUsername: string;
    @ApiProperty() @IsDate() @IsOptional() date?: Date;
    @ApiProperty() @IsDate() @IsOptional() createdAt?: Date;
    @ApiProperty() @IsDate() @IsOptional() draw?: Draw;
}
