'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface SearchContextType {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [query, setQuery] = useState<string>('')

  const contextValue: SearchContextType = {
    query,
    setQuery,
  }

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error(
      'useSearchContext must be used within a SearchContextProvider',
    )
  }
  return context
}
