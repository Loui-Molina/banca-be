import {ObjectId} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export class DeleteBankingDto {
    @ApiProperty() bankingId: ObjectId;
    @ApiProperty() consortiumId: ObjectId;
}