import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsortiumService } from '@src/modules/consortiums/consortium.service';
import { ConsortiumController } from '@src/modules/consortiums/consortium.controller';
import {Consortium, ConsortiumSchema} from "@src/modules/database/datamodels/schemas/consortium";

@Module({
    imports: [MongooseModule.forFeature([{ name: Consortium.name, schema: ConsortiumSchema }], 'banca')],
    providers: [ConsortiumService],
    controllers: [ConsortiumController],
    exports: [ConsortiumService, MongooseModule],
})
export class ConsortiumModule {}
