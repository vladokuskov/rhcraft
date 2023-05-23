'use client'

import { signOut } from 'next-auth/react'
import { Button } from '../button'

const SettingsSignOut = () => {
  return (
    <Button
      onClick={async () => {
        const result = window.confirm(
          'Are you sure you want to sign out from account?',
        )
        if (result) {
          signOut()
        }
      }}
      variant="outlined"
      status="danger"
      title="Sign Out"
    />
  )
}

export { SettingsSignOut }
