'use client'

import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from '../button'
import { Input } from '../input'

interface NameChange {
  userName: string | null | undefined
  userId: string
}

const SettingsNameChange = ({ userName, userId }: NameChange) => {
  const router = useRouter()
  const [name, setName] = useState(userName ? userName : '')
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleNameSave = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSaving(true)

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
        }),
      })

      if (!response?.ok) {
        toast.error('Your name was not updated. Please try again.')
      } else {
        setIsSaving(false)

        toast.success('Changes successfully saved.')

        router.refresh()
      }
    } catch (err) {
      if (err instanceof Error) toast.error(err.message)
      setIsSaving(false)
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

      <Button
        variant="regular"
        title="Save change"
        size="regular"
        className="max-w-[4rem] font-semibold h-10 w-14"
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
