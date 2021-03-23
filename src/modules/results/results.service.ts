import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Result } from '@database/datamodels/schemas/result';
import { Draw } from '@database/datamodels/schemas/draw';
import { User } from '@database/datamodels/schemas/user';
import { ResultDto } from '@results/dtos/result.dto';
import { Lottery } from '@database/datamodels/schemas/lottery';
import { AddResultDto } from '@results/dtos/add.result.dto';
import { Model } from 'mongoose';
import { Consortium } from '@database/datamodels/schemas/consortium';
import { Banking } from '@database/datamodels/schemas/banking';
import { ConsortiumLottery } from '@database/datamodels/schemas/consortium.lottery';
import { DominicanLotteryPrizes } from '@database/datamodels/enums/dominican.lottery.prizes';
import { UsLotteryPrizes } from '@database/datamodels/enums/us.lottery.prizes';
import { BrasilPrizes } from '@database/datamodels/enums/brasil.prizes';
import { BetStatus } from '@database/datamodels/enums/bet.status';
import { PlayTypes } from '@database/datamodels/enums/play.types';
import { Bet } from '@database/datamodels/schemas/bet';
import { ConstApp } from '@utils/const.app';
import { WebUser } from '@database/datamodels/schemas/web.user';
import { TransactionType } from '@database/datamodels/enums/transaction.type';
import { Transaction } from '@database/datamodels/schemas/transaction';
import { TransactionObjects } from '@database/datamodels/enums/transaction.objects';

@Injectable()
export class ResultsService {
    constructor(
        @InjectModel(Lottery.name) private readonly lotteryModel: Model<Lottery>,
        @InjectModel(Result.name) private readonly resultModel: Model<Result>,
        @InjectModel(Draw.name) private readonly drawModel: Model<Draw>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        @InjectModel(WebUser.name) private readonly webUserModel: Model<WebUser>,
        @InjectModel(Consortium.name) private readonly consortiumModel: Model<Consortium>,
        @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
    ) {}

    async getAll(): Promise<Array<ResultDto>> {
        const data: ResultDto[] = await this.lotteryModel.aggregate([
            { $match: {} },
            { $unwind: '$results' },
            {
                $project: {
                    _id: '$results._id',
                    date: '$results.date',
                    creationUserId: '$results.creationUserId',
                    createdAt: '$results.createdAt',
                    draw: '$results.draw',
                    lotteryId: '$_id',
                    lotteryName: '$name',
                },
            },
            { $sort: { date: -1 } },
        ]);
        for await (const item of data) {
            const user = await this.userModel.findById(item.creationUserId).exec();
            if (user) {
                item.creationUsername = user.username;
            }
        }
        return data;
    }

