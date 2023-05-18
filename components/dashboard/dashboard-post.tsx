'use client'

import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../button'
import { useRef, useState } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'

type DashboardPost = {
  title: string
  date: Date
  id: string
  key: string
}

const DashboardPost = ({ title, date, id }: DashboardPost) => {
  const dashboardPostRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useClickOutside(dashboardPostRef, false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handlePostDelete = async () => {
    setIsDeleting(true)

    try {
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      setIsDeleting(false)
    } catch (err) {
      if (err) {
        setIsDeleting(false)
      }
    }
  }

  return (
    <li
      className="w-full flex items-center justify-between py-4 px-4 border border-neutral-600 rounded relative"
      ref={dashboardPostRef}
    >
      <div>
        <h4 className="font-sans text-white font-xl font-semibold text-lg">
          {title}
        </h4>
        <p className="font-sans text-neutral-500 tracking-tight">
          {`${date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}`}
        </p>
      </div>
      <Button
        variant="icon"
        icon={faEllipsisVertical}
        title="Post menu"
        className=" text-2xl"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />
      {isMenuOpen && (
        <div className="z-20 absolute right-6 bottom-[-3rem] flex flex-col font-roboto bg-black p-2 rounded border-neutral-600 border gap-2">
          <button
            className=" text-red-500 hover:text-red-600 focus:text-red-600"
            disabled={isDeleting}
            title="Delete post"
            onClick={handlePostDelete}
          >
            Delete post
          </button>
          <button
            className=" text-white-100 hover:text-neutral-300 focus:text-neutral-300"
            title="Edit post"
            onClick={handlePostDelete}
          >
            Edit post
          </button>
        </div>
      )}
    </li>
  )
}

export { DashboardPost }
