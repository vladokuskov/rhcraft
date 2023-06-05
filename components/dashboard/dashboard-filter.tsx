'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../button'
import DatePicker from '../date-picker'
import { useFilterContext } from '@/app/context/filter.context'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const DashboardFilter = () => {
  const { date, setDate } = useFilterContext()

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full flex gap-4 items-center justify-start">
        <DatePicker
          onChange={(e) => setDate(e)}
          initialDate={date}
          className=" w-52"
        />
        {date && (
          <Button variant="outline" size="small">
            <FontAwesomeIcon icon={faClose} onClick={() => setDate(null)} />
          </Button>
        )}
      </div>
    </div>
  )
}

export { DashboardFilter }
