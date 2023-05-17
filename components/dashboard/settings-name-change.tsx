'use client'

import { User } from 'next-auth'
import { useState } from 'react'

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
    <form className="flex flex-col gap-2" onSubmit={handleNameSave}>
      <p>Here you can change your name</p>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="text-black"
        onChange={handleNameChange}
        disabled={isSaving}
        value={name}
      />
      <button className="bg-lime-500" disabled={isSaving}>
        Save
      </button>
    </form>
  )
}

export { SettingsNameChange }
