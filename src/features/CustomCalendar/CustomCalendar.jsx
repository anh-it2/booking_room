'use client'
import { useState } from 'react'
import styles from './CustomCalendar.module.css'
const CustomCalendar = () => {

  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ]
  const weekdays = [
    'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
  ]
  const renderCalendar = () =>{

    let dates = []

    const daysInMonth = new Date(currentYear, currentMonth + 1,0).getDate()
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const prevDays = new Date(currentYear, currentMonth, 0).getDate()

    //days in prev month
    for(let i = firstDay; i > 0; i--){
      dates.push(
        <div key={`p${i}`} className={`${styles.date} ${styles['in-active']}`}>
          {prevDays - i + 1}
        </div>
      )
    }

    //day in current month
    for(let i = 1; i <= daysInMonth; i++){
      const isToday = i === today.getDate()&&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()

      dates.push(
        <div key={i} className={`${styles.date} ${isToday? styles.active : styles['in-active']}`}>
          {i}
        </div>
      )
    }

    //day in next month
    let totalCells = firstDay + daysInMonth
    let nextDays = 35 - totalCells
    for(let i = 1; i <= nextDays; i++){
      dates.push(
        <div key={`n${i}`} className={`${styles.date} ${styles['in-active']}` }>
          {i}
        </div>
      )
    } 
    return dates
  }

  const handlePrevClick = () => {
    if(currentMonth === 0){
      setCurrentMonth(11)
      setCurrentYear((prev) => prev - 1)
    }else{
      setCurrentMonth((prev) => prev - 1)
    }
  }

  const handleNextClick = () =>{
    if(currentMonth === 11){
      setCurrentMonth(0)
      setCurrentYear((prev) => prev + 1)
    }else{
      setCurrentMonth((prev) => prev + 1)
    }
  }

  return (
    <div className={styles.calendar}>
      <div className={styles['calendar-header']}>
        <button onClick={handlePrevClick} className={styles['change-month']}>&lt;</button>
        <span className={styles.month}>{monthNames[currentMonth]} {currentYear}</span>
        <button onClick={handleNextClick} className={styles['change-month']}>&gt;</button>
      </div>

      <div className={styles['calendar-weekdays']}>
        {weekdays.map((weekday, index) =>{
          return (
            <div className={styles['week-day']} key={index}>
              {weekday}
            </div>
          )
        })}
        {renderCalendar()}
      </div>
    </div>
  )
}

export default CustomCalendar