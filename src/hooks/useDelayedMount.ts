import { useEffect, useRef, useState } from 'react'

export function useDelayedMount(delay: number) {
  const timeout = useRef<number | undefined>(undefined)
  const showOnMount = delay ? false : true
  const [isVisible, setIsVisible] = useState(showOnMount)

  useEffect(() => {
    timeout.current = window.setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timeout.current)
  }, [delay])

  return { isVisible }
}