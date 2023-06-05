'use client'

import { NavBar } from '@/components/navbar/navbar'
import { Container } from '@/components/container'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { Footer } from '@/components/footer'

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  return (
    <>
      {pathname !== '/login' && <NavBar />}
      <Container variant="page-content">{children}</Container>
      <Footer />
    </>
  )
}
