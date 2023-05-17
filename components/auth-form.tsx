'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      const logging = await signIn('credentials', {
        email: email.toLowerCase(),
        password: password,
        redirect: false,
      })

      if (logging?.error) {
        setError(logging.error)
      } else {
        router.push('/dashboard')
      }

      setIsLoading(false)
    } catch (err) {
      if (err instanceof Error) setError(err.message)
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
      {error && <p className="text-red-600">{error}</p>}
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
    </form>
  )
}

export { AuthForm }
