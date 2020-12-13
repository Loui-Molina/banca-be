import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DatabaseService} from './services/database.service';
import {Consortium, ConsortiumSchema} from './datamodels/schemas/Consortium';
import {Lottery, LotterySchema} from "./datamodels/schemas/Lottery";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Consortium.name, schema: ConsortiumSchema},
            {name: Lottery.name, schema: LotterySchema}
        ]),
    ],
    providers: [DatabaseService, Consortium, Lottery],
})
export class DatabaseModule {
}
