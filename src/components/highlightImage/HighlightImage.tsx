

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Spinner } from '@/components/spinner/Spinner'

type Props = {
 imageUrl?: string
}

export function HighlightImage(props: Props) {
  const { imageUrl } = props
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
  const [isValid, setIsValid] = useState<boolean>(true)

  useEffect(() => {
    if (!imageUrl) {
      setIsValid(false)
      setIsImageLoaded(true)
    }
  }, [imageUrl])

  const handleImageError = () => {
    setIsValid(false)
    setIsImageLoaded(true)
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  return (
    <div className='highlight-image'>
      {!isImageLoaded && (
        <div className='loading-icon-wrapper'>
          <Spinner className='loadingIcon' delay={200} />
        </div>
      )}
      {isValid ? (
        <motion.img
          alt='Highlight Image'
          animate={{ opacity: 1 }}
          aria-label='highlight-image'
          initial={{ opacity: 0 }}
          src={imageUrl}
          transition={{ duration: 0.5 }}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      ) : (
        <div aria-label={'fallback-icon'} className='fallback-icon' role='img'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </div>
      )}
    </div>
  )
}