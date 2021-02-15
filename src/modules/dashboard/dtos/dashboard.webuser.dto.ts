import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class DashboardWebuserDto {
    @ApiProperty() @IsMongoId() _id: ObjectId;
    @ApiProperty() @IsString() bankingName: string;
    @ApiProperty() @IsString() consortiumName: string;
    @ApiProperty() @IsString() name: string;

    // Cantidades
    @ApiProperty() @IsNumber() claimed: number; // Tickets reclamados
    @ApiProperty() @IsNumber() pending: number; // Tickets pendientes
    @ApiProperty() @IsNumber() loser: number; // Tickets perdidos
    @ApiProperty() @IsNumber() total: number; // Sumatoria de tickets

    // Montos
    @ApiProperty() @IsNumber() profits: number; // Ganancias (!= cancelled)
    @ApiProperty() @IsNumber() prizes: number; // Premios (winner + claimed)
    @ApiProperty() @IsNumber() pendingPrizes: number; // Premios pendientes (winner)
    @ApiProperty() @IsNumber() balance: number; // Balance
}
