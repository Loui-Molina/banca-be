import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from '@src/modules/transactions/dtos/create.transaction.dto';
import { Transaction, TransactionDocument } from '@src/modules/database/datamodels/schemas/transaction';
import { UserDocument } from '@database/datamodels/schemas/user';
import { TransactionType } from '@database/datamodels/enums/transaction.type';
import { Consortium, ConsortiumDocument } from '@database/datamodels/schemas/consortium';
import { Banking, BankingDocument } from '@database/datamodels/schemas/banking';
import { TransactionDto } from '@src/modules/transactions/dtos/transaction.dto';
import { TransactionObjects } from '@database/datamodels/enums/transaction.objects';
import { Role } from '@database/datamodels/enums/role';
import { ConsortiumService } from '@src/modules/consortiums/consortium.service';

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
        @InjectModel(Consortium.name) private consortiumModel: Model<ConsortiumDocument>,
        @InjectModel(Banking.name) private bankingModel: Model<BankingDocument>,
        private consortiumService: ConsortiumService,
    ) {}

    async getAll(loggedUser: UserDocument): Promise<Array<TransactionDto>> {
        switch (loggedUser.role) {
            case Role.admin:
                return await this.getTransactionByAdmin();
            case Role.consortium:
                return await this.getTransactionByConsortium(loggedUser);
            case Role.banker:
                return await this.getTransactionByBanking(loggedUser);
            default:
                throw new BadRequestException();
        }
    }

    async getFiltered(q: string, value: any): Promise<Array<Transaction>> {
        return this.transactionModel.find({ [q]: value }).exec();
    }

    async createTransactionAdmin(dto: CreateTransactionDto, loggedUser: UserDocument): Promise<Transaction> {
        let originObject;
        if (dto.originObject === TransactionObjects.consortium) {
            originObject = await this.consortiumModel.findById(dto.originId);
        }
        if (dto.originObject === TransactionObjects.banking) {
            originObject = await this.bankingModel.findById(dto.originId);
        }
        let destinationObject;
        if (dto.destinationObject === TransactionObjects.consortium) {
            destinationObject = await this.consortiumModel.findById(dto.destinationId);
        }
        if (dto.destinationObject === TransactionObjects.banking) {
            destinationObject = await this.bankingModel.findById(dto.destinationId);
        }
        if (!destinationObject || !originObject) {
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
            actualBalance: originBalance + dto.amount * -1,
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
            actualBalance: destinationBalance + dto.amount,
        });
        originObject.transactions.push(transactionOrigin);
        destinationObject.transactions.push(transactionDestination);
        await originObject.save();
        await destinationObject.save();
        return transactionDestination;
    }

    async createTransactionConsortium(dto: CreateTransactionDto, loggedUser: UserDocument): Promise<Transaction> {
        let originObject: ConsortiumDocument | BankingDocument;
        const consortium = await this.consortiumService.getConsortiumOfUser(loggedUser);
        const bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
        if (dto.originObject === TransactionObjects.consortium) {
            originObject = await this.consortiumModel.findById(dto.originId);
            if (originObject._id.toString() !== consortium._id.toString()) {
                throw new BadRequestException();
            }
        }
        if (dto.originObject === TransactionObjects.banking) {
            originObject = await this.bankingModel.findById(dto.originId);
            if (bankings.filter((banking) => banking._id.toString() === originObject._id.toString()).length === 0) {
                throw new BadRequestException();
            }
        }
        let destinationObject: ConsortiumDocument | BankingDocument;
        if (dto.destinationObject === TransactionObjects.consortium) {
            destinationObject = await this.consortiumModel.findById(dto.destinationId);
            if (destinationObject._id.toString() !== consortium._id.toString()) {
                throw new BadRequestException();
            }
        }
        if (dto.destinationObject === TransactionObjects.banking) {
            destinationObject = await this.bankingModel.findById(dto.destinationId);
            if (
                bankings.filter((banking) => banking._id.toString() === destinationObject._id.toString()).length === 0
            ) {
                throw new BadRequestException();
            }
        }
        if (!destinationObject || !originObject) {
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
            actualBalance: originBalance + dto.amount * -1,
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
            actualBalance: destinationBalance + dto.amount,
        });
        originObject.transactions.push(transactionOrigin);
        destinationObject.transactions.push(transactionDestination);
        await originObject.save();
        await destinationObject.save();
        return transactionDestination;
    }

    async get(id: string): Promise<Transaction> {
        return await this.transactionModel.findById(id).exec();
    }

    private async getTransactionByAdmin(): Promise<Array<TransactionDto>> {
        const consortiums: Consortium[] = await this.consortiumModel.find().exec();
        const bankings: Banking[] = await this.bankingModel.find().exec();
        const transactionsDto: TransactionDto[] = [];
        consortiums.map((consortium: Consortium) => {
            consortium.transactions.map((transaction) => {
                let originName;
                let destinationName;
                switch (consortium._id.toString()) {
                    case transaction.originId.toString():
                        //Consorcio es origen
                        originName = consortium.name;
                        destinationName = bankings
                            .filter((banking) => banking._id.toString() === transaction.destinationId.toString())
                            .pop().name;
                        break;
                    case transaction.destinationId.toString():
                        //Consorcio es destino
                        destinationName = consortium.name;
                        originName = bankings
                            .filter((banking) => banking._id.toString() === transaction.originId.toString())
                            .pop().name;
                        break;
                }
                transactionsDto.push({
                    _id: transaction._id,
                    type: transaction.type,
                    amount: transaction.amount,
                    lastBalance: transaction.lastBalance,
                    actualBalance: transaction.actualBalance,
                    originId: transaction.originId,
                    destinationId: transaction.destinationId,
                    originObject: transaction.originObject,
                    destinationObject: transaction.destinationObject,
                    originName: originName,
                    destinationName: destinationName,
                    createdAt: transaction.createdAt,
                });
            });
        });
        bankings.map((banking: Banking) => {
            banking.transactions.map((transaction) => {
                let originName;
                let destinationName;
                switch (banking._id.toString()) {
                    case transaction.originId.toString():
                        //Consorcio es origen
                        originName = banking.name;
                        destinationName = consortiums
                            .filter((consortium) => consortium._id.toString() === transaction.destinationId.toString())
                            .pop().name;
                        break;
                    case transaction.destinationId.toString():
                        //Consorcio es destino
                        destinationName = banking.name;
                        originName = consortiums
                            .filter((consortium) => consortium._id.toString() === transaction.originId.toString())
                            .pop().name;
                        break;
                }
                transactionsDto.push({
                    _id: transaction._id,
                    type: transaction.type,
                    amount: transaction.amount,
                    lastBalance: transaction.lastBalance,
                    actualBalance: transaction.actualBalance,
                    originId: transaction.originId,
                    destinationId: transaction.destinationId,
                    originObject: transaction.originObject,
                    destinationObject: transaction.destinationObject,
                    originName: originName,
                    destinationName: destinationName,
                    createdAt: transaction.createdAt,
                });
            });
        });
        transactionsDto.sort(function (a, b) {
            // @ts-ignore
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return transactionsDto;
    }

    private async getTransactionByConsortium(loggedUser: UserDocument): Promise<Array<TransactionDto>> {
        const consortiums = await this.consortiumService.getFiltered('ownerUserId', loggedUser._id);
        if (consortiums.length === 0) {
            throw new BadRequestException();
        }
        const consortium = consortiums.pop();
        const bankings: Banking[] = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
        const transactionsDto: TransactionDto[] = [];
        consortium.transactions.map((transaction) => {
            let originName;
            let destinationName;
            switch (consortium._id.toString()) {
                case transaction.originId.toString():
                    //Consorcio es origen
                    originName = consortium.name;
                    destinationName = bankings
                        .filter((banking) => banking._id.toString() === transaction.destinationId.toString())
                        .pop().name;
                    break;
                case transaction.destinationId.toString():
                    //Consorcio es destino
                    destinationName = consortium.name;
                    originName = bankings
                        .filter((banking) => banking._id.toString() === transaction.originId.toString())
                        .pop().name;
                    break;
            }
            transactionsDto.push({
                _id: transaction._id,
                type: transaction.type,
                amount: transaction.amount,
                lastBalance: transaction.lastBalance,
                actualBalance: transaction.actualBalance,
                originId: transaction.originId,
                destinationId: transaction.destinationId,
                originObject: transaction.originObject,
                destinationObject: transaction.destinationObject,
                originName: originName,
                destinationName: destinationName,
                createdAt: transaction.createdAt,
            });
        });
        bankings.map((banking: Banking) => {
            banking.transactions.map((transaction) => {
                let originName;
                let destinationName;
                switch (banking._id.toString()) {
                    case transaction.originId.toString():
                        //Consorcio es origen
                        originName = banking.name;
                        destinationName = consortium.name;
                        break;
                    case transaction.destinationId.toString():
                        //Consorcio es destino
                        destinationName = banking.name;
                        originName = consortium.name;
                        break;
                }
                transactionsDto.push({
                    _id: transaction._id,
                    type: transaction.type,
                    amount: transaction.amount,
                    lastBalance: transaction.lastBalance,
                    actualBalance: transaction.actualBalance,
                    originId: transaction.originId,
                    destinationId: transaction.destinationId,
                    originObject: transaction.originObject,
                    destinationObject: transaction.destinationObject,
                    originName: originName,
                    destinationName: destinationName,
                    createdAt: transaction.createdAt,
                });
            });
        });
        transactionsDto.sort(function (a, b) {
            // @ts-ignore
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return transactionsDto;
    }

    private async getTransactionByBanking(loggedUser: UserDocument): Promise<Array<TransactionDto>> {
        const bankings = await this.bankingModel.find({ ownerUserId: loggedUser._id });
        if (bankings.length === 0) {
            throw new BadRequestException();
        }
        const banking = bankings.pop();
        const consortium = await this.consortiumModel.findById(banking.consortiumId).exec();
        const transactionsDto: TransactionDto[] = [];
        banking.transactions.map((transaction) => {
            let originName;
            let destinationName;
            switch (banking._id.toString()) {
                case transaction.originId.toString():
                    //Consorcio es origen
                    originName = banking.name;
                    destinationName = consortium.name;
                    break;
                case transaction.destinationId.toString():
                    //Consorcio es destino
                    destinationName = banking.name;
                    originName = consortium.name;
                    break;
            }
            transactionsDto.push({
                _id: transaction._id,
                type: transaction.type,
                amount: transaction.amount,
                lastBalance: transaction.lastBalance,
                actualBalance: transaction.actualBalance,
                originId: transaction.originId,
                destinationId: transaction.destinationId,
                originObject: transaction.originObject,
                destinationObject: transaction.destinationObject,
                originName: originName,
                destinationName: destinationName,
                createdAt: transaction.createdAt,
            });
        });
        transactionsDto.sort(function (a, b) {
            // @ts-ignore
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return transactionsDto;
    }
}