    async create(dto: AddResultDto, loggedUser: User): Promise<Result> {
        // FIXME TRANSACCION

        //TODO chekear si la fecha de sorteo ya paso
        const lottery = await this.lotteryModel.findById(dto.lotteryId).exec();
        if (!lottery) {
            throw new UnauthorizedException(ConstApp.CANNOT_FIND_LOTTERY);
        }

        //First time of date and last
        const date = new Date(dto.date);
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        const filterDateA = new Date(`${date.getFullYear()}-${month}-${day}T00:00:00.000Z`);
        const filterDateB = new Date(`${date.getFullYear()}-${month}-${day}T23:59:59.000Z`);

        //Checking playTime
        const checkDate: Date = new Date(lottery.playTime);

        const now = new Date();
        now.setFullYear(1970, 0, 1);

        if (now < checkDate) {
            //You cant add the results if the lottery has not been played yet
            throw new BadRequestException(ConstApp.THE_LOTTERY_HAS_NOT_BEEN_PLAYED_YET);
        }

        let results = await this.lotteryModel.aggregate([
            { $unwind: '$results' },
            { $match: { 'results.date': { $gte: filterDateA, $lt: filterDateB } } },
            {
                $project: {
                    _id: '$results._id',
                    date: '$results.date',
                    lotteryId: '$_id',
                },
            },
        ]);
        results = results.filter((result: ResultDto) => result.lotteryId.toString() === dto.lotteryId);
        if (results && results.length > 0) {
            throw new BadRequestException(ConstApp.THE_RESULT_FOR_THIS_DAY_IS_ALREADY_CHARGED);
        }

        const draw: Draw = new this.drawModel({
            first: dto.first,
            second: dto.second,
            third: dto.third,
            creationUserId: loggedUser.id,
            modificationUserId: loggedUser.id,
        });
        const result: Result = new this.resultModel({
            date: new Date(`${date.getFullYear()}-${month}-${day}T12:00:00.000Z`),
            createdAt: new Date(),
            draw: draw,
            creationUserId: loggedUser.id,
            modificationUserId: loggedUser.id,
        });
        if (
            filterDateA.getDate() == now.getDate() &&
            filterDateA.getMonth() == now.getMonth() &&
            filterDateA.getFullYear() == now.getFullYear()
        ) {
            lottery.lastDraw = draw;
        }
        lottery.results.push(result);
        await lottery.save();
        // Calculando ganadores
        const bankings = await this.bankingModel.find().exec();
        for (const banking of bankings) {
            const consortium = await this.consortiumModel.findById(banking.consortiumId).exec();
            const config = consortium.consortiumLotteries.find(
                (consortiumLottery) => consortiumLottery.lotteryId.toString() === lottery._id.toString(),
            );
            if (!config) {
                // El consorcio no configuro esta loteria para esta banca
                continue;
            }
            const bets = banking.bets.filter((bet) => {
                const month = `${bet.date.getMonth() + 1}`.padStart(2, '0');
                const day = `${bet.date.getDate()}`.padStart(2, '0');
                const dateParsed = new Date(`${bet.date.getFullYear()}-${month}-${day}T05:00:00.000Z`);
                if (
                    filterDateA <= dateParsed &&
                    filterDateB >= dateParsed &&
                    ![BetStatus.claimed, BetStatus.cancelled].includes(bet.betStatus)
                ) {
                    return true;
                }
                return false;
            });
            for (const bet of bets) {
                const amount = await this.calculateWinPlays(bet, draw, lottery, config);
                if (amount !== null) {
                    if (!bet.amountWin) {
                        bet.amountWin = 0;
                    }
                    if (amount > 0) {
                        // No se hace el chekeo de pending pq si gano una vez es ganador
                        bet.amountWin += amount;
                        bet.betStatus = BetStatus.winner;
                    } else {
                        // Si estaba en winner no se pasa a loser pq quiere decir
                        // que gano en una loteria anterior
                        if (bet.betStatus === BetStatus.pending) {
                            const playsSuperPalePending = bet.plays.filter(
                                (play) =>
                                    play.playType === PlayTypes.superPale && [1, 2].includes(play.winSuperPalePending),
                            ).length;
                            if (playsSuperPalePending > 0) {
                                bet.betStatus = BetStatus.pending;
                            } else {
                                bet.betStatus = BetStatus.loser;
                            }
                        }
                    }
                }
            }
            await banking.save();
        }

        // Calculando ganadores web users
        const webusers = await this.webUserModel.find().exec();
        for (const webuser of webusers) {
            const banking = await this.bankingModel.findById(webuser.bankingId).exec();
            const consortium = await this.consortiumModel.findById(banking.consortiumId).exec();
            const config = consortium.consortiumLotteries.find(
                (consortiumLottery) => consortiumLottery.lotteryId.toString() === lottery._id.toString(),
            );
            if (!config) {
                // El consorcio no configuro esta loteria para esta banca
                continue;
            }
            const bets = webuser.bets.filter((bet) => {
                const month = `${bet.date.getMonth() + 1}`.padStart(2, '0');
                const day = `${bet.date.getDate()}`.padStart(2, '0');
                const dateParsed = new Date(`${bet.date.getFullYear()}-${month}-${day}T05:00:00.000Z`);
                if (
                    filterDateA <= dateParsed &&
                    filterDateB >= dateParsed &&
                    [BetStatus.pending].includes(bet.betStatus)
                ) {
                    return true;
                }
                return false;
            });
            for (const bet of bets) {
                const amount = await this.calculateWinPlays(bet, draw, lottery, config);
                if (amount !== null) {
                    if (!bet.amountWin) {
                        bet.amountWin = 0;
                    }
                    bet.amountWin += amount;
                    if (amount > 0) {
                        bet.betStatus = BetStatus.claimed;
                        const balance = await webuser.calculateBalance();
                        const transactionDestination = new this.transactionModel({
                            type: TransactionType.credit,
                            originObject: TransactionObjects.unknown,
                            destinationObject: TransactionObjects.webuser,
                            originId: null,
                            destinationId: webuser._id,
                            description: 'Won a bet',
                            amount: amount,
                            creationUserId: loggedUser._id,
                            modificationUserId: loggedUser._id,
                            lastBalance: balance,
                            actualBalance: balance + amount,
                        });
                        webuser.transactions.push(transactionDestination);
                    } else {
                        bet.betStatus = BetStatus.loser;
                    }
                }
            }
            await webuser.save();
        }

        return result;
    }

