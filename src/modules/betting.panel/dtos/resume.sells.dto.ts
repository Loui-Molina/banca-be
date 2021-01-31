import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ResumeSellsDto {
    // Cantidades
    @IsNumber() @ApiProperty() cancelled: number; // Tickets cancelados
    @IsNumber() @ApiProperty() expired: number; // Tickets expirados
    @IsNumber() @ApiProperty() claimed: number; // Tickets reclamados
    @IsNumber() @ApiProperty() pending: number; // Tickets pendientes
    @IsNumber() @ApiProperty() winner: number; // Tickets ganadores
    @IsNumber() @ApiProperty() loser: number; // Tickets perdidos
    @IsNumber() @ApiProperty() total: number; // Sumatoria de tickets

    // Montos
    @IsNumber() @ApiProperty() profits: number; // Ganancias (!= cancelled)
    @IsNumber() @ApiProperty() prizes: number; // Premios (winner + claimed)
    @IsNumber() @ApiProperty() pendingPrizes: number; // Premios pendientes (winner)
    @IsNumber() @ApiProperty() balance: number; // Balance
}
