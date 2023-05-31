'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from './button'
import {
  faExclamationTriangle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from './input'

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (email.length !== 0 && password.length !== 0) {
      try {
        setIsLoading(true)

        const logging = await signIn('credentials', {
          email: email.toLowerCase(),
          password: password,
          redirect: false,
        })

        if (logging?.error) {
          await new Promise((resolve) => {
            router.refresh()
            setTimeout(resolve, 100)
          })
          setIsLoading(false)
        } else {
          router.refresh()

          setIsLoading(false)
        }
      } catch (err) {
        if (err instanceof Error) setError(err.message)
      }
    } else {
      setError('Please type email and password')
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <form
      className="flex flex-col gap-3 max-w-xs mx-auto my-0"
      onSubmit={handleSubmit}
    >
      <Input
        title="Email"
        variant="outlined"
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={handleEmailChange}
        isDisabled={isLoading}
        full
        label="Email"
      />
      <Input
        title="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        isDisabled={isLoading}
        full
        label="Password"
      />
      {error && (
        <div className=" inline-flex gap-2 text-red-500 justify-center items-center ">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <p className=" font-roboto font-medium">{error}</p>
        </div>
      )}

      <Button
        variant="service"
        title="Login"
        size="regular"
        className="w-20 font-semibold h-10 self-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} className=" animate-spin" />
        ) : (
          'Login'
        )}
      </Button>
    </form>
  )
}

export { AuthForm }
