import { Booking } from "@/constants/apiBooking"
import { differenceInDays, differenceInMinutes, startOfDay, startOfWeek } from "date-fns"

type BookedEventProp = {
    booking: Booking,
    currentDay: Date,
    height: number,
    width: number
}

const MINUTES_IN_DAY = 24 *60

const BookedEvent = ({booking, currentDay, height, width}: BookedEventProp) => {
    const event = {
        ...booking,
        startTime: new Date(booking.startTime),
        endTime: new Date(booking.endTime)
    }
    console.log(event)
    const eventDuration = differenceInMinutes(event.endTime, event.startTime)
    const percentageDuration = eventDuration / MINUTES_IN_DAY
    const eventHeightDuration = percentageDuration * height

    const eventHeight = differenceInMinutes(event.startTime, startOfDay(event.startTime))
    const percentagePositionHeight = eventHeight / MINUTES_IN_DAY
    const eventPositionHeight = percentagePositionHeight * height

    const eventPositionWidth = differenceInDays(startOfDay(event.startTime), startOfWeek(currentDay,{weekStartsOn:0}))
    if(eventPositionWidth < 0 || eventPositionWidth > 7) return null
    const eventPosition = eventPositionWidth / 7 * width
    const columnWidth = width / 7    

  return (
    <div
        style={{
            position:'absolute',
            top: eventPositionHeight,
            left: eventPosition,
            height: eventHeightDuration,
            width: columnWidth,
            background: 'lightblue',
            border: "1px solid #333",
            borderRadius: "4px",
        }}
    >{booking.title}</div>
  )
}

export default BookedEvent