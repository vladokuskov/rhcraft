'use client'

import '../../styles/editor.css'
import EditorJS from '@editorjs/editorjs'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../button'
import { useRouter } from 'next/navigation'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { postPatchSchema } from '@/lib/validations/post'
import { Post } from '@prisma/client'

const PostEditing = ({ post }: { post: Post }) => {
  const ref = useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isPublishing, setIsPublishing] = useState<boolean>(false)

  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [title, setTitle] = useState(post.title)

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    // @ts-ignore
    const LinkTool = (await import('@editorjs/link')).default
    // @ts-ignore
    const List = (await import('@editorjs/list')).default
    // @ts-ignore
    const CheckList = (await import('@editorjs/checklist')).default
    // @ts-ignore
    const Embed = (await import('@editorjs/embed')).default

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
          checklist: CheckList,
          embed: Embed,
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
          title: title,
          content: blocks,
        }),
      })

      setIsSaving(false)

      if (!response?.ok) {
      }

      router.refresh()
    } catch (err) {
      setIsSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handlePostPublishing = async () => {
    setIsPublishing(true)

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !post.published,
        }),
      })

      if (!response.ok) {
        setIsPublishing(false)
      }

      setIsPublishing(false)

      router.refresh()
    } catch (err) {
      setIsPublishing(false)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handlePostCreation}>
      <div className="flex items-center justify-end gap-2">
        <Button
          isRequired
          isDisabled={isSaving}
          isLoading={isSaving}
          icon={isSaving ? faSpinner : null}
          title={isSaving ? undefined : 'Save'}
          variant="primary"
          className=" w-[4rem] h-12"
        />
        <Button
          isRequired
          onClick={handlePostPublishing}
          isDisabled={isPublishing}
          isLoading={isPublishing}
          icon={isPublishing ? faSpinner : null}
          title={
            isPublishing ? undefined : post.published ? 'Unpublish' : 'Publish'
          }
          variant={post.published ? 'secondary' : 'service'}
          className="h-12"
        />
      </div>

      <input
        onChange={handleChange}
        maxLength={165}
        name="title"
        type="text"
        title="Post title"
        placeholder="Title"
        className=" font-inter font-medium text-white-100 text-3xl p-4 pl-0 bg-transparent focus:outline-none placeholder:text-neutral-600"
        disabled={isSaving}
        value={title}
      />
      <div id="editor" className=" w-full min-h-screen font-roboto" />
    </form>
  )
}

export { PostEditing }
