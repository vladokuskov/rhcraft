'use client'

import { useState, useEffect } from 'react'

import ReactPlayer from 'react-player'

const Player = ({ url }: { url: string }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>

  return <ReactPlayer url={url} width="90%" height="20rem" controls />
}

export { Player }
