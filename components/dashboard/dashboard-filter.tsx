'use client'

import { useState } from 'react'
import DatePicker from '../date-picker'

const DashboardFilter = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <div>
      <DatePicker onChange={(e) => setSelectedDate(e)} />
    </div>
  )
}

export { DashboardFilter }
