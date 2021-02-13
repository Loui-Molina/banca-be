import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateTransactionDto } from '@transactions/dtos/create.transaction.dto';
import { Transaction } from '@database/datamodels/schemas/transaction';
import { User } from '@database/datamodels/schemas/user';
import { TransactionType } from '@database/datamodels/enums/transaction.type';
import { Consortium } from '@database/datamodels/schemas/consortium';
import { Banking } from '@database/datamodels/schemas/banking';
import { TransactionDto } from '@transactions/dtos/transaction.dto';
import { TransactionObjects } from '@database/datamodels/enums/transaction.objects';
import { Role } from '@database/datamodels/enums/role';
import { ConsortiumService } from '@consortiums/consortium.service';
import { ConstApp } from '@utils/const.app';
import { SomethingWentWrongException } from '@common/exceptions/something.went.wrong.exception';
import { BankingsService } from '@bankings/bankings.service';
import { WebUser } from '@database/datamodels/schemas/web.user';

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
        @InjectModel(Consortium.name) private readonly consortiumModel: Model<Consortium>,
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        @InjectModel(WebUser.name) private readonly webUserModel: Model<WebUser>,
        @InjectConnection(ConstApp.BANKING) private readonly connection: Connection,
        private readonly consortiumService: ConsortiumService,
        private readonly bankingsService: BankingsService,
    ) {}

    async getAll(loggedUser: User): Promise<Array<TransactionDto>> {
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

    async createTransactionAdmin(dto: CreateTransactionDto, loggedUser: User): Promise<Transaction> {
        let transactionDestination;
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
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
                throw new BadRequestException(ConstApp.DESTINATION_ORIGIN_NOT_FOUND);
            }
            const originBalance = await originObject.calculateBalance();
            const destinationBalance = await destinationObject.calculateBalance();
            const transactionOrigin = new this.transactionModel({
                type: TransactionType.debit,
                originObject: dto.originObject,
                destinationObject: dto.destinationObject,
                originId: dto.originId,
                destinationId: dto.destinationId,
                description: 'Transaccion entre banca y consorcio',
                amount: dto.amount * -1,
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
                lastBalance: originBalance,
                actualBalance: originBalance + dto.amount * -1,
            });
            const transactionDestination = new this.transactionModel({
                type: TransactionType.credit,
                originObject: dto.originObject,
                destinationObject: dto.destinationObject,
                originId: dto.originId,
                destinationId: dto.destinationId,
                description: 'Transaccion entre banca y consorcio',
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
            session.commitTransaction();
        } catch (error) {
            session.abortTransaction();
            throw new SomethingWentWrongException();
        } finally {
            session.endSession();
        }
        return transactionDestination;
    }

    async createTransactionConsortium(dto: CreateTransactionDto, loggedUser: User): Promise<Transaction> {
        let transactionDestination;
        let originObject: Consortium | Banking;
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
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
            let destinationObject: Consortium | Banking;
            if (dto.destinationObject === TransactionObjects.consortium) {
                destinationObject = await this.consortiumModel.findById(dto.destinationId);
                if (destinationObject._id.toString() !== consortium._id.toString()) {
                    throw new BadRequestException();
                }
            }
            if (dto.destinationObject === TransactionObjects.banking) {
                destinationObject = await this.bankingModel.findById(dto.destinationId);
                if (
                    bankings.filter((banking) => banking._id.toString() === destinationObject._id.toString()).length ===
                    0
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
                type: TransactionType.debit,
                originObject: dto.originObject,
                destinationObject: dto.destinationObject,
                originId: dto.originId,
                destinationId: dto.destinationId,
                amount: dto.amount * -1,
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
                lastBalance: originBalance,
                actualBalance: originBalance + dto.amount * -1,
                description: dto.description,
            });
            transactionDestination = new this.transactionModel({
                type: TransactionType.credit,
                originObject: dto.originObject,
                destinationObject: dto.destinationObject,
                originId: dto.originId,
                destinationId: dto.destinationId,
                amount: dto.amount,
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
                lastBalance: destinationBalance,
                actualBalance: destinationBalance + dto.amount,
                description: dto.description,
            });
            originObject.transactions.push(transactionOrigin);
            destinationObject.transactions.push(transactionDestination);
            await originObject.save();
            await destinationObject.save();
            session.commitTransaction();
        } catch (error) {
            session.abortTransaction();
            throw new SomethingWentWrongException();
        } finally {
            session.endSession();
        }
        return transactionDestination;
    }

    async createTransactionBanking(dto: CreateTransactionDto, loggedUser: User): Promise<Transaction> {
        let transactionDestination;
        let originObject: Banking | WebUser;
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const banking = await this.bankingsService.getUserBanking(loggedUser);
            const websusers = await this.webUserModel.find({ bankingId: banking._id }).exec();
            if (dto.originObject === TransactionObjects.banking) {
                originObject = await this.bankingModel.findById(dto.originId);
                if (originObject._id.toString() !== banking._id.toString()) {
                    throw new BadRequestException();
                }
            }
            if (dto.originObject === TransactionObjects.webuser) {
                originObject = await this.webUserModel.findById(dto.originId);
                if (
                    websusers.filter((websuser) => websuser._id.toString() === originObject._id.toString()).length === 0
                ) {
                    throw new BadRequestException();
                }
            }
            let destinationObject: Banking | WebUser;
            if (dto.destinationObject === TransactionObjects.banking) {
                destinationObject = await this.bankingModel.findById(dto.destinationId);
                if (destinationObject._id.toString() !== banking._id.toString()) {
                    throw new BadRequestException();
                }
            }
            if (dto.destinationObject === TransactionObjects.webuser) {
                destinationObject = await this.webUserModel.findById(dto.destinationId);
                if (
                    websusers.filter((websuser) => websuser._id.toString() === destinationObject._id.toString())
                        .length === 0
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
                type: TransactionType.credit,
                originObject: dto.originObject,
                destinationObject: dto.destinationObject,
                originId: dto.originId,
                destinationId: dto.destinationId,
                amount: dto.amount,
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
                lastBalance: originBalance,
                actualBalance: originBalance + dto.amount,
                description: dto.description,
            });
            transactionDestination = new this.transactionModel({
                type: TransactionType.credit,
                originObject: dto.originObject,
                destinationObject: dto.destinationObject,
                originId: dto.originId,
                destinationId: dto.destinationId,
                amount: dto.amount,
                creationUserId: loggedUser._id,
                modificationUserId: loggedUser._id,
                lastBalance: destinationBalance,
                actualBalance: destinationBalance + dto.amount,
                description: dto.description,
            });
            originObject.transactions.push(transactionOrigin);
            destinationObject.transactions.push(transactionDestination);
            await originObject.save();
            await destinationObject.save();
            session.commitTransaction();
        } catch (error) {
            session.abortTransaction();
            throw new SomethingWentWrongException();
        } finally {
            session.endSession();
        }
        return transactionDestination;
    }

    async get(id: string): Promise<Transaction> {
        return await this.transactionModel.findById(id).exec();
    }

    private async getTransactionByAdmin(): Promise<Array<TransactionDto>> {
        const consortiums: Consortium[] = await this.consortiumModel.find().exec();
        const bankings: Banking[] = await this.bankingModel.find().exec();
        let results: TransactionDto[] = [];
        for (const consortium of consortiums) {
            results = results.concat(
                await Promise.all(consortium.transactions.map((transaction) => this.mapToDto(transaction))),
            );
        }
        for (const banking of bankings) {
            results = results.concat(
                await Promise.all(banking.transactions.map((transaction) => this.mapToDto(transaction))),
            );
        }
        results.sort(function (a, b) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return results;
    }

    private async getTransactionByConsortium(loggedUser: User): Promise<Array<TransactionDto>> {
        const consortiums = await this.consortiumService.getFiltered('ownerUserId', loggedUser._id);
        if (consortiums.length === 0) {
            throw new BadRequestException();
        }
        const consortium = consortiums.pop();
        const bankings: Banking[] = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
        let results: TransactionDto[] = await Promise.all(
            consortium.transactions.map((transaction) => this.mapToDto(transaction)),
        );
        for (const banking of bankings) {
            results = results.concat(
                await Promise.all(banking.transactions.map((transaction) => this.mapToDto(transaction))),
            );
        }
        results.sort(function (a, b) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return results;
    }

    private async getTransactionByBanking(loggedUser: User): Promise<Array<TransactionDto>> {
        const bankings = await this.bankingModel.find({ ownerUserId: loggedUser._id });
        if (bankings.length === 0) {
            throw new BadRequestException(ConstApp.ESTABLISHMENT_NOT_FOUND);
        }
        const banking = bankings.pop();
        const results: TransactionDto[] = await Promise.all(
            banking.transactions.map((transaction) => this.mapToDto(transaction)),
        );
        results.sort(function (a, b) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return results;
    }

    private async mapToDto(transaction: Transaction): Promise<TransactionDto> {
        const {
            _id,
            type,
            amount,
            lastBalance,
            actualBalance,
            originId,
            destinationId,
            originObject,
            destinationObject,
            createdAt,
            description,
        } = transaction;
        let originName: string;
        let destinationName: string;
        if (transaction.originObject === TransactionObjects.consortium) {
            const consortium = await this.consortiumModel.findById(transaction.originId).exec();
            if (consortium) {
                originName = consortium.name;
            }
        }
        if (transaction.destinationObject === TransactionObjects.consortium) {
            const consortium = await this.consortiumModel.findById(transaction.destinationId).exec();
            if (consortium) {
                destinationName = consortium.name;
            }
        }
        if (transaction.originObject === TransactionObjects.banking) {
            const banking = await this.bankingModel.findById(transaction.originId).exec();
            if (banking) {
                originName = banking.name;
            }
        }
        if (transaction.destinationObject === TransactionObjects.banking) {
            const banking = await this.bankingModel.findById(transaction.destinationId).exec();
            if (banking) {
                destinationName = banking.name;
            }
        }
        return {
            _id: _id,
            type: type,
            amount: amount,
            lastBalance: lastBalance,
            actualBalance: actualBalance,
            originId: originId,
            destinationId: destinationId,
            originObject: originObject,
            destinationObject: destinationObject,
            originName: originName,
            destinationName: destinationName,
            createdAt: createdAt,
            description: description,
        };
    }
}
