'use client'

import Image from 'next/image'

const SettingsPicture = ({ userImage }: { userImage: string }) => {
  return (
    <div className="w-full flex flex-col gap-6 py-6 px-4 border border-neutral-600 rounded">
      <div>
        <h3 className="font-sans text-white font-semibold text-xl leading-4">
          Profile picture
        </h3>
      </div>

      <div className=" w-20 h-20  border-2 border-inherit border-neutral-300 border-opacity-70">
        {
          <Image
            src={userImage}
            width={50}
            height={50}
            alt="Profile picture"
            className=" object-cover w-full h-full"
          />
        }
      </div>
    </div>
  )
}

export { SettingsPicture }
