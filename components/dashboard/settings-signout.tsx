'use client'

import { signOut } from 'next-auth/react'

const SettingsSignOut = () => {
  return (
    <button
      className=" bg-slate-400 text-white-500 p-2 rounded-sm"
      type="button"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  )
}

export { SettingsSignOut }
