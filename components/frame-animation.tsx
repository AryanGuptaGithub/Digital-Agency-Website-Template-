// components/frame-animation.tsx
'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useScroll } from 'framer-motion'

interface FrameAnimationProps {
  folder: 'frames-1' | 'frames-2'
  scrollHeight?: string   // how tall the scroll zone is, e.g. '500vh'
  className?: string
}

const PRELOAD_AHEAD = 15

export default function FrameAnimation({
  folder,
  scrollHeight = '400vh',
  className = '',
}: FrameAnimationProps) {
  const [frames, setFrames] = useState<string[]>([])
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Fetch URLs from your API route
  useEffect(() => {
    fetch(`/api/frames?folder=${folder}`)
      .then((r) => r.json())
      .then((data) => {
        setFrames(data.urls)
        // Preload the first 20 frames immediately on mount
        data.urls.slice(0, 20).forEach((url: string) => {
          const img = new Image()
          img.src = url
        })
        setIsLoaded(true)
      })
  }, [folder])

  // Scroll → frame index
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const index = Math.min(
        Math.floor(progress * frames.length),
        frames.length - 1
      )
      setCurrentFrame(index)
    })
    return unsubscribe
  }, [scrollYProgress, frames.length])

  // Sliding preload window — always stay ahead of the scroll
  useEffect(() => {
    if (!frames.length) return
    const end = Math.min(currentFrame + PRELOAD_AHEAD, frames.length - 1)
    for (let i = currentFrame; i <= end; i++) {
      const img = new Image()
      img.src = frames[i]
    }
  }, [currentFrame, frames])

  return (
    <div ref={containerRef} style={{ height: scrollHeight, position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh' }}>
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <span className="text-white text-sm opacity-50">Loading...</span>
          </div>
        )}
        {frames.length > 0 && (
          <img
            ref={imageRef}
            src={frames[currentFrame]}
            alt=""
            className={className}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
      </div>
    </div>
  )
}