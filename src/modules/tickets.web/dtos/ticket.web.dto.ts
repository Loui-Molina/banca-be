import { ApiProperty } from '@nestjs/swagger';
import { Draw } from '@database/datamodels/schemas/draw';
import { ObjectId } from 'mongoose';
import { IsDate, IsMongoId, IsObject, IsOptional, IsString } from 'class-validator';
import { PlayDto } from '@betting.panel/dtos/play.dto';
import { BetStatus } from '@database/datamodels/enums/bet.status';
import { Prop } from '@nestjs/mongoose';

export class TicketWebDto {
    @ApiProperty() @IsMongoId() _id: ObjectId;
    @ApiProperty({ type: [PlayDto] }) @IsObject() plays: PlayDto[];
    @ApiProperty() @IsString() bankingName: string;
    @ApiProperty() @IsString() consortiumName: string;
    @ApiProperty({ type: String, enum: BetStatus }) betStatus?: BetStatus;
    @ApiProperty({ type: Date }) date: Date;
}
