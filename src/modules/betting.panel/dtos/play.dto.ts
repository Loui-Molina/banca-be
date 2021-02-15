import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsEnum, IsMongoId, IsNumber, IsObject, IsString } from 'class-validator';
import { PlayTypes } from '@src/modules/database/datamodels/enums/play.types';
import { PlayNumbersDto } from '@src/modules/database/dto/play.numbers.dto';

export class PlayDto {
    @ApiProperty({ type: String, enum: PlayTypes }) @IsEnum(PlayTypes) playType?: PlayTypes;
    @ApiProperty({ type: Number }) @IsNumber() amount?: number;
    @ApiProperty({ type: PlayNumbersDto })
    @IsObject() //FIXME ADD VALIDATION TO PlayNumbersDto
    playNumbers: PlayNumbersDto;
    @ApiProperty() @IsMongoId() lotteryId?: ObjectId;
    @ApiProperty() @IsString() lotteryName?: string;
}
