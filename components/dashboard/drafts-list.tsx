'use client'

import { getCurrentUser } from '@/lib/session'
import { Post } from '@prisma/client'
import { useState } from 'react'

export default function DraftsList({ posts }: { posts: any }) {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleDraftDelete = async (postId: string) => {
    const user = await getCurrentUser()

    setIsSaving(true)
    if (user) {
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: postId,
          }),
        })

        if (!response?.ok) {
          setError('Something happen when deleting post')
        }

        setIsSaving(false)
      } catch (err) {
        if (err instanceof Error) setError(err.message)
        setIsSaving(false)
      }
    }
  }

  return (
    <ul className="flex flex-col gap-5">
      {posts &&
        posts.map((post: any) => (
          <li key={post.id}>
            <p>Post id: {post.id}</p>
            <p>Post title: {post.title}</p>
            <p>Post date: {post.createdAt.toDateString()}</p>
          </li>
        ))}
    </ul>
  )
}
