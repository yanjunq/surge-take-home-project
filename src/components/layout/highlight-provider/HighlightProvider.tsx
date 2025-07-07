'use client';

import './highlight-provider.css'
import { observer } from 'mobx-react-lite'

type Props = {
  children: React.ReactNode;
};

export const HighlightProvider = observer(({ children }: Props) => {
  // const { fetchHighlights } = highlightStore
  //   useEffect(() => {
  //       fetchHighlights()
  // }, [])

  return (
    <div className='highlights-layout'>
      {children}
    </div>
  )
});