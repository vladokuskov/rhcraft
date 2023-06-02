'use client'

import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from './button'
import { Input } from './input'

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
          toast.error('Something happen, try again.')
        } else {
          router.refresh()

          setIsLoading(false)
        }
      } catch (err) {
        if (err instanceof Error) toast.error(err.message)
      }
    } else {
      toast.error('Please type email and password.')
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
        variant="outline"
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={handleEmailChange}
        disabled={isLoading}
        className="w-full font-medium"
        label="Email"
      />
      <Input
        title="Password"
        variant="outline"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        disabled={isLoading}
        className="w-full font-medium"
        label="Password"
      />

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
