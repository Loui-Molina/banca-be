import { ApiProperty } from '@nestjs/swagger';
import { PlayTypes } from '@database/datamodels/enums/play.types';
import { IsEnum, IsObject, IsString } from 'class-validator';
import { PlayNumbersDto } from '@database/dto/play.numbers.dto';

export class LimitVerifyDto {
    @ApiProperty({ type: String, enum: PlayTypes }) @IsEnum(PlayTypes) playType?: PlayTypes;
    @ApiProperty({ type: PlayNumbersDto })
    @IsObject() //FIXME Add validation to @PlayNumbersDto
    playNumbers: PlayNumbersDto;
    @ApiProperty() @IsString() lotteryId?: string;
}
