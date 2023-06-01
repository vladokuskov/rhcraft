import QueryProvider from '@/providers/QueryProvider'
import { SearchContextProvider } from '../context/search.context'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      <SearchContextProvider>{children}</SearchContextProvider>
    </QueryProvider>
  )
}
