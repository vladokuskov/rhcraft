'use client'

import { faCamera, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from '../button'

type SettingsPicture = {
  userImage: string
  userId: string
}

const SettingsPicture = ({ userImage, userId }: SettingsPicture) => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [previewImageUrl, setPreviewImageUrl] = useState<
    string | null | undefined
  >(userImage)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const handleImageUpdate = async () => {
    setIsSaving(true)

    try {
      const image = await getImageURL()

      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: image,
        }),
      })

      if (!response?.ok) {
        toast.error('Your picture was not updated. Please try again.')
        setIsSaving(false)
      } else {
        setIsSaving(false)

        toast.success('Changes successfully saved.')

        router.refresh()
      }
    } catch (err) {
      if (err instanceof Error) toast.error(err.message)
      setIsSaving(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImage = e.target.files[0]
      setUploadedImage(newImage)
      setPreviewImageUrl(URL.createObjectURL(newImage))
    }
  }

  const getImageURL = async () => {
    if (uploadedImage && !userImage && userId) {
      try {
        const formData = new FormData()
        formData.append('file', uploadedImage)
        formData.append('userId', userId)

        const res = await fetch('/api/users/media/upload', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          toast.error('An error ocurred while uploading image.')
          return
        }

        const data: { imageURL: string } = await res.json()

        return data.imageURL
      } catch (err) {
        toast.error('An error ocurred while uploading image.')
      }
    } else if (uploadedImage && userImage && userId) {
      try {
        const deleted = await deleteImage(userImage)

        if (deleted) {
          const formData = new FormData()
          formData.append('file', uploadedImage)
          formData.append('userId', userId)

          const res = await fetch('/api/users/media/upload', {
            method: 'POST',
            body: formData,
          })

          if (!res.ok) {
            toast.error('An error ocurred while uploading image.')

            return
          }

          const data: { imageURL: string } = await res.json()

          return data.imageURL
        } else {
          return userImage
        }
      } catch (err) {
        toast.error('An error ocurred while uploading image.')
      }
    } else if (!uploadedImage && previewImageUrl && userImage) {
      setPreviewImageUrl(userImage)
      return userImage
    } else if (!uploadedImage && !previewImageUrl && userImage) {
      const deleted = await deleteImage(userImage)

      if (deleted) {
        return null
      } else {
        setPreviewImageUrl(userImage)
        return userImage
      }
    }
  }

  const deleteImage = async (url: string) => {
    const imageUrl = new URL(url)
    const key = imageUrl.pathname.split('/').pop()

    if (key) {
      const res = await fetch(`/api/users/media/delete/${key}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        toast.error('An error ocurred while deleting image.')
        return false
      }

      return true
    }
  }

  const handleImageDelete = () => {
    const result = window.confirm(
      'Are you sure you want to delete profile picture?',
    )
    if (result) {
      setUploadedImage(null)
      setPreviewImageUrl(null)
    }
  }

  return (
    <div className="w-full flex flex-col gap-6 py-6 px-4 border border-neutral-600 rounded">
      <div>
        <h3 className="font-sans text-white font-semibold text-xl leading-4">
          Profile picture
        </h3>
        <p className="font-sans text-neutral-500 font-semibold tracking-wide">
          Here you can change your profile picture
        </p>
      </div>

      <div
        tabIndex={0}
        role="button"
        onClick={() => inputRef.current?.click()}
        title="Upload profile picture"
        className=" w-20 h-20  border-2 border-inherit border-neutral-300 border-opacity-70"
      >
        {previewImageUrl ? (
          <div className="w-full h-full relative text-white-100 hover:text-neutral-300 focus:text-neutral-300 transition-colors">
            <Image
              src={previewImageUrl}
              width={50}
              height={50}
              alt="Profile picture"
              className=" object-cover w-full h-full"
            />
            <div className="w-full absolute bottom-0 left-0 flex items-center justify-center p-1 bg-neutral-400 bg-opacity-60">
              <FontAwesomeIcon icon={faCamera} />
            </div>
          </div>
        ) : (
          <div className="bg-neutral-500 w-full h-full flex items-center justify-center text-white-100 hover:text-neutral-300 focus:text-neutral-300 transition-colors text-3xl">
            <FontAwesomeIcon icon={faCamera} />
          </div>
        )}
      </div>

      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleImageUpload}
        accept="image/png, image/jpeg, image/webp"
      />

      <div className="flex items-center justify-start gap-4">
        <Button
          type="button"
          className="max-w-[4rem] font-semibold h-10 w-14"
          variant="regular"
          onClick={handleImageUpdate}
          title={isSaving ? undefined : 'Save'}
          disabled={isSaving}
        >
          {isSaving ? (
            <FontAwesomeIcon icon={faSpinner} className=" animate-spin" />
          ) : (
            'Save'
          )}
        </Button>

        {previewImageUrl && (
          <Button
            type="button"
            className=" max-w-[7rem] h-10 font-semibold"
            variant="outline"
            onClick={handleImageDelete}
            title={'Delete picture'}
          >
            Delete picture
          </Button>
        )}
      </div>
    </div>
  )
}

export { SettingsPicture }
