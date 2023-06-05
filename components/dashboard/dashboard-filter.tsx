'use client'

import DatePicker from '../date-picker'
import { useFilterContext } from '@/app/context/filter.context'

const DashboardFilter = () => {
  const { date, setDate } = useFilterContext()

  return (
    <div>
      <DatePicker onChange={(e) => setDate(e)} initialDate={date} />
    </div>
  )
}

export { DashboardFilter }
