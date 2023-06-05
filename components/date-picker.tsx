'use client'

import { useClickOutside } from '@/hooks/useClickOutside'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'

type DatePickerProps = {
  initialDate?: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const DatePicker: React.FC<DatePickerProps> = ({
  initialDate,
  onChange,
  placeholder,
}) => {
  const ref = useRef(null)
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate ? initialDate : null,
  )
  const [selectedMonth, setSelectedMonth] = useState(
    selectedDate ? selectedDate.getMonth() : today.getMonth(),
  )
  const [selectedYear, setSelectedYear] = useState(
    selectedDate ? selectedDate.getFullYear() : today.getFullYear(),
  )
  const [showCalendar, setShowCalendar] = useClickOutside(ref, false)

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    onChange(date)
    setShowCalendar(false)
  }

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const handleMonthChange = (newMonth: number) => {
    let newYear = selectedYear
    if (newMonth < 0) {
      newMonth = 11
      newYear -= 1
    } else if (newMonth > 11) {
      newMonth = 0
      newYear += 1
    }

    setSelectedMonth(newMonth)
    setSelectedYear(newYear)
  }

  const renderCalendar = () => {
    const numDays = daysInMonth(selectedMonth, selectedYear)
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay()
    const daysArray = Array.from({ length: numDays }, (_, index) => index + 1)

    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            className="text-neutral-400 hover:text-neutral-300 focus:text-neutral-300"
            onClick={() => handleMonthChange(selectedMonth - 1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="text-neutral-500 font-semibold">
            {months[selectedMonth]} {selectedYear}
          </div>
          <button
            type="button"
            className="text-neutral-400 hover:text-neutral-300 focus:text-neutral-300"
            onClick={() => handleMonthChange(selectedMonth + 1)}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
            (day, index) => (
              <div key={index} className="text-center text-neutral-400 text-sm">
                {day}
              </div>
            ),
          )}

          {Array(firstDay)
            .fill(null)
            .map((_, index) => (
              <div key={index} />
            ))}

          {daysArray.map((day) => (
            <div
              key={day}
              className={`cursor-pointer text-center py-1 rounded ${
                selectedDate && selectedDate.getDate() === day
                  ? 'bg-neutral-400 text-neutral-100'
                  : 'hover:bg-neutral-500 transition-colors text-neutral-300'
              }`}
              onClick={() =>
                handleDateChange(new Date(selectedYear, selectedMonth, day))
              }
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative font-sans z-10" ref={ref}>
      <div
        className="w-full px-4 py-2 rounded flex items-center justify-between bg-transparent hover:border-neutral-400 focus:border-neutral-400 border-2 border-neutral-500 cursor-pointer text-neutral-500 transition-colors hover:placeholder:text-neutral-400"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <input
          type="text"
          value={selectedDate ? selectedDate.toDateString() : ''}
          readOnly
          placeholder={placeholder || 'Select a date'}
          className="w-full bg-transparent outline-none cursor-pointer placeholder:text-neutral-500"
        />
        <FontAwesomeIcon icon={faCalendar} />
      </div>

      {showCalendar && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-neutral-700 shadow-lg rounded border-2 border-neutral-600">
          {renderCalendar()}
        </div>
      )}
    </div>
  )
}

export default DatePicker
