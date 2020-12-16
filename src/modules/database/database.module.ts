import {Global, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DatabaseService} from './services/database.service';
import {Consortium, ConsortiumSchema} from './datamodels/schemas/Consortium';
import {Banking, BankingSchema} from './datamodels/schemas/Banking';
import {Bet, BetSchema} from './datamodels/schemas/Bet';
import {Play, PlaySchema} from './datamodels/schemas/Play';
import {PlayNumbers, PlayNumbersSchema} from "./datamodels/schemas/PlayNumbers";

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Consortium.name, schema: ConsortiumSchema},
            {name: Banking.name, schema: BankingSchema},
            {name: Bet.name, schema: BetSchema},
            {name: Play.name, schema: PlaySchema},
            {name: PlayNumbers.name, schema: PlayNumbersSchema},
        ]),
    ],
    providers: [DatabaseService, Consortium, Banking, Bet, Play, PlayNumbers],
    exports: [DatabaseService, Consortium, Banking, Bet, Play, PlayNumbers],
})
export class DatabaseModule {
}
