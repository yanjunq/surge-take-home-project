import './spinner.css'

import { useDelayedMount } from '@/hooks/useDelayedMount'
import classNames from 'classnames'

export interface SpinnerProps {
  className?: string
  delay?: number
  position?: 'absolute' | 'static'
}

export function Spinner({ className, delay = 600, position = 'absolute' }: SpinnerProps) {
  const { isVisible } = useDelayedMount(delay)
  return (
    <div  className={classNames(
        'spinner',
        `spinner-${position}`,
        { 'is-visible': isVisible },
        className
      )}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    </div>
  )
}