    private async calculateWinPlays(
        bet: Bet,
        draw: Draw,
        lottery: Lottery,
        config: ConsortiumLottery,
    ): Promise<number> {
        let c: number;
        for (const play of bet.plays) {
            if (
                (play.lotteryId && play.lotteryId.toString()) === lottery._id.toString() ||
                (play.lotteryIdSuperpale && play.lotteryIdSuperpale.toString()) === lottery._id.toString()
            ) {
                if (!c) {
                    c = 0;
                }
                // Directo
                // Doble (11,22,...), 1ra, 2da, 3ra
                // Pale
                // 1ra 2da, 1ra 3ra, 2-3
                // Tripleta (no importa el orden)
                // 3Numeros, 2Numeros

                switch (play.playType) {
                    case PlayTypes.direct:
                        // El directo solo tiene playNumbers first
                        // TODO falta DOBLES
                        switch (play.playNumbers.first) {
                            case draw.first:
                                c += play.amount * (await this.getPrizeLimit(config, DominicanLotteryPrizes.first));
                                break;
                            case draw.second:
                                c += play.amount * (await this.getPrizeLimit(config, DominicanLotteryPrizes.second));
                                break;
                            case draw.third:
                                c += play.amount * (await this.getPrizeLimit(config, DominicanLotteryPrizes.third));
                                break;
                        }
                        break;
                    case PlayTypes.pale:
                        if (
                            (play.playNumbers.first === draw.first && play.playNumbers.second === draw.second) ||
                            (play.playNumbers.first === draw.first && play.playNumbers.second === draw.third)
                        ) {
                            // 1ra 2da o 1ra 3ra
                            c += play.amount * (await this.getPrizeLimit(config, DominicanLotteryPrizes.pale));
                        } else if (play.playNumbers.first === draw.second && play.playNumbers.second === draw.third) {
                            // Pale 2-3
                            c += play.amount * (await this.getPrizeLimit(config, DominicanLotteryPrizes.paleTwoThree));
                        }
                        break;
                    case PlayTypes.tripleta:
                        // No importa el orden
                        // eslint-disable-next-line no-case-declarations
                        const aux = [draw.first, draw.second, draw.third];
                        // eslint-disable-next-line no-case-declarations
                        const aux2 = [play.playNumbers.first, play.playNumbers.second, play.playNumbers.third];
                        // eslint-disable-next-line no-case-declarations
                        const matches = aux.filter((x) => aux2.includes(x)).length;
                        if (matches === 3) {
                            // Tripleta
                            c += play.amount * (await this.getPrizeLimit(config, DominicanLotteryPrizes.triplet));
                        } else if (matches === 2) {
                            c += play.amount * (await this.getPrizeLimit(config, DominicanLotteryPrizes.twoNumbers));
                        }
                        break;
                    case PlayTypes.superPale:
                        if (play.playNumbers.first === draw.first || play.playNumbers.second === draw.first) {
                            // 1ra 2da o 1ra 3ra
                            if (play.winSuperPalePending != null) {
                                if (
                                    (play.playNumbers.first === draw.first && play.winSuperPalePending === 2) ||
                                    (play.playNumbers.second === draw.first && play.winSuperPalePending === 1)
                                ) {
                                    c +=
                                        play.amount *
                                        (await this.getPrizeLimit(config, DominicanLotteryPrizes.superPale));
                                    play.winSuperPalePending = 3;
                                    // Ganador
                                }
                            } else {
                                if (play.playNumbers.first === draw.first) {
                                    play.winSuperPalePending = 1;
                                }
                                if (play.playNumbers.second === draw.first) {
                                    play.winSuperPalePending = 2;
                                }
                            }
                        }
                        break;
                }
            }
        }
        return c;
    }

    private async getPrizeLimit(
        config: ConsortiumLottery,
        type: DominicanLotteryPrizes | UsLotteryPrizes | BrasilPrizes,
    ): Promise<number> {
        const limit = config.prizeLimits.find((value) => value.playType === type);
        if (!limit) {
            return 0;
        }
        if (limit.status === false) {
            return 0;
        }
        return limit.paymentAmount;
    }

    async get(id: string): Promise<Result> {
        return await this.resultModel.findById(id).exec();
    }
}
