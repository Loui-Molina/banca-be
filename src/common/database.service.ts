import { Injectable } from '@nestjs/common';
import {
  Transaction,
  TransactionDocument,
} from './datamodels/schemas/Transaction';
import {
  Supervisor,
  SupervisorDocument,
} from './datamodels/schemas/Supervisor';
import {
  ConsortiumPreference,
  ConsortiumPreferenceDocument,
} from './datamodels/schemas/ConsortiumPreference';
import { Lottery, LotteryDocument } from './datamodels/schemas/Lottery';
import { Banking, BankingDocument } from './datamodels/schemas/Banking';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './datamodels/schemas/User';

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
    @InjectModel(User.name)
    private readonly userDocumentModel: Model<UserDocument>,
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

  getOwnerId(): Promise<UserDocument> {
    return this.userDocumentModel.findOne().exec();
    // TODO MAKE RETURN SOMETHING IF THERE IS NOTHING
  }

  getTransactions(): Promise<Array<TransactionDocument>> {
    return this.transactionDocumentModel.find().exec();
    // TODO MAKE RETURN SOMETHING IF THERE IS NOTHING
  }
}
