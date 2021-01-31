import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class DashboardGraphBankingDto {
    @ApiProperty() @IsMongoId() _id: ObjectId;
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsNumber() value: number;
}
