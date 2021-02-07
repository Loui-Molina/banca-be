import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { BetStatus } from '@database/datamodels/enums/bet.status';
import { IsDate, IsMongoId, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { PlayDto } from '@betting.panel/dtos/play.dto';

export class BetDto {
    @ApiProperty() @IsMongoId() _id: ObjectId;
    @ApiProperty({ type: [PlayDto] }) @IsObject() plays: PlayDto[];
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
