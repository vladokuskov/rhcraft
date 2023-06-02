import QueryProvider from '@/providers/QueryProvider'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <QueryProvider>{children}</QueryProvider>
}
