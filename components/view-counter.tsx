'use client'

import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'

const ViewCounter = ({
  postId,
  views,
}: {
  postId: string
  views: number | null
}) => {
  useEffect(() => {
    const fetchViews = async () => {
      const hasViewed = localStorage.getItem(`post_view_${postId}`)

      if (!hasViewed) {
        await fetch(`/api/posts/${postId}/views`, {
          method: 'PATCH',
        })

        localStorage.setItem(`post_view_${postId}`, 'true')
      }
    }

    fetchViews()
  }, [])

  return (
    <p className="font-roboto text-sm font-semibold text-neutral-500 flex flex-inline items-center justify-start gap-2">
      <FontAwesomeIcon icon={faEye} />
      {views}
    </p>
  )
}

export default ViewCounter
