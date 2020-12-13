import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Consortium, ConsortiumDocument,} from '../datamodels/schemas/Consortium';
import {Lottery, LotteryDocument} from "../datamodels/schemas/Lottery";
import {OCStatus} from "../datamodels/enums/OCStatus";
import {LotteryTime} from "../datamodels/schemas/LotteryTime";
import {Days} from "../datamodels/enums/Days";

@Injectable()
export class DatabaseService {
    constructor(
        @InjectModel(Consortium.name) private readonly consortiumDocumentModel: Model<ConsortiumDocument>,
        @InjectModel(Lottery.name) private readonly lotteryDocumentModel: Model<LotteryDocument>,
    ) {
        this.init();
    }

    private init() {
        // const createdConsortium = new this.consortiumDocumentModel({
        //   _id: 1,
        //   ownerUserId: 'userId',
        //   creationDate: new Date(),
        //   creationUserId: 'userId',
        //   modificationDate: new Date(),
        //   modificationUserId: 'userId',
        //   supervisors: [],
        // } as Consortium);
        // createdConsortium
        //   .save()
        //   .then((value) => console.log('Saved value: ', value));
        this.consortiumDocumentModel.find().exec().then(value => console.log(console.log('consorcio: ', value[0])))
        const newLottery = new this.lotteryDocumentModel({
            color: '#c3c3c3',
            creationDate: new Date(),
            creationUserId: 'user1',
            modificationDate: new Date(),
            modificationUserId: 'user1',
            name: 'new york ala mañana',
            status: OCStatus.open,
            nickname: 'ny',
            times: [{
                creationDate: new Date(),
                creationUserId: 'user1',
                modificationDate: new Date(),
                modificationUserId: 'user1', closeTime: '12',
                day: [Days.mon, Days.thu],
                openTime: '8'
            } as LotteryTime]
        } as Lottery);
        newLottery.save().then(value => console.log('lottery: ', value))
    }

}
