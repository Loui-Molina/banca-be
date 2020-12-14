import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Consortium, ConsortiumDocument,} from '../datamodels/schemas/Consortium';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectModel(Consortium.name)
        private readonly consortiumDocumentModel: Model<ConsortiumDocument>
    ) {
    }

    //DEMO ON INSERTION
    private test() {
        const newConsortium = new this.consortiumDocumentModel({
            modificationUserId: 'user',
            ownerUserId: 'a',
        } as Consortium);
        newConsortium.save().then((res) => console.log('res ', res));
    }
}
