'use client'

import { Button } from '../button'
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
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
      className="max-sm:self-end"
      size="sm2"
      onClick={handleCreating}
      variant="primary"
      title={isLoading ? 'Creating' : 'New post'}
      icon={isLoading ? faSpinner : faPlus}
      isDisabled={isLoading}
      isLoading={isLoading}
    />
  )
}

export { NewPostButton }
