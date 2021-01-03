import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {TransactionDto} from '@src/modules/transactions/dtos/transaction.dto';
import {Transaction, TransactionDocument} from "@src/modules/database/datamodels/schemas/transaction";
import {UserDocument} from "@database/datamodels/schemas/user";

@Injectable()
export class TransactionService {
    constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {
    }

    async getAll(): Promise<Array<Transaction>> {
        return this.transactionModel.find().exec();
    }

    async getFiltered(q: string, value: any): Promise<Array<Transaction>> {
        return this.transactionModel.find({ [q]: value }).exec();
    }

    async create(dto: TransactionDto, loggedUser: UserDocument): Promise<Transaction> {

        const newObject = new this.transactionModel({
            ...dto,
            creationUserId: loggedUser._id,
            modificationUserId: loggedUser._id,
        });
        await newObject.save();
        return newObject;
    }

    async update(dto: TransactionDto, loggedUser: UserDocument): Promise<Transaction> {

        return this.transactionModel.findByIdAndUpdate(
            dto._id,
            {
                amount: dto.amount,
                modificationUserId: loggedUser._id
            },
            {
                new: false,
            },
        );
    }

    async delete(id: string): Promise<Transaction> {
        return this.transactionModel.findByIdAndRemove(id).exec();
    }

    async get(id: string): Promise<Transaction> {
        return await this.transactionModel.findById(id).exec();
    }
}
