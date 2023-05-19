'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../button'
import { useRouter } from 'next/navigation'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { postPatchSchema } from '@/lib/validations/post'
import EditorJS from '@editorjs/editorjs'
import { Post } from '@prisma/client'

const CreatePostForm = ({ post }: { post: Post }) => {
  const ref = useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [title, setTitle] = useState(post.title)

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const LinkTool = (await import('@editorjs/link')).default
    const List = (await import('@editorjs/list')).default

    const body = postPatchSchema.parse(post)

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          list: List,
          linkTool: LinkTool,
        },
      })
    }
  }, [post])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  const handlePostCreation = async (e: React.FormEvent) => {
    e.preventDefault()

    const blocks = await ref.current?.save()

    setIsSaving(true)

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: post.title,
          content: blocks,
        }),
      })

      setIsSaving(false)

      if (!response?.ok) {
      }
      router.refresh()
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      setIsSaving(false)
      console.log(err)
    }
  }

  //FIXME ERROR 500 when patching

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  if (!isMounted) {
    return null
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handlePostCreation}>
      <Button
        isRequired
        isDisabled={isSaving}
        isLoading={isSaving}
        icon={isSaving ? faSpinner : null}
        title={isSaving ? undefined : 'Save'}
        variant="primary"
        className=" w-[4rem] self-end h-12"
      />
      <input
        onChange={handleChange}
        maxLength={255}
        name="title"
        type="text"
        title="Post title"
        placeholder="Title"
        className=" font-inter font-medium text-white-100 text-3xl p-4 pl-0 bg-transparent focus:outline-none placeholder:text-neutral-600"
        disabled={isSaving}
        value={title}
      />
      <div id="editor" className="min-h-screen font-roboto" />
    </form>
  )
}

export { CreatePostForm }
