'use client'

import { useState } from 'react'
import { signIn, signOut } from 'next-auth/react'

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      await signIn('credentials', {
        email: email.toLowerCase(),
        password: password,
        redirect: false,
      })

      setIsLoading(false)
    } catch (err: any) {
      console.error('Error:', err)
      window.alert('An error occurred. Please try again.')
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <form className="flex flex-col gap-3 w-40" onSubmit={handleSubmit}>
      <input
        className="text-cyan-800"
        value={email}
        onChange={handleEmailChange}
        placeholder="name@example.com"
        type="email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        disabled={isLoading}
      />
      <input
        className="text-cyan-800"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder=""
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect="off"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading' : 'Login'}
      </button>
      <button type="button" disabled={isLoading} onClick={() => signOut()}>
        Sign out
      </button>
    </form>
  )
}

export { AuthForm }
