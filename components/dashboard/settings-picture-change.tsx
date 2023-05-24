'use client'

import { User } from 'next-auth'
import { useRef, useState } from 'react'
import { Button } from '../button'
import {
  faCamera,
  faExclamationTriangle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { storage } from '@/lib/firebase'
import Image from 'next/image'

interface PictureChange {
  userImage: string | null | undefined
  user: User | null | undefined
}

const SettingsPictureChange = ({ userImage, user }: PictureChange) => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [previewImageUrl, setPreviewImageUrl] = useState<
    string | null | undefined
  >(userImage)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImage = e.target.files[0]
      setUploadedImage(newImage)
      setPreviewImageUrl(URL.createObjectURL(newImage))
    }
  }

  const getImageURL = async () => {
    if (user) {
      if (uploadedImage && !userImage) {
        const storageRef = ref(
          storage,
          `users/${user.id}/${uploadedImage.name}`,
        )
        await uploadBytes(storageRef, uploadedImage)
        const downloadURL = await getDownloadURL(storageRef)
        if (downloadURL) {
          return downloadURL
        }
      } else if (uploadedImage && userImage) {
        const storageRef = ref(storage, userImage)
        await deleteObject(storageRef)
        await uploadBytes(storageRef, uploadedImage)
        const downloadURL = await getDownloadURL(storageRef)
        if (downloadURL) {
          return downloadURL
        }
      } else if (!uploadedImage && previewImageUrl && userImage) {
        return userImage
      } else if (!uploadedImage && !previewImageUrl && userImage) {
        const storageRef = ref(storage, userImage)

        await deleteObject(storageRef)

        setPreviewImageUrl(null)

        return null
      } else {
        return null
      }
    }
  }

  const handleImageUpdate = async () => {
    setIsSaving(true)
    if (user) {
      try {
        const image = await getImageURL()

        const response = await fetch(`/api/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: image,
          }),
        })

        if (!response?.ok) {
          setError('Your picture was not updated. Please try again.')
          setIsSaving(false)
        } else {
          router.refresh()
          setIsSaving(false)
        }
      } catch (err) {
        if (err instanceof Error) setError(err.message)
        setIsSaving(false)
      }
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

      {error && (
        <div className=" inline-flex gap-2 text-red-500 justify-center items-center ">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <p className=" font-roboto font-medium">{error}</p>
        </div>
      )}

      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleImageUpload}
        accept="image/png, image/jpeg, image/webp"
      />

      <div className="flex items-center justify-start gap-4">
        <Button
          size="sm2"
          className=" max-w-[7rem] h-10"
          variant="primary"
          onClick={handleImageUpdate}
          title={isSaving ? undefined : 'Save'}
          isRequired={false}
          icon={isSaving ? faSpinner : null}
          isLoading={isSaving}
          full={false}
          isDisabled={isSaving}
        />
        {previewImageUrl && (
          <Button
            size="sm2"
            className=" max-w-[7rem] h-10"
            variant="outlined"
            onClick={handleImageDelete}
            title={'Delete picture'}
            isRequired={false}
            full={false}
          />
        )}
      </div>
    </div>
  )
}

export { SettingsPictureChange }
