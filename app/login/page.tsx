import { AuthForm } from '@/components/auth-form'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'rhcraft - Login',
}

export default async function Login() {
  const user = await getCurrentUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div>
      <h3>Login to your account</h3>
      <AuthForm />
    </div>
  )
}
