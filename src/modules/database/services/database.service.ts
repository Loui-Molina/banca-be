import {Inject, Injectable} from '@nestjs/common';
import {BankingData, BankingDataDocument} from "../../../datamodels/schemas/BankingData";
import {Model} from "mongoose";

@Injectable()
export class DatabaseService {

    constructor(@Inject(BankingData.name) private appDataModel: Model<BankingDataDocument>) {


    }

}
