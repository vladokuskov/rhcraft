'use client'

import React, { ChangeEvent, RefObject, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import Image from 'next/image'
import { Button } from '../button'
import {
  faCloudArrowUp,
  faImages,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons'

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
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files.length > 0) {
      const newImage = e.dataTransfer.files[0]
      setUploadedImage(newImage)
      setPreviewImageUrl(URL.createObjectURL(newImage))
    }
  }

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
          `text-white-100 p-4 inline-flex justify-start items-center font-sans border-2 rounded border-neutral-600 border-dashed gap-4 cursor-pointer
    hover:text-neutral-300 transition-colors`,
          { 'mt-2 !border-neutral-400 !p-2': previewImageUrl },
          { 'bg-neutral-600': isDragging },
        )}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewImageUrl ? (
          <div className="w-full h-full relative text-white-100 hover:text-neutral-300 focus:text-neutral-300 transition-colors rounded">
            <Image
              priority={true}
              width={600}
              height={300}
              src={previewImageUrl}
              alt="Image preview picture"
              className="h-full max-h-80 rounded object-cover"
            />
            <div className=" p-3 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex items-center justify-center gap-4 bg-neutral-400 bg-opacity-70 rounded">
              <span className="flex-col inline-flex justify-center items-center gap-2 leading-3 text-neutral-100">
                <FontAwesomeIcon icon={faCloudArrowUp} />
                <span>Drop your image or</span>
                <span className=" underline underline-offset-2">Browse</span>
              </span>
            </div>
          </div>
        ) : (
          <span className="flex-col inline-flex justify-center items-center gap-2 leading-3 ">
            <FontAwesomeIcon icon={faCloudArrowUp} />
            <span>Drop your image or</span>
            <span className=" underline underline-offset-2">Browse</span>
            <span className=" text-neutral-500 mt-3">JPG, PNG, WEBP</span>
          </span>
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
          className=" max-w-[8rem] h-10"
          variant="outlined"
          onClick={handleImageDelete}
          title={'Delete image'}
          isRequired={false}
          full={false}
          icon={faTrash}
        />
      )}
    </div>
  )
}

export { ImageUploader }
