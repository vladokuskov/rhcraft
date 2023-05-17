import { AuthForm } from '@/components/auth-form'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function Login() {
  const user = await getCurrentUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <>
      <p>Login page</p>
      <AuthForm />
    </>
  )
}
