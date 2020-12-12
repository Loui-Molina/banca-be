import {Injectable} from '@nestjs/common';
import {BankingData, BankingDataDocument} from "../datamodels/schemas/BankingData";
import {Document, Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class DatabaseService {

    constructor(@InjectModel(BankingData.name) private readonly bankingDataModel: Model<BankingDataDocument>) {
    }
}
