'use client'

import '../../styles/editor.css'
import EditorJS from '@editorjs/editorjs'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
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
  const [previewImage, setPreviewImage] = useState<File | null>(null)
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(
    post.imageURL,
  )

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
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                imgur: true,
              },
            },
          },
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

  const handlePostEditing = async (e: React.FormEvent) => {
    e.preventDefault()

    const blocks = await ref.current?.save()

    setIsSaving(true)

    const { imageURL, imageID } = await previewImageUpload()

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: blocks,
          imageURL: imageURL,
          imageID: imageID,
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
      } else {
        router.refresh()

        setIsPublishing(false)
      }
    } catch (err) {
      setIsPublishing(false)
    }
  }

  const previewImageUpload = async () => {
    const api_key = process.env.NEXT_PUBLIC_BUCKET_API_KEY
    const api_url = process.env.NEXT_PUBLIC_BUCKET_API

    if (previewImage && api_key && api_url) {
      try {
        const formData = new FormData()
        formData.append('file', previewImage)
        formData.append('upload_preset', 'ml_default')

        const timestamp = Math.round(new Date().getTime() / 1000)

        const signatureResponse = await fetch('/api/signature/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timestamp,
          }),
        })

        if (!signatureResponse.ok) {
          throw new Error('Failed to generate signature')
        }

        const signature = await signatureResponse.json()

        formData.append('timestamp', timestamp.toString())
        formData.append('api_key', api_key)
        formData.append('signature', signature)

        const uploadResponse = await fetch(api_url, {
          method: 'POST',
          body: formData,
        })

        if (uploadResponse.ok) {
          const data = await uploadResponse.json()
          const imageURL = data.secure_url as string
          const imageID = data.public_id as string

          return { imageURL, imageID }
        }
      } catch (error) {
        console.log(error)
      }
    }

    return { imageURL: post.imageURL, imageID: post.imageID }
  }

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImage = e.target.files[0]

      setPreviewImage(newImage)

      setPreviewImageURL(URL.createObjectURL(newImage))
    }
  }

  const handleImageDeleting = async () => {}

  if (!isMounted) {
    return null
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handlePostEditing}>
      <div className="flex items-center justify-end gap-2">
        <Button
          isRequired
          isDisabled={isSaving || title.length === 0 || title.length > 165}
          isLoading={isSaving}
          icon={isSaving ? faSpinner : null}
          title={isSaving ? undefined : 'Save'}
          variant="primary"
          className=" w-[4rem] h-12"
        />
        <Button
          isRequired
          onClick={handlePostPublishing}
          isDisabled={isPublishing || title.length === 0}
          isLoading={isPublishing}
          icon={isPublishing ? faSpinner : null}
          title={
            isPublishing ? undefined : post.published ? 'Unpublish' : 'Publish'
          }
          variant={post.published ? 'secondary' : 'service'}
          className="h-12"
        />
      </div>

      {previewImageURL?.length !== 0 && previewImageURL && (
        <img src={previewImageURL} />
      )}

      <input type="file" id="fileupload" onChange={handleImageInputChange} />

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

      <div
        id="editor"
        className=" w-full min-h-screen font-roboto flex items-start justify-start prose-h2:text-2xl prose-h2:font-roboto prose-h2:font-medium  prose-div:!tracking-wider"
      />
    </form>
  )
}

export { PostEditing }
