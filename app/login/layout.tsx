import { Container } from '@/components/container'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container variant="page">
      <Container variant="page-content">{children}</Container>
    </Container>
  )
}
