'use client'
import { Booking, initData } from '@/constants/apiUserBooking'
import { formatFirstTimeVisible } from '@/features/profile/utils/format-first-time-visible'
import { Time } from '@/features/profile/utils/format-time-range'
import { useLoadingState } from '@/store/useLoadingState'
import { addDays, format, startOfWeek } from 'date-fns'
import React, { SetStateAction, useEffect, useLayoutEffect, useRef, useState } from 'react'
import AddnewEvent from './add-new-event'
import BookedEvent from './booked-event'


type DayPop = {
    currentDay: Date,
    setCurrentDay: React.Dispatch<SetStateAction<Date>>
}

const CalendarBody = ({currentDay, setCurrentDay}: DayPop) => {

    const setLoading = useLoadingState((state) => state.setLoading)
    const [bookings, setBookings] = useState<Booking[]>()
    const start = startOfWeek(currentDay,{weekStartsOn:0})
    const dayOfWeek = Array.from({length: 7}).map((_,i) => addDays(start,i))
    const [dragStart, setDragStart] = useState<Time>()
    const [dragEnd, setDragEnd] = useState<Time>()
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [startTime, setStartTime] = useState<Time>()
    const [endTime, setEndTime] = useState<Time>()
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [firstVisible, setFirstVisible] = useState<string>()
    const [height, setHeight] = useState<number>(0)
    const [width, setWidth] = useState<number>(0)
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() =>{
        
        async function fetchData() {
            setLoading(true)
            await initData.initialize()
            const booked = initData.getUserBookings({page: 1, limit: 9999})
            setBookings(booked.bookings)
            setLoading(false)
        }
        fetchData() 
    },[bookings])

    useLayoutEffect(() =>{
        if(divRef.current){
            setHeight(divRef.current.offsetHeight)
            setWidth(divRef.current.offsetWidth)
        }
    },[])
    
    
    const handleMouseDown = (time: Time) => {
        setDragStart(time)
        setDragEnd(time)
        setIsDragging(true)
        setDialogOpen(false)
        setFirstVisible(formatFirstTimeVisible(time, time))
    }
    const handleMouseEnter = (time: Time) =>{
        if(isDragging) {
            setDragEnd(time)
            setFirstVisible(formatFirstTimeVisible(dragStart, time))
            return 
        }
        return time.days === startTime?.days
    }

    const toMinutes = (time: Time | undefined):number => {return time !== undefined ?  time.days * 24 * 60 + time.hours * 60 + time.minutes : 0}
    const handleMouseUp = () => {
        setIsDragging(false)
        if(toMinutes(dragStart) <= toMinutes(dragEnd)){
            setStartTime(dragStart)
            setEndTime(dragEnd)
            setFirstVisible(formatFirstTimeVisible(dragStart, dragEnd))
        } else {
            setStartTime(dragEnd)
            setEndTime(dragStart)
            setFirstVisible(formatFirstTimeVisible(dragEnd, dragStart))
        }
        setDialogOpen(true)
    }
    
    const isRanged = (time: Time | undefined) =>{
        const start = isDragging ? dragStart : startTime
        const end = isDragging ? dragEnd : endTime

        if (!start || !end) return false
        const startMin = Math.min(toMinutes(start), toMinutes(end))
        const endMin = Math.max(toMinutes(start), toMinutes(end))
        const currentMin = toMinutes(time)
        return currentMin >= startMin && currentMin <= endMin && time?.days === start.days
    }

  return (
     <div className='grid grid-cols-8 mb-5'>
            <div className='col-span-1 border-r'>
                <span className='h-16 flex items-start justify-end text-xs text-gray-500 font-semibold pr-2 border-b'>Time</span>
                {Array.from({length: 24}).map((_,i) => (
                    <div key={i} className='h-16 flex items-start justify-end pr-2 text-xs text-gray-500 font-semibold border-b'>
                        {i}:00
                    </div>
                ))}
            </div>

            <div className='col-span-7 grid grid-cols-7 divide-x relative' ref={divRef}>
                {dayOfWeek.map((day, dayIndex) => (
                    <div key={dayIndex}>
                        <div className='h-16 border-b flex flex-col'>
                            <div className='flex justify-center text-gray-500'>{format(day,'EEE')}</div>
                            <span className='flex justify-center text-2xl text-gray-600 cursor-pointer'>{format(day,'d')}</span>
                        </div>
                        <div className='grid grid-rows-24'
                        >
                            {Array.from({length:24}).map((_, hourIndex) =>(
                                <div className='grid grid-rows-4 h-16' key={hourIndex}>
                                    {Array.from({length: 4}).map((_, minuteIndex) => {
                                        const time: Time = {
                                            years: Number(format(day,'yyyy')),
                                            months: Number(format(day,'MM')),
                                            days: Number(format(day,'d')),
                                            hours: hourIndex ,
                                            minutes: (minuteIndex)*15
                                        }
                                        return <div key={minuteIndex} 
                                                onMouseDown={() => handleMouseDown(time)}
                                                onMouseEnter={() => handleMouseEnter(time)}
                                                onMouseUp={() => handleMouseUp()}
                                                className={`h-4 relative flex justify-center
                                                    ${time.minutes === 45 ?'border-b':'' }
                                                    ${isRanged(time) ? 'bg-red-400 border-red-400 border-b-2' :''} 
                                                    ${isDragging ? 'cursor-all-scroll ' : ''}
                                                    ${false && 'bg-blue-400 text-white'}
                                                    `
                                                }
                                        >
                                            {toMinutes(time) === toMinutes(dragStart) && isRanged(time) && firstVisible && (<span className='absolute z-10 select-none top-[-1] '>{firstVisible}</span>)}
                                            {false && (<span>123</span>)}
                                        </div>
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {bookings?.map((booking, index) => <BookedEvent key={index} booking={booking} currentDay={currentDay} height={height} width={width}/>)}
            </div>
            <AddnewEvent dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} startTime={startTime} endTime={endTime}/>
        </div>
  )
}

export default CalendarBody