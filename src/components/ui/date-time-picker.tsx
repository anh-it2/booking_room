'use client'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React, { useState } from 'react'
import { Button } from './button'
import { format } from 'date-fns-tz'
import { Calendar } from './calendar'
import { Calendar1, Clock } from 'lucide-react'

interface DateTimePickerProp{
    value?: Date
    onChange: (date: Date | undefined) => void
}

const DateTimePicker = ({value, onChange}:DateTimePickerProp) => {

    const handleTimeChange = (type: 'hours' | 'minutes', newValue: number) => {
        if(!value) return 
        const updated = new Date(value)
        if(type === 'hours') updated.setHours(newValue)
            else updated.setMinutes(newValue)

        onChange(updated)
    }

  return (
    <div className='flex items-center gap-2 w-full  '>
        <div className='flex-1 justify-start text-center font-normal cursor-default border-2 p-1 rounded-lg bg-gray-50'>
            {value? format(value,'dd/MM/yyyy HH:mm',{timeZone: 'Aisa/Ho_Chi_Minh'}): <span>Chọn thời gian</span>}
        </div>
        <div className='flex gap-1'>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant='outline'>
                        <Calendar1 />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='relative z-10'>
                    <Calendar 
                        mode='single'
                        selected={value}
                        onSelect={(date) => onChange(date)}
                        initialFocus
                        className='p-2 w-auto rounded-xl shadow-lg border bg-white'
                        classNames={{
                            months: 'text-base font-bold text-gray-800',
                            nav_button: 'text-gray-600 hover:bg-gray-200 rounded-lg p-2',
                            day_outside: 'text-gray-400',
                            day_selected: 'bg-blue-600 text-white shadow-lg',
                            day_today: 'border-2 border-blue-500 font-semibold text-blue-500'
                        }}
                    />
                </PopoverContent>
            </Popover>
            
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant='outline'>
                        <Clock />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className='mt-2 bg-white flex flex-row gap-1'>
                        <select
                            value={value ? value.getHours() : 0}
                            onChange={(e) => handleTimeChange("hours", parseInt(e.target.value))}
                            className="border rounded p-1"
                        >
                            {Array.from({ length: 24 }).map((_, i) => (
                            <option key={i} value={i}>
                                {i.toString().padStart(2, "0")}
                            </option>
                            ))}
                        </select>
                        :
                        <select
                            value={value ? value.getMinutes() : 0}
                            onChange={(e) =>
                            handleTimeChange("minutes", parseInt(e.target.value))
                            }
                            className="border rounded p-1"
                        >
                            {Array.from({ length: 60 }).map((_, i) => (
                            <option key={i} value={i}>
                                {i.toString().padStart(2, "0")}
                            </option>
                            ))}
                        </select>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    </div>
  )
}

export default DateTimePicker