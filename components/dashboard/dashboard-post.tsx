'use client'

import { useClickOutside } from '@/hooks/useClickOutside'
import {
  faEllipsisVertical,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from '../button'

type DashboardPost = {
  title: string
  date: Date
  imageURL: string | null
  id: string
  key: string
}

const handlePostDelete = async (id: string) => {
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    })

    if (!response?.ok) {
      toast.error('An error occurred while deleting post.')
    }

    return true
  } catch (err) {
    if (err) {
    }
  }
}

const DashboardPost = ({ title, date, imageURL, id }: DashboardPost) => {
  const router = useRouter()
  const dashboardPostRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useClickOutside(dashboardPostRef, false)
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <li
      className="w-full flex items-center justify-between py-4 px-4 border border-neutral-600 rounded relative"
      ref={dashboardPostRef}
    >
      <div className="flex flex-col gap-2 justify-center items-start">
        <h4 className="font-sans text-white font-xl font-semibold text-lg leading-5">
          {title}
        </h4>
        <p className="font-sans text-neutral-500 tracking-tight">
          {`${new Date(date).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}`}
        </p>
      </div>
      <Button
        variant="ghost"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        title="Post menu"
        size="large"
        className=" !text-2xl focus:bg-neutral-800 active:bg-neutral-800"
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </Button>
      {isMenuOpen && (
        <div className=" z-20 absolute right-6 bottom-[-3rem] flex flex-col font-roboto bg-black p-2 rounded border-neutral-600 border gap-2">
          <button
            className={`min-w-[6rem] text-red-500 hover:text-red-600 focus:text-red-600 ${
              isDeleting &&
              `!text-neutral-400 hover:!neutral-400 focus:!neutral-400`
            }`}
            disabled={isDeleting}
            title="Delete post"
            onClick={async () => {
              setIsDeleting(true)

              const isConfirmed = window.confirm(
                'Are you sure you want to delete post?',
              )
              if (isConfirmed) {
                if (imageURL) {
                  const imageUrl = new URL(imageURL)
                  const key = imageUrl.pathname.split('/').pop()

                  if (key) {
                    const res = await fetch(`/api/posts/media/delete/${key}`, {
                      method: 'DELETE',
                    })

                    if (!res.ok) {
                      toast.error('An error occurred while deleting the image.')
                      return false
                    }

                    return true
                  }
                }

                const deleted = await handlePostDelete(id)

                if (deleted) {
                  setIsDeleting(false)
                  router.refresh()
                }
              } else {
                setIsDeleting(false)
              }
            }}
          >
            {!isDeleting ? (
              'Delete post'
            ) : (
              <FontAwesomeIcon icon={faSpinner} className={'animate-spin'} />
            )}
          </button>
          <button
            className="w-23 text-white-100 hover:text-neutral-300 focus:text-neutral-300"
            title="Edit post"
            onClick={() => router.push(`/dashboard/${id}`)}
          >
            Edit post
          </button>
        </div>
      )}
    </li>
  )
}

export { DashboardPost }
