'use client'

import { Button } from '../button'
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const NewPostButton = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleCreating = async () => {
    setIsLoading(true)

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Untitled Post',
      }),
    })

    const post = await response.json()

    router.push(`/dashboard/${post.id}`)

    router.refresh()

    setIsLoading(false)
  }

  return (
    <Button
      className="max-sm:self-end font-semibold h-10 w-[6rem]"
      onClick={handleCreating}
      variant="regular"
      disabled={isLoading}
    >
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} className=" animate-spin" />
      ) : (
        'New post'
      )}
    </Button>
  )
}

export { NewPostButton }
