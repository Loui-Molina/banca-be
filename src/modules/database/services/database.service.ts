import { Injectable } from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Consortium,
  ConsortiumDocument,
} from '../datamodels/schemas/Consortium';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel(Consortium.name)
    private readonly ConsortiumDocumentModel: Model<ConsortiumDocument>,
  ) {
    this.init();
  }

  private init() {
    const createdConsortium = new this.ConsortiumDocumentModel({
      _id: 1,
      ownerUserId: 'userId',
      creationDate: new Date(),
      creationUserId: 'userId',
      modificationDate: new Date(),
      modificationUserId: 'userId',
      supervisors: [],
    } as Consortium);
    createdConsortium
      .save()
      .then((value) => console.log('Saved value: ', value));
  }
}
