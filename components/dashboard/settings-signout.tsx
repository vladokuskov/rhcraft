'use client'

import { signOut } from 'next-auth/react'
import { Button } from '../button'

const SettingsSignOut = () => {
  const handleSignOut = async () => {
    const result = window.confirm(
      'Are you sure you want to sign out from account?',
    )
    if (result) {
      signOut()
    }
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      title="Sign Out"
      size="regular"
      className="font-bold"
    >
      Sign Out
    </Button>
  )
}

export { SettingsSignOut }
