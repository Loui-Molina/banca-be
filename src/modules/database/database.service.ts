import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banking, BankingDocument } from '@database/datamodels/schemas/Banking';
import { ConsortiumPreference, ConsortiumPreferenceDocument } from '@database/datamodels/schemas/ConsortiumPreference';
import { Lottery, LotteryDocument } from '@database/datamodels/schemas/Lottery';
import { Supervisor, SupervisorDocument } from '@database/datamodels/schemas/Supervisor';
import { Transaction, TransactionDocument } from '@database/datamodels/schemas/Transaction';
import { User, UserDocument } from '@database/datamodels/schemas/User';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel(Supervisor.name)
    private readonly supervisorDocumentModel: Model<SupervisorDocument>,
    @InjectModel(ConsortiumPreference.name)
    private readonly consortiumPreferenceDocumentModel: Model<ConsortiumPreferenceDocument>,
    @InjectModel(Banking.name)
    private readonly bankingDocumentModel: Model<BankingDocument>,
    @InjectModel(Lottery.name)
    private readonly lotteryDocumentModel: Model<LotteryDocument>,
    @InjectModel(Transaction.name)
    private readonly transactionDocumentModel: Model<TransactionDocument>,
  ) {}

  getSupervisors(): Promise<Array<SupervisorDocument>> {
    return this.supervisorDocumentModel.find().exec();
    // TODO MAKE RETURN SOMETHING IF THERE IS NOTHING
  }

  getConsortiumPrefs(): Promise<ConsortiumPreferenceDocument> {
    return this.consortiumPreferenceDocumentModel.findOne().exec();
    // TODO MAKE RETURN SOMETHING IF THERE IS NOTHING
  }

  getBankings(): Promise<Array<BankingDocument>> {
    return this.bankingDocumentModel.find().exec();
    // TODO MAKE RETURN SOMETHING IF THERE IS NOTHING
  }

  getLotteries(): Promise<Array<LotteryDocument>> {
    return this.lotteryDocumentModel.find().exec();
    // TODO MAKE RETURN SOMETHING IF THERE IS NOTHING
  }

  getTransactions(): Promise<Array<TransactionDocument>> {
    return this.transactionDocumentModel.find().exec();
    // TODO MAKE RETURN SOMETHING IF THERE IS NOTHING
  }
}
