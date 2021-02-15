import { ApiProperty } from '@nestjs/swagger';
import { PlayTypes } from '@src/modules/database/datamodels/enums/play.types';
import { PlayNumbersDto } from '@src/modules/database/dto/play.numbers.dto';
import { IsEnum, IsObject, IsString } from 'class-validator';


export class LimitVerifyDto {
    @ApiProperty({ type: String, enum: PlayTypes }) @IsEnum(PlayTypes) playType?: PlayTypes;
    @ApiProperty({ type: PlayNumbersDto })
    @IsObject() //FIXME Add validation to @PlayNumbersDto
    playNumbers: PlayNumbersDto;
    @ApiProperty() @IsString() lotteryId?: string;
}
