import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class DashboardConsortiumDto {
    @ApiProperty() _id: ObjectId;
    @ApiProperty() name: string;

    // Cantidades
    @ApiProperty() cancelled: number; // Tickets cancelados
    @ApiProperty() expired: number; // Tickets expirados
    @ApiProperty() claimed: number; // Tickets reclamados
    @ApiProperty() pending: number; // Tickets pendientes
    @ApiProperty() winner: number; // Tickets ganadores
    @ApiProperty() loser: number; // Tickets perdidos
    @ApiProperty() total: number; // Sumatoria de tickets

    // Montos
    @ApiProperty() profits: number; // Ganancias (!= cancelled)
    @ApiProperty() awards: number; // Premios (winner + claimed)
    @ApiProperty() pendingAwards: number; // Premios pendientes (winner)
    @ApiProperty() balance: number; // Balance
}
