'use client'

import { useEffect, useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'

const YoutubeVideoPlayer = ({ id }: { id: string }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return (
      <div className="rounded w-full h-[25rem] bg-neutral-700 animate-pulse"></div>
    )

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo()
  }

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '100%',

    playerVars: {
      autoplay: 0,
    },
  }

  return <YouTube videoId={id} opts={opts} onReady={onPlayerReady} />
}

export default YoutubeVideoPlayer
