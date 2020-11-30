import {DataObject} from "./DataObject";
import {LotteryTime} from "./LotteryTime";
import {OCStatus} from "./OCStatus";
import {BettingLimit} from "./BettingLimit";
import {PrizeLimit} from "./PrizeLimit";
import {BankingFeeLimit} from "./BankingFeeLimit";
import {result} from "./Result";

export class Lottery implements DataObject {
    lotteryId?: string;
    name?: string;
    nickname?: string;
    color?: string;
    logo?: string;
    status?: OCStatus;
    times?: LotteryTime[];
    bettingLimits?: BettingLimit[];  // Cuanto y a que se le puede apostar
    prizeLimits?: PrizeLimit[]; // Cuanto se paga a un ganador por cada peso apostado
    bankingFeeLimits?: BankingFeeLimit[]; // Que porcentaje se le paga a la banca por cada jugada
    fallback?: number; // Que porcentaje se le paga a la banca por el total de sus ventas
    lastResults?: string;
    results?: Map<string, result>;


    // Data object members
    creationDate: Date;
    creationUserId: string;
    deletionDate: Date;
    modificationDate: Date;
    modificationUserId: string;
    id: string;
}