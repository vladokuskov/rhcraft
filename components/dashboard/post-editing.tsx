'use client'

import '../../styles/editor.css'
import EditorJS from '@editorjs/editorjs'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../button'
import { useRouter } from 'next/navigation'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { postPatchSchema } from '@/lib/validations/post'
import { Post } from '@prisma/client'
import { TopicSelection } from './topic-selection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ImageUploader } from './image-uploader'

const PostEditing = ({ post }: { post: Post }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isPublishing, setIsPublishing] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [title, setTitle] = useState(post.title)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(post.topic)
  const [uploadedImage, setUploadedImage] = useState<any | null>(null)

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(
    post.imageURL,
  )

  const lastUpdatedDate = post.updatedAt.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    // @ts-ignore
    const LinkAutocomplete = (await import('@editorjs/link-autocomplete'))
      .default
    // @ts-ignore
    const YoutubeEmbed = (await import('editorjs-youtube-embed')).default
    // @ts-ignore
    const List = (await import('@editorjs/list')).default
    const body = postPatchSchema.parse(post)

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          editorRef.current = editor
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          link: {
            class: LinkAutocomplete,
            config: {
              endpoint: 'https://rhcraft.vercel.app/',
              queryParam: 'search',
            },
          },
          youtubeEmbed: YoutubeEmbed,
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered',
            },
          },
        },
      })
    }
  }, [post])

  const handlePostEditing = async (e: React.FormEvent) => {
    e.preventDefault()

    const blocks = await editorRef.current?.save()

    setIsSaving(true)

    try {
      const imageURL = await getImageURL()

      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: blocks,
          topic: selectedTopic,
          imageURL: imageURL,
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

  const getImageURL = async () => {
    if (uploadedImage && !post.imageURL && post.authorId) {
      try {
        const formData = new FormData()
        formData.append('file', uploadedImage)
        formData.append('authorId', post.authorId)

        const res = await fetch('/api/posts/media/upload', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          console.error('Something went wrong, check your console.')
          return
        }

        const data: { imageURL: string } = await res.json()

        return data.imageURL
      } catch (err) {
        console.error(err)
      }
    } else if (uploadedImage && post.imageURL && post.authorId) {
      const deleted = await deleteImage(post.imageURL)

      if (deleted) {
        const formData = new FormData()
        formData.append('file', uploadedImage)
        formData.append('authorId', post.authorId)

        const res = await fetch('/api/posts/media/upload', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          console.error('Something went wrong, check your console.')
          return
        }

        const data: { imageURL: string } = await res.json()

        return data.imageURL
      } else {
        return post.imageURL
      }
    } else if (!uploadedImage && previewImageUrl && post.imageURL) {
      return post.imageURL
    } else if (!uploadedImage && !previewImageUrl && post.imageURL) {
      const deleted = await deleteImage(post.imageURL)

      if (deleted) {
        return null
      } else {
        return post.imageURL
      }
    }
  }

  const deleteImage = async (url: string) => {
    const imageUrl = new URL(url)
    const key = imageUrl.pathname.split('/').pop()

    if (key) {
      const res = await fetch(`/api/posts/media/delete/${key}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        console.error('Something went wrong.')
        return false
      }

      return true
    }
  }

  const handleTopicChange = (e: 'News' | 'Story' | 'Puzzle') => {
    setSelectedTopic(e)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        editorRef.current?.destroy()
        editorRef.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  if (!isMounted) {
    return null
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handlePostEditing}>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="regular"
          title="Save"
          size="regular"
          className=" w-[4rem] h-12 font-semibold"
          disabled={isSaving || title.length === 0 || title.length > 165}
        >
          {isSaving ? (
            <FontAwesomeIcon icon={faSpinner} className=" animate-spin" />
          ) : (
            'Save'
          )}
        </Button>
        <Button
          type="button"
          variant={post.published ? 'outline' : 'service'}
          title={post.published ? 'Un publish' : 'Publish'}
          size="regular"
          className=" w-[6rem] h-12 font-semibold"
          disabled={isPublishing}
          onClick={handlePostPublishing}
        >
          {isPublishing ? (
            <FontAwesomeIcon icon={faSpinner} className=" animate-spin" />
          ) : post.published ? (
            'Unpublish'
          ) : (
            'Publish'
          )}
        </Button>
      </div>

      <ImageUploader
        previewImageUrl={previewImageUrl}
        setUploadedImage={setUploadedImage}
        setPreviewImageUrl={setPreviewImageUrl}
        inputRef={inputRef}
      />

      <TopicSelection
        selectedTopic={selectedTopic}
        handleTopicChange={handleTopicChange}
      />

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

      <p className="font-sans text-neutral-400 leading-3 mb-2 whitespace-nowrap">
        Last updated:
        {` ${lastUpdatedDate}`}
      </p>

      <div
        id="editor"
        className=" w-full min-h-screen font-roboto flex items-start justify-start prose-h2:text-2xl prose-h2:font-roboto prose-h2:font-medium prose-div:!tracking-wider"
      />
    </form>
  )
}

export { PostEditing }
