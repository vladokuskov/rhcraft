'use client'

import { User } from 'next-auth'
import { useState } from 'react'

interface NameChange {
  user: User | null | undefined
}

const initialForm = {
  title: 'Untitled post',
  content: '',
}

const CreatePostForm = ({ user }: NameChange) => {
  const [post, setPost] = useState(initialForm)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setPost((prev) => ({ ...prev, [name]: value }))
  }

  const handlePostCreation = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSaving(true)
    if (user) {
      try {
        const response = await fetch(`/api/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: post.title,
            content: post.content,
          }),
        })

        if (!response?.ok) {
          setError('Something happen when creating your post')
        }

        setIsSaving(false)
      } catch (err) {
        if (err instanceof Error) setError(err.message)
        setIsSaving(false)
      }
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handlePostCreation}>
      {error && <p className="text-red-500">{error}</p>}
      <input
        name="title"
        className="text-black"
        onChange={handleFormChange}
        disabled={isSaving}
        value={post.title}
      />
      <input
        type="textfield"
        name="content"
        className="text-black"
        onChange={handleFormChange}
        disabled={isSaving}
        value={post.content}
      />
      <button className="bg-lime-500" disabled={isSaving}>
        Save
      </button>
    </form>
  )
}

export { CreatePostForm }
