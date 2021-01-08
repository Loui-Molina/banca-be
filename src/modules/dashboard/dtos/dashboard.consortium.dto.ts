import { ApiProperty } from '@nestjs/swagger';
import {ObjectId} from "mongoose";

export class DashboardConsortiumDto {
    @ApiProperty() _id: ObjectId;
    @ApiProperty() name: string;
    @ApiProperty() balance: number;
}