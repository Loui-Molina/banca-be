import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Play } from '@database/datamodels/schemas/play';
import { BetStatus } from '@database/datamodels/enums/bet.status';
import { IsDate, IsMongoId, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class BetDto {
    @ApiProperty() @IsMongoId() _id: ObjectId;
    @ApiProperty({ type: [Play] }) @IsObject() plays: Play[];
    @ApiProperty({ type: String }) @IsString() sn: string;
    @ApiProperty({ type: Date }) @IsDate() date: Date;
    @ApiProperty({ type: Date }) @IsDate() claimDate: Date;
    @ApiProperty({
        type: String,
        enum: BetStatus,
    })
    @IsOptional()
    @IsObject()
    betStatus?: BetStatus;
    @ApiProperty({ type: Number }) @IsNumber() @IsOptional() amountWin?: number;
}
