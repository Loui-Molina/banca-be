import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Play } from '@database/datamodels/schemas/play';
import { BetStatus } from '@database/datamodels/enums/bet.status';

export class ResumeSellsDto {
    @ApiProperty({ type: String }) balance: number;
    // Pagos pendientes de jugadores que no reclamaron su premio
    @ApiProperty({ type: String }) pendingPayments: number;
    @ApiProperty({ type: String }) cancelledBets: number;
    @ApiProperty({ type: String }) pendingBets: number;
    @ApiProperty({ type: String }) winnerBets: number;
    @ApiProperty({ type: String }) reclaimedBets: number;
    @ApiProperty({ type: String }) loserBets: number;
    // Cantidad total de tickets vendidos
    @ApiProperty({ type: String }) totalBets: number;
    @ApiProperty({ type: String }) totalSells: number;
    @ApiProperty({ type: String }) totalAwards: number;
}
