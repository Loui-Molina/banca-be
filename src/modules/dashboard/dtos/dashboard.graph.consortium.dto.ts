import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class DashboardGraphConsortiumDto {
    @ApiProperty() @IsMongoId() _id: ObjectId;
    @ApiProperty() @IsString() name: string;
    @ApiProperty() @IsNumber() value: number;
}
