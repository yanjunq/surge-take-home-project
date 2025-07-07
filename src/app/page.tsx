"use client"

import './page.css'

import { observer } from 'mobx-react-lite'
import { useEffect, useState, useRef } from 'react'
import { Header } from "@/components/header/Header"
import { highlightStore } from "@/stores/HighlightStore"
import { HighlightCard } from "@/components/highlight/highlight-card/HighlightCard"
import { Button } from '@/components/button/Button'
import { Dialog } from '@/components/dialog/Dialog'
import classNames from 'classnames'

const Page = observer(() => {

  const { allHighlights, imageUrlMap, fetchHighlights } = highlightStore
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
      <Header subTitle="test" title="test" text="test" />
      <div className="highlight-cards-container">
        {allHighlights.map((highlight, index) => (
          <div key={highlight.id}  ref={index === allHighlights.length - 1 ?  lastHighlightRef : null}>
            <HighlightCard highlight={highlight} />
          </div>
        ))}
      </div>
      <Button onClick={handleCreateClick} isDefault={true}>+ Create</Button>
      {isDialogOpen && <Dialog onCancel={handleDialogCancel} lastHighlightRef={lastHighlightRef} />}
    </div>
  )
})

export default Page
