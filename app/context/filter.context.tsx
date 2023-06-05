'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface FilterContextType {
  date: Date | null
  setDate: React.Dispatch<React.SetStateAction<Date | null>>
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [date, setDate] = useState<Date | null>(null)

  const contextValue: FilterContextType = {
    date,
    setDate,
  }

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error(
      'useFilterContext must be used within a FilterContextProvider',
    )
  }
  return context
}
