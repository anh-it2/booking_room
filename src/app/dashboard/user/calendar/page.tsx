'use client'
import { ScrollArea } from '@/components/ui/scroll-area'
import CalendarBody from '@/features/Calendar/components/calendar-body'
import CalendarHeader from '@/features/Calendar/components/calendar-header'
import { useState } from 'react'

const Page = () => {
  const [currentDay, setCurrentDay] = useState(new Date())
  return (
    <ScrollArea className='h-[calc(100dvh-52px)] overflow-y-auto'>
      <CalendarHeader currentDay={currentDay} setCurrentDay={setCurrentDay}/>
      <CalendarBody currentDay={currentDay} setCurrentDay={setCurrentDay}/>
    </ScrollArea>
  )
}

export default Page