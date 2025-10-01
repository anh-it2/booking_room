
import { Button } from '@/components/ui/button'
import CustomCalendar from '@/features/CustomCalendar/CustomCalendar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { addDays, format, startOfWeek } from 'date-fns'
import React, { SetStateAction } from 'react'

type DayProp = {
    currentDay: Date,
    setCurrentDay: React.Dispatch<SetStateAction<Date>>
}

const CalendarHeader = ({currentDay, setCurrentDay}: DayProp) => {
    
    const start = startOfWeek(currentDay,{weekStartsOn: 0})

    const dayOfWeek = Array.from({length: 7}).map((_,i) => {
        addDays(start,i)
    })

    const handleNextBtn = () => setCurrentDay(addDays(start, 7))
    const handlePrevBtn = () => setCurrentDay(addDays(start, -7))
    const handleTodayBtn = () => setCurrentDay(new Date())
  return (
    <div className='flex flex-row px-1 gap-2'>
        <Button variant='outline' className='text-xl' onClick={handleTodayBtn}>Today</Button>
        <div>
            <Button variant='ghost' onClick={handlePrevBtn}>
                <svg className="w-8 h-8 size-0.5" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18L9 12L15 6"/>
                </svg>
            </Button>
            <Button variant='ghost' onClick={handleNextBtn}>
                <svg className="w-8 h-8 size-0.5" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6L15 12L9 18"/>
                </svg>
            </Button>
        </div>
        <Popover>
            <PopoverTrigger>
                <div>
                    {start.getMonth() !== addDays(start, 6).getMonth()?
                    (<div className='text-xl '>
                        {format(start,'MMMM')} {format(start,'d')} - {format(addDays(start,6),'MMMM')} {format(addDays(start,6),'d')}, {format(start,'yyyy')}
                    </div>
                    ):
                    (
                    <div className='text-xl'>
                        {format(start,'MMMM')} {format(start,'d')} - {format(addDays(start,6),'d')}, {format(start,'yyyy')}
                    </div>
                    )
                    }
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <CustomCalendar />
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default CalendarHeader