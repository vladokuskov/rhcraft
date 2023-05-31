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

const PostEditing = ({ post }: { post: Post }) => {
  const editorRef = useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isPublishing, setIsPublishing] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [title, setTitle] = useState(post.title)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(post.topic)

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    // @ts-ignore
    const LinkAutocomplete = (await import('@editorjs/link-autocomplete'))
      .default
    // @ts-ignore
    const YoutubeEmbed = (await import('editorjs-youtube-embed')).default
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
        },
      })
    }
  }, [post])

  const handlePostEditing = async (e: React.FormEvent) => {
    e.preventDefault()

    const blocks = await editorRef.current?.save()

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
          topic: selectedTopic,
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

      <p className="font-sans text-neutral-400 leading-3 mt-8 whitespace-nowrap">
        Last updated:
        {` ${post.updatedAt.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}`}
      </p>

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

      <TopicSelection
        selectedTopic={selectedTopic}
        handleTopicChange={handleTopicChange}
      />

      <div
        id="editor"
        className=" w-full min-h-screen font-roboto flex items-start justify-start prose-h2:text-2xl prose-h2:font-roboto prose-h2:font-medium prose-div:!tracking-wider"
      />
    </form>
  )
}

export { PostEditing }
