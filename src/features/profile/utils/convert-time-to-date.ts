import { Time } from "./format-time-range";

export function timeToDate(time: Time | undefined) {
    if(time === undefined) return

    return new Date(time.years, time.months - 1, time.days, time.hours, time.minutes)
}