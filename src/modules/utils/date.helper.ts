import { Injectable } from '@nestjs/common';

@Injectable()
export class DateHelper {
    /***
     * this method returns the date in miliseconds from epoch
     * epoch = 0 = Thursday 1 January 1970 00:00:00
     * @param date
     */
    static getTime(date: Date): number {
        date.setMilliseconds(0);
        const offset = date.getTimezoneOffset() * MINUTE_LENGTH;
        return Math.trunc(date.getTime() / 1000) - offset;
    }

    /***
     * returns the hours and minutes in seconds on a date independently of the actual day
     * @param date plain Date Format
     */
    static getHours(date: Date): number {
        const epoch = this.getTime(date);
        const days = Math.trunc(epoch / DAY_LENGTH);
        return epoch - days * DAY_LENGTH;
    }

    /***
     * compares 2 dates and returns if the first input is equal (0), bigger(1) or smaller(-1) than the second
     * @param d1
     * @param d2
     */
    compareDates(d1: Date, d2: Date): number {
        /*TODO implement date compare*/
        return 0;
    }

    /***
     * returns the amount of seconds difference between 2 dates independently of the day
     * @param d1
     * @param d2
     */
    static getHourlyDiff(d1: Date, d2: Date): number {
        return this.getHours(d1) - this.getHours(d2);
    }

    /***
     * returns the amount of seconds difference between 2 dates having the day into consideration
     * @param d1
     * @param d2
     */
    getTimeDiff(d1: Date, d2: Date): number {
        /*TODO IMPL*/
        return 0;
    }

    static isDateToday(d: Date): boolean {
        return this.getDaysFromDate(this.getTime(new Date())) === this.getDaysFromDate(this.getTime(d));
    }

    private static getDaysFromDate(epochTimestamp: number): number {
        return Math.trunc(epochTimestamp / DAY_LENGTH);
    }

    static getWeekBefore(epochTimestamp: number): number {
        return epochTimestamp - WEEK_LENGHT * 1000;
    }
}

/***
 * Time measurements in seconds
 * */
export const MINUTE_LENGTH = 60;
export const HOUR_LENGTH = MINUTE_LENGTH * 60;
export const DAY_LENGTH = HOUR_LENGTH * 24;
export const WEEK_LENGHT = DAY_LENGTH * 7;
