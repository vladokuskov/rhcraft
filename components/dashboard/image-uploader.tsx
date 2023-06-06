'use client'

import React, { ChangeEvent, useRef, useState } from 'react'

import { faCloudArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import Image from 'next/image'
import { Button } from '../button'
import { toast } from 'react-hot-toast'

interface ImageUploader {
  onChange: (file: File | null) => void
  initialImage?: string | null
}

const ImageUploader = ({ onChange, initialImage }: ImageUploader) => {
  const ref = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(
    initialImage ? initialImage : '',
  )

  const isSupportedFileType = (file: File) => {
    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp']
    return supportedTypes.includes(file.type)
  }

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
      const file = e.dataTransfer.files[0]

      if (!isSupportedFileType(file)) {
        toast.error(
          'Unsupported file type. Please select a JPG, PNG, or WEBP image.',
        )
        return
      } else {
        onChange(file)
        setPreviewImageUrl(URL.createObjectURL(file))
      }
    }
  }

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const fileInput = e.target

    if (!fileInput.files) {
      return
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      return
    }

    const file = fileInput.files[0]

    if (!isSupportedFileType(file)) {
      toast.error(
        'Unsupported file type. Please select a JPG, PNG, or WEBP image.',
      )
      return
    } else {
      onChange(file)
      setPreviewImageUrl(URL.createObjectURL(file))
    }
  }

  const handleImageDelete = () => {
    const result = window.confirm(
      'Are you sure you want to delete image from post?',
    )
    if (result) {
      onChange(null)
      setPreviewImageUrl(null)
    }
  }

  return (
    <div className="flex flex-col gap-4 items-start justify-start mt-8 w-full">
      <div
        tabIndex={0}
        role="button"
        onClick={() => ref.current?.click()}
        title="Upload image"
        className={clsx(
          `text-white-100 p-4 inline-flex justify-center items-center font-sans border-2 rounded border-neutral-600 border-dashed gap-4 cursor-pointer
    hover:text-neutral-300 transition-colors w-full max-sm:h-[16rem] h-[22rem]`,
          { 'mt-2 !border-neutral-400 !p-2': previewImageUrl },
          { 'bg-green-600 !border-green-400': isDragging },
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
              fill
              src={previewImageUrl}
              alt="Image preview picture"
              className=" rounded object-cover"
            />
            <div className=" p-3 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex items-center justify-center gap-4 bg-neutral-400 bg-opacity-70 rounded">
              <span className="flex-col inline-flex justify-center items-center gap-2 leading-3 text-neutral-100">
                <FontAwesomeIcon icon={faCloudArrowUp} className="text-3xl" />
                <span>Drop your image or</span>
                <span className=" font-bold">Browse</span>
              </span>
            </div>
          </div>
        ) : (
          <span className="flex-col inline-flex justify-center items-center gap-2 leading-3 ">
            <FontAwesomeIcon icon={faCloudArrowUp} className="text-3xl" />
            <span>Drop your image or</span>
            <span className=" font-bold">Browse</span>
            <span className=" text-neutral-500 mt-3">JPG, PNG, WEBP</span>
          </span>
        )}
      </div>

      <input
        type="file"
        ref={ref}
        className="hidden"
        onChange={handleImageSelect}
        accept="image/png, image/jpeg, image/webp"
      />

      {previewImageUrl && (
        <Button
          type="button"
          className=" max-w-[8rem] h-10 font-semibold"
          variant="outline"
          onClick={handleImageDelete}
          title={'Delete image'}
        >
          Delete image <FontAwesomeIcon icon={faTrash} />
        </Button>
      )}
    </div>
  )
}

export { ImageUploader }
