"use client"

import './page.css'

import { observer } from 'mobx-react-lite'
import { useEffect, useState, useRef } from 'react'
import { Header } from "@/components/header/Header"
import { highlightStore } from "@/stores/HighlightStore"
import { HighlightCard } from "@/components/highlight-card/HighlightCard"
import { Button } from '@/components/button/Button'
import { Dialog } from '@/components/dialog/Dialog'
import { useColumnCount } from '@/hooks/useColumnCount'
import classNames from 'classnames'

const Page = observer(() => {
  const { allHighlights, fetchHighlights } = highlightStore
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const lastHighlightRef = useRef<HTMLDivElement>(null)
  const columnCount = useColumnCount()

  useEffect(() => {
    fetchHighlights()
  }, [fetchHighlights])

  // Group highlights into columns
  const columns: typeof allHighlights[] = Array.from({ length: columnCount }, () => [])

  allHighlights.forEach((highlight, index) => {
    columns[index % columnCount].push(highlight)
  })

  const handleCreateClick = () => setIsDialogOpen(true)
  const handleDialogCancel = () => setIsDialogOpen(false)

  return (
    <div className={classNames('highlights-page', { 'dialog-open': isDialogOpen })}>
      <Header 
        subTitle="HIGHLIGHTS" 
        title="What are the special moments of your life?" 
        text="We believe every moment counts! Share your favorite highlights, unforgettable memories, and the stories that make your life shine."
      />

      <div className="highlight-cards-container">
        {columns.map((column, colIndex) => (
          <div className="highlight-column" key={colIndex}>
            {column.map((highlight, i) => (
              <div
                key={highlight.id}
                ref={
                  (colIndex * columnCount + i === allHighlights.length - 1)
                    ? lastHighlightRef
                    : null
                }
              >
                <HighlightCard highlight={highlight} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {!isDialogOpen && (
        <div className='create-button'>
          <Button onClick={handleCreateClick} isDefault={true}>Create +</Button>
        </div>
      )}

      {isDialogOpen && <Dialog onCancel={handleDialogCancel} lastHighlightRef={lastHighlightRef} />}
    </div>
  )
})

export default Page
