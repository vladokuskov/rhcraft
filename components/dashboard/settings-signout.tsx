'use client'

import { signOut } from 'next-auth/react'
import { Button } from '../button'

const SettingsSignOut = () => {
  return (
    <Button
      onClick={() => signOut()}
      variant="outlined"
      status="danger"
      title="Sign Out"
    />
  )
}

export { SettingsSignOut }
