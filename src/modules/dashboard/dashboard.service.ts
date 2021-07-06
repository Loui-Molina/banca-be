import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DashboardDiagramDto } from '@dashboard/dtos/dashboard.dto';
import { DashboardDiagramNodeDto } from '@dashboard/dtos/dashboard.node.dto';
import { DashboardDiagramLinkDto } from '@dashboard/dtos/dashboard.link.dto';
import { DashboardDiagramClusterDto } from '@dashboard/dtos/dashboard.cluster.dto';
import { Consortium } from '@database/datamodels/schemas/consortium';
import { Banking } from '@database/datamodels/schemas/banking';
import { DashboardConsortiumDto } from '@dashboard/dtos/dashboard.consortium.dto';
import { DashboardBankingDto } from '@dashboard/dtos/dashboard.banking.dto';
import { User } from '@database/datamodels/schemas/user';
import { Role } from '@database/datamodels/enums/role';
import { DashboardGraphConsortiumDto } from '@dashboard/dtos/dashboard.graph.consortium.dto';
import { DashboardGraphBankingDto } from '@dashboard/dtos/dashboard.graph.banking.dto';
import { DashboardWidgetsDto } from '@dashboard/dtos/dashboard.widgets.dto';
import { DashboardGraphBalanceBankingDto } from '@dashboard/dtos/dashboard.graph.balance.banking.dto';
import { Transaction } from '@database/datamodels/schemas/transaction';
import { BetStatus } from '@database/datamodels/enums/bet.status';
import { Bet } from '@database/datamodels/schemas/bet';
import { DashboardPlayedNumbersDto } from '@dashboard/dtos/dashboard.played.numbers.dto';
import { PlayedNumbersDto } from '@dashboard/dtos/played.numbers.dto';
import { DashboardGraphConsortiumBalanceBankingDto } from '@dashboard/dtos/dashboard.graph.consortium.balance.banking.dto';
import { ConstApp } from '@utils/const.app';
import { WebUser } from '@database/datamodels/schemas/web.user';
import { DashboardWebuserDto } from '@dashboard/dtos/dashboard.webuser.dto';

@Injectable()
export class DashboardService {
    private readonly logger = new Logger(DashboardService.name);

