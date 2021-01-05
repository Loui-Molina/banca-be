import {ObjectId} from 'mongoose';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateBankingDto {
    @ApiProperty() _id:ObjectId;
    @ApiProperty() name:string;
    @ApiProperty() status:boolean;
    @ApiProperty() ownerUserId:ObjectId;
    @ApiProperty() showPercentage:boolean;
    @ApiProperty() selectedConsortium:ObjectId;
}
