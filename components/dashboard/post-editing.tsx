'use client'

import '../../styles/editor.css'
import EditorJS from '@editorjs/editorjs'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Button } from '../button'
import { useRouter } from 'next/navigation'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { postPatchSchema } from '@/lib/validations/post'
import { Post } from '@prisma/client'
import { storage } from '@/lib/firebase'
import {
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from 'firebase/storage'
import { ImageUploader } from './image-uploader'

const PostEditing = ({ post }: { post: Post }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isPublishing, setIsPublishing] = useState<boolean>(false)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(
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

  const handlePostEditing = async (e: React.FormEvent) => {
    e.preventDefault()

    const blocks = await editorRef.current?.save()

    const imageURL = await handleImageUpload()

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

  const handleImageUpload = async () => {
    if (uploadedImage && !post.imageURL) {
      const storageRef = ref(storage, `blog/${post.id}/${uploadedImage.name}`)
      await uploadBytes(storageRef, uploadedImage)
      const downloadURL = await getDownloadURL(storageRef)
      if (downloadURL) {
        return downloadURL
      }
    } else if (uploadedImage && post.imageURL) {
      const storageRef = ref(storage, post.imageURL)
      await deleteObject(storageRef)
      await uploadBytes(storageRef, uploadedImage)
      const downloadURL = await getDownloadURL(storageRef)
      if (downloadURL) {
        return downloadURL
      }
    } else if (!uploadedImage && previewImageUrl && post.imageURL) {
      return post.imageURL
    } else if (!uploadedImage && !previewImageUrl && post.imageURL) {
      const storageRef = ref(storage, post.imageURL)

      await deleteObject(storageRef)

      setPreviewImageUrl(null)

      return null
    } else {
      return null
    }
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

<ImageUploader previewImageUrl={previewImageUrl} setUploadedImage={setUploadedImage} setPreviewImageUrl={setPreviewImageUrl} inputRef={inputRef}/>

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
        className=" w-full min-h-screen font-roboto flex items-start justify-start prose-h2:text-2xl prose-h2:font-roboto prose-h2:font-medium prose-div:!tracking-wider"
      />
    </form>
  )
}

export { PostEditing }
