import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DatabaseService} from './services/database.service';
import {Consortium, ConsortiumSchema} from "./datamodels/schemas/Consortium";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Consortium.name, schema: ConsortiumSchema},
        ]),
    ],
    providers: [DatabaseService, Consortium],
})
export class DatabaseModule {
}
