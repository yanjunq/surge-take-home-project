'use client';
import { useState, RefObject } from 'react'
import { Button } from '../button/Button'
import { highlightStore } from '@/stores/HighlightStore'

import './dialog.css'

type Props = {
  onCancel: () => void
  lastHighlightRef: RefObject<HTMLDivElement | null>
};

export function Dialog({ onCancel, lastHighlightRef }: Props) {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')

  const handleConfirm = () => {
    const trimmedTitle = title.trim()
    const trimmedLocation = location.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle || !trimmedLocation || !trimmedDescription) {
      alert('Please fill in all fields before submitting.')
      return
    }

    highlightStore.addHighlight({
      title: trimmedTitle,
      location: trimmedLocation,
      description: trimmedDescription
    })

    onCancel()

    setTimeout(() => {
      if(lastHighlightRef){
        lastHighlightRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  return (
    <div className="dialog">

      <div className='dialog-container'>
        <div className="dialog-header">
          <h2 className='dialog-title'>Create a highlight</h2>
          <button onClick={onCancel} className="dialog-close">×</button>
        </div>
        <div className='border' />
       <div className="dialog-form">
        <label>
          Highlight name <span className="required">*</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Location <span className="required">*</span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label>
          Description <span className="required">*</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </label>
      </div>

      <div className="dialog-actions">
        <Button onClick={onCancel} isDefault={false}>Cancel</Button>
        <Button onClick={handleConfirm} isDefault={true}>Confirm</Button>
      </div>
      </div>
    </div>
  );
}
