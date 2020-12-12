import {Inject, Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {AppData, AppDataDocument, AppDataSchema} from "../../datamodels/schemas/AppData";
import {Model} from "mongoose";

@Module({
    imports: [MongooseModule.forFeature([{name: AppData.name, schema: {AppDataSchema}}])]
})
export class DatabaseModule {
    constructor(@Inject(AppData.name) private appDataModel: Model<AppDataDocument>) {
        console.log('database test')
    }

}
