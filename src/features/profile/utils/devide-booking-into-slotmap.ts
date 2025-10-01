import { Booking } from "@/constants/apiBooking";
import { addMinutes, format } from "date-fns";

export function buildSlotMap(bookings: Booking[]):Set<string>{
    const slotSet = new Set<string>()
    bookings.map(booking =>{
        const start = new Date(booking.startTime)
        const end = new Date(booking.endTime)
        let current = start
        while(current < end){
            const key = format(current,'yyyy-MM-dd HH:mm')
            slotSet.add(key)
            current = addMinutes(current, 15)
        }
    })
    return slotSet
}