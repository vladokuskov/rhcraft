import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../button'
import { useState } from 'react'
import { getCurrentUser } from '@/lib/session'

type DashboardPost = {
  title: string
  date: string
  id: string
}

const DashboardPost = ({ title, date, id }: DashboardPost) => {
  return (
    <li className="w-full flex items-center justify-between py-4 px-4 border border-neutral-600 rounded">
      <div>
        <h4 className="font-sans text-white font-xl font-semibold text-lg">
          {title}
        </h4>
        <p className="font-sans text-neutral-500 tracking-tight">{date}</p>
      </div>
      <Button
        variant="icon"
        icon={faEllipsisVertical}
        title="Post menu"
        className=" text-2xl"
      />
    </li>
  )
}

export { DashboardPost }
