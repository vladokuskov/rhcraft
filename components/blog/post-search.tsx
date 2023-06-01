'use client'

import { ChangeEvent } from 'react'
import { Input } from '../input'
import { useSearchContext } from '@/app/context/search.context'

const PostSearch = () => {
  const { query, setQuery } = useSearchContext()

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div className="w-full">
      <Input
        variant="regular"
        value={query}
        placeholder="Search posts"
        className="w-full font-medium"
        onChange={handleValueChange}
        title="Search posts"
      />
    </div>
  )
}

export { PostSearch }
