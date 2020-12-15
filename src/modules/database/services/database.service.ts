import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Consortium,
  ConsortiumDocument,
} from '../datamodels/schemas/Consortium';
import { Banking, BankingDocument } from '../datamodels/schemas/Banking';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel(Consortium.name)
    private readonly consortiumDocumentModel: Model<ConsortiumDocument>,
    @InjectModel(Banking.name)
    private readonly bankingDocumentModel: Model<BankingDocument>,
  ) {
    // this.test()
  }

  //DEMO ON INSERTION
  private test() {
    const newBanking = new this.bankingDocumentModel({
      balance: 0,
      creationUserId: 'user1',
      modificationUserId: 'user1',
      name: 'banca de Loui',
    } as Banking);

    const newConsortium = new this.consortiumDocumentModel({
      bankings: [newBanking],
      modificationUserId: 'user',
      creationUserId: 'user',
      ownerUserId: 'user',
    } as Consortium);

    newConsortium.save().then((res) => console.log('res ', res));
  }
}
