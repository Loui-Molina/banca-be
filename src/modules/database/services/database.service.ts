import {Injectable} from '@nestjs/common';
import {Banking, BankingDocument} from '../datamodels/schemas/Banking';
import {InjectModel} from '@nestjs/mongoose';
import {Consortium, ConsortiumDocument,} from '../datamodels/schemas/Consortium';
import {Model} from 'mongoose';
import {Bet, BetDocument} from '../datamodels/schemas/Bet';
import {Play, PlayDocument} from '../datamodels/schemas/Play';
import {PlayTypes} from '../datamodels/enums/PlayTypes';
import {PlayNumbers, PlayNumbersDocument} from "../datamodels/schemas/PlayNumbers";

@Injectable()
export class DatabaseService {
    constructor(
        @InjectModel(Consortium.name)
        private readonly consortiumDocumentModel: Model<ConsortiumDocument>,
        @InjectModel(Banking.name)
        private readonly bankingDocumentModel: Model<BankingDocument>,
        @InjectModel(Play.name)
        private readonly playDocumentModel: Model<PlayDocument>,
        @InjectModel(Bet.name)
        private readonly betDocumentModel: Model<BetDocument>,
        @InjectModel(PlayNumbers.name)
        private readonly playNumbersDocumentModel: Model<PlayNumbersDocument>,
    ) {
        // this.test();
    }

    async test() {


        // const newConsortium = new this.consortiumDocumentModel({
        //   bankings: [newBanking],
        //   modificationUserId: 'user',
        //   creationUserId: 'user',
        //   ownerUserId: 'user',
        // } as Consortium);
        console.log(new Date());

        const newConsortium = await this.consortiumDocumentModel.findOne().exec();
        const newBanking = new this.bankingDocumentModel({
            balance: 0,
            creationUserId: 'user1',
            modificationUserId: 'user1',
            name: 'banca de gonza',
        } as Banking);
        newBanking.balance = 200;
        newBanking.bets.push(
            new this.betDocumentModel({
                date: new Date(),
                creationUserId: 'user1',
                modificationUserId: 'user1',
                plays: [
                    new this.playDocumentModel({
                        amount: 20,
                        creationUserId: 'user1',
                        modificationUserId: 'user1',
                        playType: PlayTypes.pale,
                        playNumbers: new this.playNumbersDocumentModel({
                            creationUserId: 'user1',
                            modificationUserId: 'user1', first: 1, second: 29
                        } as PlayNumbers)
                    } as Play),
                ],
            } as Bet),
            new this.betDocumentModel({
                date: new Date(),
                creationUserId: 'user1',
                modificationUserId: 'user1',
                plays: [
                    new this.playDocumentModel({
                        amount: 15,
                        creationUserId: 'user1',
                        modificationUserId: 'user1',
                        playType: PlayTypes.direct,
                        playNumbers: new this.playNumbersDocumentModel({
                            creationUserId: 'user1',
                            modificationUserId: 'user1', first: 1, second: 29
                        } as PlayNumbers)
                    } as Play),
                ],
            } as Bet),
        );
        newConsortium.bankings.push(newBanking);
        return newConsortium
            .save()
            .then((res) => {
                console.log('res ', res, ' time ', new Date());
                return res;
            });
    }
}
