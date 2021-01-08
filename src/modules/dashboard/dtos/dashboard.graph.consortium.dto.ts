import { ApiProperty } from '@nestjs/swagger';
import {ObjectId} from "mongoose";

export class DashboardGraphConsortiumDto {
    @ApiProperty() _id: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() value: number;
}
