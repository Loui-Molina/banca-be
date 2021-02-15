import { ApiProperty } from '@nestjs/swagger';
import { BetStatus } from 'src/modules/database/datamodels/enums/bet.status';
import { IsMongoId, IsObject, IsString, IsDate, IsOptional, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';
import { PlayDto } from './play.dto';


export class BetDto {
    // FIXME DTO INSTEAD OF MODELS
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
