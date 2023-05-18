'use client'

import { Button } from '../button'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

const NewPostButton = () => {
  const router = useRouter()

  const handleRedirect = () => {
    router.push('/dashboard/create')
  }
  return (
    <Button
      onClick={handleRedirect}
      variant="primary"
      title="New post"
      icon={faPlus}
    />
  )
}

export { NewPostButton }
