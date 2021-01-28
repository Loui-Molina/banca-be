import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Play } from '@database/datamodels/schemas/play';
import { BetStatus } from '@database/datamodels/enums/bet.status';
import { IsNumber, IsString } from 'class-validator';

export class ResumeSellsDto {
    @IsNumber()
    @ApiProperty({ type: Number })
    balance: number;
    // Pagos pendientes de jugadores que no reclamaron su premio
    @IsNumber()
    @ApiProperty({ type: Number })
    pendingPayments: number;
    @IsNumber()
    @ApiProperty({ type: Number })
    cancelledBets: number;
    @IsNumber()
    @ApiProperty({ type: Number })
    pendingBets: number;
    @IsNumber()
    @ApiProperty({ type: Number })
    winnerBets: number;
    @IsNumber()
    @ApiProperty({ type: Number })
    claimedBets: number;
    @IsNumber()
    @ApiProperty({ type: Number })
    loserBets: number;
    // Cantidad total de tickets vendidos
    @IsNumber()
    @ApiProperty({ type: Number })
    totalBets: number;
    @IsNumber()
    @ApiProperty({ type: Number })
    totalSells: number;
    @IsNumber()
    @ApiProperty({ type: Number })
    totalAwards: number;
}
