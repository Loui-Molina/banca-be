import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class DashboardBankingDto {
    @ApiProperty() _id: ObjectId;
    @ApiProperty() name: string;

    //W cantidad de tickets que salieron ganadores

    //P cantidad de tickets que estan pendientes

    //L cantidad de tickets que estan perdio

    //C cantidad de tickets cancelados

    //Total total de tickets

    //Venta monto de plata recaudada x la venta de los tickets

    //Premios monto de premios que se pagaron

    //% Banca Porc que se lleva la banca de las ganancias

    //% DESC por c/venta

    //NETO VENTA - PREMIOS - (% Banca) - (% desc)

    //Balance balance de la banca
    @ApiProperty() balance: number;
}