    constructor(
        @InjectModel(Consortium.name) private readonly consortiumModel: Model<Consortium>,
        @InjectModel(Banking.name) private readonly bankingModel: Model<Banking>,
        @InjectModel(WebUser.name) private readonly webUserModel: Model<WebUser>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async getDashboardDiagram(): Promise<DashboardDiagramDto> {
        const res = new DashboardDiagramDto();
        const consortiumIds: string[] = [];
        const bankingIds: string[] = [];
        const webUsersIds: string[] = [];
        const consortiums: Array<Consortium> = await this.consortiumModel.find().exec();
        const bankings: Array<Banking> = await this.bankingModel.find().exec();
        const webusers: Array<WebUser> = await this.webUserModel.find().exec();
        let index = 0;
        for await (const consortium of consortiums) {
            index += 1;
            res.nodes.push(new DashboardDiagramNodeDto(consortium._id.toString(), consortium.name));
            consortiumIds.push(consortium._id.toString());
            let index2 = 0;
            for await (const banking of bankings) {
                index2 += 1;
                if (banking.consortiumId.toString() === consortium._id.toString()) {
                    bankingIds.push(banking._id.toString());
                    res.nodes.push(new DashboardDiagramNodeDto(banking._id.toString(), banking.name));
                    res.links.push(
                        new DashboardDiagramLinkDto(
                            'link' + (index + 1).toString() + (index2 + 1).toString(),
                            consortium._id.toString(),
                            banking._id.toString(),
                        ),
                    );
                    let index3 = 0;
                    for await (const webuser of webusers) {
                        index3 += 1;
                        if (webuser.bankingId.toString() === banking._id.toString()) {
                            const webuser_user = await this.userModel.findById(webuser.ownerUserId).exec();
                            webUsersIds.push(webuser._id.toString());
                            res.nodes.push(new DashboardDiagramNodeDto(webuser._id.toString(), webuser_user.name));
                            res.links.push(
                                new DashboardDiagramLinkDto(
                                    'link' + (index + 1).toString() + (index2 + 1) + (index3 + 1).toString(),
                                    banking._id.toString(),
                                    webuser._id.toString(),
                                ),
                            );
                        }
                    }
                }
            }
        }
        if (consortiumIds.length > 0) {
            res.clusters.push(
                new DashboardDiagramClusterDto('cluster0', 'DASHBOARD.ORGANIZATION_DIAGRAM.CONSORTIUMS', consortiumIds),
            );
        }
        if (bankingIds.length > 0) {
            res.clusters.push(
                new DashboardDiagramClusterDto('cluster1', 'DASHBOARD.ORGANIZATION_DIAGRAM.BANKINGS', bankingIds),
            );
        }
        if (webUsersIds.length > 0) {
            res.clusters.push(
                new DashboardDiagramClusterDto('cluster2', 'DASHBOARD.ORGANIZATION_DIAGRAM.WEBUSERS', webUsersIds),
            );
        }
        return res;
    }

    async getConsortiumsStatistics(): Promise<DashboardConsortiumDto[]> {
        const consortiumsDto: DashboardConsortiumDto[] = [];
        const consortiums: Array<Consortium> = await this.consortiumModel.find().exec();
        for await (const consortium of consortiums) {
            let cancelled = 0;
            let expired = 0;
            let claimed = 0;
            let pending = 0;
            let winner = 0;
            let loser = 0;
            let total = 0;
            let profits = 0;
            let prizes = 0;
            let pendingPrizes = 0;
            const balance = await consortium.calculateBalance();
            const bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
            if (!bankings) throw new BadRequestException(ConstApp.ESTABLISHMENT_NOT_FOUND);
            for await (const banking of bankings) {
                cancelled += await this.sumBets(banking.bets, [BetStatus.cancelled], PosibleSums.count);
                expired += await this.sumBets(banking.bets, [BetStatus.expired], PosibleSums.count);
                claimed += await this.sumBets(banking.bets, [BetStatus.claimed], PosibleSums.count);
                pending += await this.sumBets(banking.bets, [BetStatus.pending], PosibleSums.count);
                winner += await this.sumBets(banking.bets, [BetStatus.winner], PosibleSums.count);
                loser += await this.sumBets(banking.bets, [BetStatus.loser], PosibleSums.count);
                total += banking.bets.length;

                profits += await this.sumBets(
                    banking.bets,
                    [BetStatus.expired, BetStatus.claimed, BetStatus.pending, BetStatus.winner, BetStatus.loser],
                    PosibleSums.amount,
                );
                prizes += await this.sumBets(
                    banking.bets,
                    [BetStatus.claimed, BetStatus.winner],
                    PosibleSums.amountWin,
                );
                pendingPrizes += await this.sumBets(banking.bets, [BetStatus.pending], PosibleSums.amountWin);
            }

            consortiumsDto.push({
                _id: consortium._id,
                name: consortium.name,
                cancelled,
                expired,
                claimed,
                pending,
                winner,
                loser,
                total,
                profits,
                prizes,
                pendingPrizes,
                balance,
            });
        }
        return consortiumsDto;
    }

    async getAdminWidgetsStatistics(): Promise<DashboardWidgetsDto> {
        const consortiums: Array<Consortium> = await this.consortiumModel.find().exec();
        const balance = 0;
        let prizes = 0;
        let profits = 0;
        let ticketsSold = 0;
        for await (const consortium of consortiums) {
            const bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
            for await (const banking of bankings) {
                prizes += await this.sumBets(
                    banking.bets,
                    [BetStatus.claimed, BetStatus.winner],
                    PosibleSums.amountWin,
                );
                profits += await this.sumBets(
                    banking.bets,
                    [BetStatus.expired, BetStatus.claimed, BetStatus.pending, BetStatus.winner, BetStatus.loser],
                    PosibleSums.amount,
                );
                ticketsSold += await this.sumBets(
                    banking.bets,
                    [BetStatus.expired, BetStatus.claimed, BetStatus.pending, BetStatus.winner, BetStatus.loser],
                    PosibleSums.count,
                );
            }
        }
        return {
            balance,
            prizes,
            profits,
            ticketsSold,
        };
    }

    async getConsortiumWidgetsStatistics(loggedUser: User): Promise<DashboardWidgetsDto> {
        const consortiums = await this.consortiumModel.find({ ownerUserId: loggedUser._id }).exec();
        if (consortiums.length === 0) {
            throw new BadRequestException();
        }
        const consortium = consortiums.pop();
        const bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
        const balance = await consortium.calculateBalance();
        let prizes = 0;
        let profits = 0;
        let ticketsSold = 0;
        for await (const banking of bankings) {
            prizes += await this.sumBets(banking.bets, [BetStatus.claimed, BetStatus.winner], PosibleSums.amountWin);
            profits += await this.sumBets(
                banking.bets,
                [BetStatus.expired, BetStatus.claimed, BetStatus.pending, BetStatus.winner, BetStatus.loser],
                PosibleSums.amount,
            );
            ticketsSold += await this.sumBets(
                banking.bets,
                [BetStatus.expired, BetStatus.claimed, BetStatus.pending, BetStatus.winner, BetStatus.loser],
                PosibleSums.count,
            );
        }
        return {
            balance,
            prizes,
            profits,
            ticketsSold,
        };
    }

    async getBankingWidgetsStatistics(loggedUser: User): Promise<DashboardWidgetsDto> {
        const bankings = await this.bankingModel.find({ ownerUserId: loggedUser._id }).exec();
        if (bankings.length === 0) {
            throw new BadRequestException();
        }
        const banking = bankings.pop();
        return {
            balance: await banking.calculateBalance(),
            prizes: await this.sumBets(banking.bets, [BetStatus.claimed, BetStatus.winner], PosibleSums.amountWin),
            profits: await this.sumBets(
                banking.bets,
                [BetStatus.expired, BetStatus.claimed, BetStatus.pending, BetStatus.winner, BetStatus.loser],
                PosibleSums.amount,
            ),
            ticketsSold: await this.sumBets(
                banking.bets,
                [BetStatus.expired, BetStatus.claimed, BetStatus.pending, BetStatus.winner, BetStatus.loser],
                PosibleSums.count,
            ),
        };
    }

    async getWebUserWidgetsStatistics(loggedUser: User): Promise<DashboardWidgetsDto> {
        const webUser = await this.webUserModel.findOne({ ownerUserId: loggedUser._id }).exec();
        if (!webUser) {
            throw new BadRequestException();
        }
        return {
            prizes: 0,
            profits: 0,
            ticketsSold: 0,
            balance: await webUser.calculateBalance(),
        };
    }

    async getBankingPlayedNumbersStatistics(loggedUser: User): Promise<DashboardPlayedNumbersDto> {
        const bankings = await this.bankingModel.find({ ownerUserId: loggedUser._id }).exec();
        if (bankings.length === 0) {
            throw new BadRequestException(ConstApp.ESTABLISHMENT_NOT_FOUND);
        }
        const banking = bankings.pop();
        let numbers: PlayedNumbersDto[] = [];
        const now = new Date();
        const aux: any = {};
        now.setHours(0, 0, 0, 0);
        const bets = banking.bets.filter((bet) => {
            const a = new Date(bet.date);
            a.setHours(0, 0, 0, 0);
            return now.getTime() === a.getTime();
        });
        bets.map((bet) => {
            bet.plays.map((play) => {
                if (play.playNumbers.first) {
                    aux[play.playNumbers.first] = !aux[play.playNumbers.first] ? 1 : aux[play.playNumbers.first] + 1;
                }
                if (play.playNumbers.second) {
                    aux[play.playNumbers.second] = !aux[play.playNumbers.second] ? 1 : aux[play.playNumbers.second] + 1;
                }
                if (play.playNumbers.third) {
                    aux[play.playNumbers.third] = !aux[play.playNumbers.third] ? 1 : aux[play.playNumbers.third] + 1;
                }
            });
        });

        for (let i = 0; i < Object.keys(aux).length; i++) {
            const key = Object.keys(aux)[i];
            const value = aux[key];
            numbers.push({
                amount: value,
                number: parseInt(key),
            });
        }
        numbers.sort((a, b) => (a.amount < b.amount ? 1 : b.amount < a.amount ? -1 : 0));
        numbers = numbers.slice(0, 10);
        return {
            numbers,
        };
    }

    async getConsortiumPlayedNumbersStatistics(loggedUser: User): Promise<DashboardPlayedNumbersDto> {
        const consortiums = await this.consortiumModel.find({ ownerUserId: loggedUser._id }).exec();
        if (consortiums.length === 0) {
            throw new BadRequestException();
        }
        const consortium = consortiums.pop();
        const bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();

        let numbers: PlayedNumbersDto[] = [];
        const now = new Date();
        const aux: any = {};
        for (const banking of bankings) {
            now.setHours(0, 0, 0, 0);
            const bets = banking.bets.filter((bet) => {
                const a = new Date(bet.date);
                a.setHours(0, 0, 0, 0);
                return now.getTime() === a.getTime();
            });
            bets.map((bet) => {
                bet.plays.map((play) => {
                    if (play.playNumbers.first) {
                        aux[play.playNumbers.first] = !aux[play.playNumbers.first]
                            ? 1
                            : aux[play.playNumbers.first] + 1;
                    }
                    if (play.playNumbers.second) {
                        aux[play.playNumbers.second] = !aux[play.playNumbers.second]
                            ? 1
                            : aux[play.playNumbers.second] + 1;
                    }
                    if (play.playNumbers.third) {
                        aux[play.playNumbers.third] = !aux[play.playNumbers.third]
                            ? 1
                            : aux[play.playNumbers.third] + 1;
                    }
                });
            });
        }

        for (let i = 0; i < Object.keys(aux).length; i++) {
            const key = Object.keys(aux)[i];
            const value = aux[key];
            numbers.push({
                amount: value,
                number: parseInt(key),
            });
        }
        numbers.sort((a, b) => (a.amount < b.amount ? 1 : b.amount < a.amount ? -1 : 0));
        numbers = numbers.slice(0, 10);
        return {
            numbers,
        };
    }

    async getBankingsStatistics(
        loggedUser: User,
        interval: { initial: Date; final: Date },
    ): Promise<DashboardBankingDto[]> {
        let bankings: Array<Banking> = [];
        if (loggedUser.role === Role.consortium) {
            //If is consortium
            const consortiums = await this.consortiumModel.find({ ownerUserId: loggedUser._id }).exec();
            if (consortiums.length === 0) {
                throw new BadRequestException();
            }
            const consortium = consortiums.pop();
            bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
        } else {
            //If is admin
            bankings = await this.bankingModel.find().exec();
        }
        const bankingsDto: DashboardBankingDto[] = [];
        for await (const banking of bankings) {
            const bets = banking.bets.filter((value) =>
                interval && interval.initial && interval.final
                    ? new Date(interval.initial).getTime() < new Date(value.date).getTime() &&
                      new Date(value.date).getTime() < new Date(interval.final).getTime()
                    : true,
            );
            const pendingPrizes = await this.sumBets(bets, [BetStatus.winner], PosibleSums.amountWin);
            const balance = await banking.calculateBalance();
            bankingsDto.push({
                _id: banking._id,
                name: banking.name,
                cancelled: await this.sumBets(bets, [BetStatus.cancelled], PosibleSums.count),
                expired: await this.sumBets(bets, [BetStatus.expired], PosibleSums.count),
                claimed: await this.sumBets(bets, [BetStatus.claimed], PosibleSums.count),
                pending: await this.sumBets(bets, [BetStatus.pending], PosibleSums.count),
                winner: await this.sumBets(bets, [BetStatus.winner], PosibleSums.count),
                loser: await this.sumBets(bets, [BetStatus.loser], PosibleSums.count),
                total: bets.length,
                profits: await this.sumBets(
                    bets,
                    [BetStatus.expired, BetStatus.claimed, BetStatus.pending, BetStatus.winner, BetStatus.loser],
                    PosibleSums.amount,
                ),
                prizes: await this.sumBets(bets, [BetStatus.claimed], PosibleSums.amountWin),
                pendingPrizes: pendingPrizes,
                balance: balance,
                red: balance - pendingPrizes,
            });
        }
        return bankingsDto;
    }

    async getWebUsersStatistics(loggedUser: User): Promise<DashboardWebuserDto[]> {
        let webusers: Array<WebUser> = [];
        if (loggedUser.role === Role.consortium) {
            //If is consortium
            const consortium = await this.consortiumModel.findOne({ ownerUserId: loggedUser._id }).exec();
            if (!consortium) {
                throw new BadRequestException();
            }
            const bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
            for await (const banking of bankings) {
                const webusersBanking = await this.webUserModel.find({ bankingId: banking._id }).exec();
                webusers = webusers.concat(webusersBanking);
            }
        } else if (loggedUser.role === Role.banker) {
            //If is banker
            const banking = await this.bankingModel.findOne({ ownerUserId: loggedUser._id }).exec();
            if (!banking) {
                throw new BadRequestException();
            }
            webusers = await this.webUserModel.find({ bankingId: banking._id }).exec();
        } else if (loggedUser.role === Role.admin || loggedUser.role === Role.sysadmin) {
            //If is admin or sysadmin
            webusers = await this.webUserModel.find().exec();
        } else {
            throw new BadRequestException();
        }
        const webuserDtos: DashboardWebuserDto[] = [];
        for await (const webuser of webusers) {
            const user = await this.userModel.findById(webuser.ownerUserId).exec();
            const banking = await this.bankingModel.findById(webuser.bankingId).exec();
            const consortium = await this.consortiumModel.findById(banking.consortiumId).exec();
            try {
                webuserDtos.push({
                    _id: webuser._id,
                    name: user.name,
                    bankingName: banking.name,
                    consortiumName: consortium.name,
                    claimed: await this.sumBets(webuser.bets, [BetStatus.claimed], PosibleSums.count),
                    pending: await this.sumBets(webuser.bets, [BetStatus.pending], PosibleSums.count),
                    loser: await this.sumBets(webuser.bets, [BetStatus.loser], PosibleSums.count),
                    total: webuser.bets.length,
                    profits: await this.sumBets(
                        webuser.bets,
                        [BetStatus.expired, BetStatus.claimed, BetStatus.pending, BetStatus.winner, BetStatus.loser],
                        PosibleSums.amount,
                    ),
                    prizes: await this.sumBets(webuser.bets, [BetStatus.claimed], PosibleSums.amountWin),
                    pendingPrizes: await this.sumBets(webuser.bets, [BetStatus.winner], PosibleSums.amountWin),
                    balance: await webuser.calculateBalance(),
                });
            } catch (e) {
                this.logger.error('missing esential data on getWebUsersStatistics', 'dashboard.services');
            }
        }
        return webuserDtos;
    }

    async getGraphConsortiumStatistics(): Promise<DashboardGraphConsortiumDto[]> {
        const consortiumsDto: DashboardGraphConsortiumDto[] = [];
        const consortiums: Array<Consortium> = await this.consortiumModel.find().exec();
        for await (const consortium of consortiums) {
            const balance = await consortium.calculateBalance();
            consortiumsDto.push({
                _id: consortium._id,
                name: consortium.name,
                value: balance,
            });
        }
        return consortiumsDto;
    }

    async getGraphBankingStatistics(loggedUser: User): Promise<DashboardGraphBankingDto[]> {
        const bankingsDto: DashboardGraphBankingDto[] = [];
        let bankings: Array<Banking> = [];
        if (loggedUser.role === Role.consortium) {
            //If is consortium
            const consortiums = await this.consortiumModel.find({ ownerUserId: loggedUser._id }).exec();
            if (consortiums.length === 0) {
                throw new BadRequestException();
            }
            const consortium = consortiums.pop();
            bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
        } else {
            //If is admin
            bankings = await this.bankingModel.find().exec();
        }
        for await (const banking of bankings) {
            const balance = await banking.calculateBalance();
            bankingsDto.push({
                _id: banking._id,
                name: banking.name,
                value: balance,
            });
        }
        return bankingsDto;
    }

    async getGraphBankingBalanceStatistics(loggedUser: User): Promise<DashboardGraphBalanceBankingDto[]> {
        const bankings = await this.bankingModel.find({ ownerUserId: loggedUser._id }).exec();
        if (bankings.length === 0) {
            throw new BadRequestException();
        }
        const data: DashboardGraphBalanceBankingDto[] = [];
        const banking = bankings.pop();
        const dates: Date[] = [];
        for (let i = 0; i < 30; i++) {
            dates.unshift(await this.sumDate(-i));
        }
        for await (const date of dates) {
            const balance = await this.getBalanceByDate(banking.transactions, date);
            data.push({
                name: date.toISOString(),
                value: balance,
            });
        }
        return data;
    }

    async getGraphConsortiumBankingBalanceStatistics(
        loggedUser: User,
    ): Promise<DashboardGraphConsortiumBalanceBankingDto[]> {
        const consortium = await this.consortiumModel.findOne({ ownerUserId: loggedUser._id }).exec();
        if (!consortium) {
            throw new BadRequestException();
        }
        const bankings = await this.bankingModel.find({ consortiumId: consortium._id }).exec();
        const data: DashboardGraphConsortiumBalanceBankingDto[] = [];
        const dates: Date[] = [];
        for (let i = 0; i < 30; i++) {
            dates.unshift(await this.sumDate(-i));
        }

        for await (const banking of bankings) {
            const series = [];
            for await (const date of dates) {
                const balance = await this.getBalanceByDate(banking.transactions, date);
                series.push({
                    name: date.toISOString(),
                    value: balance,
                });
            }
            data.push({
                name: banking.name,
                series,
            });
        }
        return data;
    }

    private async getBalanceByDate(transactions: Transaction[], date: Date) {
        let balance = 0;
        transactions.forEach((item) => {
            if (item.createdAt < date) {
                balance += item.amount;
            }
        });
        return balance;
    }

    private async sumDate(days: number): Promise<Date> {
        const now = new Date();
        return new Date(now.getTime() + 24 * 60 * 60 * 1000 * days);
    }

    private async sumBets(bets: Bet[], betStatus: BetStatus[], key: PosibleSums): Promise<number> {
        switch (key) {
            case PosibleSums.amount:
                return bets.reduce(function (acc, bet) {
                    return (
                        acc +
                        (betStatus.includes(bet.betStatus)
                            ? bet.plays.reduce(function (acc, play) {
                                  return acc + (play.amount ? play.amount : 0);
                              }, 0)
                            : 0)
                    );
                }, 0);
            case PosibleSums.amountWin:
                return bets.reduce(function (acc, bet) {
                    return acc + (betStatus.includes(bet.betStatus) ? (bet.amountWin ? bet.amountWin : 0) : 0);
                }, 0);
            case PosibleSums.count:
                return bets.filter((bet) => betStatus.includes(bet.betStatus)).length;
        }
        return 0;
    }
}

enum PosibleSums {
    'amount',
    'amountWin',
    'count',
}
