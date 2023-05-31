'use client'

import { User } from 'next-auth'
import { useState } from 'react'
import { Button } from '../button'
import {
  faExclamationTriangle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { Input } from '../input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'

interface NameChange {
  userName: string | null | undefined
  user: User | null | undefined
}

const SettingsNameChange = ({ userName, user }: NameChange) => {
  const router = useRouter()
  const [name, setName] = useState(userName ? userName : '')
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleNameSave = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSaving(true)
    if (user) {
      try {
        const response = await fetch(`/api/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
          }),
        })

        if (!response?.ok) {
          setError('Your name was not updated. Please try again.')
        } else {
          router.refresh()
          setIsSaving(false)
        }
      } catch (err) {
        if (err instanceof Error) setError(err.message)
        setIsSaving(false)
      }
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-6 py-6 px-4 border border-neutral-600 rounded"
      onSubmit={handleNameSave}
    >
      <div>
        <h3 className="font-sans text-white font-semibold text-xl leading-4">
          Your name
        </h3>
        <p className="font-sans text-neutral-500 font-semibold tracking-wide">
          Here you can change your name
        </p>
      </div>

      <Input
        title="Your name"
        variant="outline"
        type="text"
        value={name}
        onChange={handleNameChange}
        disabled={isSaving}
        className="max-w-xs w-full font-medium"
      />

      {error && (
        <div className=" inline-flex gap-2 text-red-500 justify-center items-center ">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <p className=" font-roboto font-medium">{error}</p>
        </div>
      )}

      <Button
        variant="regular"
        title="Save change"
        size="regular"
        className="max-w-[4rem] font-semibold h-10"
        disabled={isSaving || name.length === 0}
      >
        {isSaving ? (
          <FontAwesomeIcon icon={faSpinner} className=" animate-spin" />
        ) : (
          'Save'
        )}
      </Button>
    </form>
  )
}

export { SettingsNameChange }
