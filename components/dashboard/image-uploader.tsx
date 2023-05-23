'use client'

import React, { ChangeEvent, RefObject } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import clsx from 'clsx'
import Image from 'next/image'
import { Button } from '../button'

interface ImageUploader {
  previewImageUrl: string | null
  setUploadedImage: React.Dispatch<React.SetStateAction<File | null>>
  setPreviewImageUrl: React.Dispatch<React.SetStateAction<string | null>>
  inputRef: RefObject<HTMLInputElement>
}

const ImageUploader = ({
  previewImageUrl,
  setUploadedImage,
  setPreviewImageUrl,
  inputRef,
}: ImageUploader) => {
  const handleImageDelete = () => {
    const result = window.confirm(
      'Are you sure you want to delete the image preview?',
    )
    if (result) {
      setUploadedImage(null)
      setPreviewImageUrl(null)
    }
  }

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImage = e.target.files[0]
      setUploadedImage(newImage)
      setPreviewImageUrl(URL.createObjectURL(newImage))
    }
  }

  return (
    <div className="flex flex-col gap-4 items-start justify-start">
      <div
        tabIndex={0}
        role="button"
        onClick={() => inputRef.current?.click()}
        title="Upload image"
        className={clsx(
          `text-white-100 p-4 inline-flex justify-start items-center font-sans border rounded border-neutral-600 border-dashed gap-4 cursor-pointer
          hover:text-neutral-300 transition-colors`,
          { 'border-hidden cursor-default !p-0 mt-2': previewImageUrl },
        )}
      >
        {!previewImageUrl ? (
          <span className="inline-flex justify-center items-center gap-4">
            Upload image
            <FontAwesomeIcon icon={faImage} />
          </span>
        ) : (
          <div className="rounded w-full h-full relative">
            <Image
              priority={true}
              width={500}
              height={300}
              src={previewImageUrl}
              alt="Image preview picture"
              className="h-full max-h-80 rounded object-cover"
            />
            <div className="rounded h-full w-full bg-neutral-500 opacity-70 absolute top-0 left-0 flex items-center justify-center text-opacity-100 text-6xl">
              <FontAwesomeIcon icon={faImage} />
            </div>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleImageInputChange}
        accept="image/png, image/jpeg, image/webp"
      />

      {previewImageUrl && (
        <Button
          size="sm2"
          className=" max-w-[7rem] h-10"
          variant="outlined"
          onClick={handleImageDelete}
          title={'Delete image'}
          isRequired={false}
          full={false}
        />
      )}
    </div>
  )
}

export { ImageUploader }
