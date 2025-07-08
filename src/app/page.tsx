"use client"

import './page.css'

import { observer } from 'mobx-react-lite'
import { useEffect, useState, useRef } from 'react'
import { Header } from "@/components/header/Header"
import { highlightStore } from "@/stores/HighlightStore"
import { HighlightCard } from "@/components/highlight-card/HighlightCard"
import { Button } from '@/components/button/Button'
import { Dialog } from '@/components/dialog/Dialog'
import classNames from 'classnames'

const Page = observer(() => {

  const { allHighlights, fetchHighlights } = highlightStore
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const lastHighlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
        fetchHighlights()
        console.log('check allHighlights', allHighlights)
  }, [])

  const handleCreateClick = () => {
    setIsDialogOpen(true)
  }

  const handleDialogCancel = () => {
    setIsDialogOpen(false)
  }

  return (
    <div className={classNames('highlights-page', { 'dialog-open': isDialogOpen })}>
      <Header 
        subTitle="HIGHLIGHTS" 
        title="What are the special moments of your life?" 
        text="We believe every moment counts! Share your favorite highlights, unforgettable memories, and the stories that make your life shine."
       />

      <div className="highlight-cards-container">
        {allHighlights.map((highlight, index) => (
          <div key={highlight.id}  ref={index === allHighlights.length - 1 ?  lastHighlightRef : null}>
            <HighlightCard highlight={highlight} />
          </div>
        ))}
      </div>

      {!isDialogOpen && (  <div className='create-button'>
        <Button onClick={handleCreateClick} isDefault={true}>Create +</Button>
      </div>)}

      {isDialogOpen && <Dialog onCancel={handleDialogCancel} lastHighlightRef={lastHighlightRef} />}
    </div>
  )
})

export default Page
