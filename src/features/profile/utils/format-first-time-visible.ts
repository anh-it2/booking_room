import { Time } from "./format-time-range";

export function formatFirstTimeVisible(startTime?: Time, endTime?: Time): string{
    if(startTime === undefined || endTime === undefined) return ''
    const start: string = `${startTime.hours}h: ${startTime.minutes}'`
    const end: string = `${endTime.hours}h: ${endTime.minutes}'`
    return `${start} - ${end}`
}