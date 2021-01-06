import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {TransactionDto} from '@src/modules/transactions/dtos/transaction.dto';
import {Transaction, TransactionDocument} from "@src/modules/database/datamodels/schemas/transaction";
import {UserDocument} from "@database/datamodels/schemas/user";
import {TransactionType} from "@database/datamodels/enums/transaction.type";
import {Consortium, ConsortiumDocument} from "@database/datamodels/schemas/consortium";
import {Banking, BankingDocument} from "@database/datamodels/schemas/banking";

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
        @InjectModel(Consortium.name) private consortiumModel: Model<ConsortiumDocument>,
        @InjectModel(Banking.name) private bankingModel: Model<BankingDocument>
    ) {
    }

    async getAll(): Promise<Array<Transaction>> {
        return this.transactionModel.find().exec();
    }

    async getFiltered(q: string, value: any): Promise<Array<Transaction>> {
        return this.transactionModel.find({ [q]: value }).exec();
    }

    async create(dto: TransactionDto, loggedUser: UserDocument): Promise<Transaction> {
        const originObject = await this.consortiumModel.findById(dto.originId);
        if(!originObject){
            throw new BadRequestException();
        }
        const destinationObject = originObject.bankings.find(banking => banking._id.toString() === dto.destinationId.toString());
        if(!destinationObject){
            throw new BadRequestException();
        }
        const originBalance = await originObject.calculateBalance();
        const destinationBalance = await destinationObject.calculateBalance();
        const transactionOrigin = new this.transactionModel({
            type: TransactionType.extraction,
            originObject: dto.originObject,
            destinationObject: dto.destinationObject,
            originId: dto.originId,
            destinationId: dto.destinationId,
            amount: dto.amount * -1,
            creationUserId: loggedUser._id,
            modificationUserId: loggedUser._id,
            lastBalance: originBalance,
            actualBalance: originBalance + dto.amount * -1
        });
        const transactionDestination = new this.transactionModel({
            type: TransactionType.deposit,
            originObject: dto.originObject,
            destinationObject: dto.destinationObject,
            originId: dto.originId,
            destinationId: dto.destinationId,
            amount: dto.amount,
            creationUserId: loggedUser._id,
            modificationUserId: loggedUser._id,
            lastBalance: destinationBalance,
            actualBalance: destinationBalance + dto.amount
        });
        originObject.transactions.push(transactionOrigin);
        destinationObject.transactions.push(transactionDestination);
        await originObject.save();
        return transactionDestination;
    }

    async get(id: string): Promise<Transaction> {
        return await this.transactionModel.findById(id).exec();
    }
}
