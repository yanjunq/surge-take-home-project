import { useEffect, useState } from 'react'

export function useColumnCount() {
  const [count, setCount] = useState(1) 

  useEffect(() => {
    const getColumnCount = () => {
      if (window.matchMedia('(min-width: 1280px)').matches) return 4
      if (window.matchMedia('(min-width: 768px)').matches) return 2
      return 1
    }

    const handler = () => setCount(getColumnCount())
    handler()

    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return count
}