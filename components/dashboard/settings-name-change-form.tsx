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

interface NameChange {
  userName: string | null | undefined
  user: User | null | undefined
}

const SettingsNameChange = ({ userName, user }: NameChange) => {
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
        }

        setIsSaving(false)
      } catch (err) {
        if (err instanceof Error) setError(err.message)
        setIsSaving(false)
      }
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-2 py-6 px-4 border border-neutral-600 rounded"
      onSubmit={handleNameSave}
    >
      <h3 className="font-sans text-white font-semibold text-xl">Your name</h3>
      <p className="font-sans text-neutral-500 font-semibold tracking-wide">
        Here you can change your name
      </p>
      <Input
        title="Name"
        variant="outlined"
        type="text"
        value={name}
        onChange={handleNameChange}
        isDisabled={isSaving}
        full
        className="max-w-xs"
      />
      {error && (
        <div className=" inline-flex gap-2 text-red-500 justify-center items-center ">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <p className=" font-roboto font-medium">{error}</p>
        </div>
      )}
      <Button
        className=" max-w-[7rem] mt-3"
        variant="primary"
        title={isSaving ? 'Saving' : 'Save'}
        isRequired
        icon={isSaving ? faSpinner : null}
        isLoading={isSaving}
        full={false}
        isDisabled={isSaving}
      />
    </form>
  )
}

export { SettingsNameChange }
