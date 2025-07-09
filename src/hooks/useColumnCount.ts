import { useEffect, useState } from 'react'

const getColumnCount = () => {
  if (window.matchMedia('(min-width: 1280px)').matches) return 4
  if (window.matchMedia('(min-width: 768px)').matches) return 2
  return 1
}

export function useColumnCount() {
  const [count, setCount] = useState(getColumnCount())

  useEffect(() => {
    const handler = () => setCount(getColumnCount())
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return count
}