import { Time } from "./format-time-range"

export function convertStringToTime(bookingTime: string):Time{
    const years = new Date(bookingTime).getFullYear()
    const months = new Date(bookingTime).getMonth() + 1
    const days = new Date(bookingTime).getDay()
    const hours = new Date(bookingTime).getHours()
    const minutes = new Date(bookingTime).getMinutes()
    return {years, months, days, hours, minutes}
}