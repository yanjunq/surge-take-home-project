'use client'

import { makeAutoObservable, runInAction } from 'mobx'
import { Highlight } from '@/models/highlight'
import HighlightStorageProxy from '@/utils/highlightStorageProxy'
import relatedImageProxy from '@/utils/relatedImageProxy'

export class HighlightStore {
  highlights: Highlight[] = []

  constructor() {
    makeAutoObservable(this)
  }

  private enrichHighlightWithImage = async (highlight: Highlight) => {
    try {
      // TODO: Add a fallback of using highlight.location if highlight.title fail / or add a retry handler 
      const imageUrl = await relatedImageProxy.fetchFirstImage(highlight.title)
      return {
        ...highlight,
        imageUrl: imageUrl || null,
      }
    } catch {
      return {
        ...highlight,
        imageUrl: null,
      }
    }
  }
  
  fetchHighlights = async () => {
    try {
      const data = await HighlightStorageProxy.getHighlights()
      // Update image URL for each highlight 
      const updatedData = await Promise.all(
        data.map(this.enrichHighlightWithImage)
      )

      runInAction(() => {
        this.highlights = updatedData
      })
    } catch (err: unknown) {
      console.error('error', err)
    }
  }

  addHighlight = async (highlight: Highlight) => {
    try {
      await HighlightStorageProxy.createHighlight(highlight)
      const imageUrl = await relatedImageProxy.fetchFirstImage(highlight.title)

      const updatedHighlight = {
        ...highlight,
        imageUrl
      }

      runInAction(() => {
        this.highlights.push(updatedHighlight)
      })

    } catch (err: unknown) {
      console.error('Error adding highlight:', err)
    }
  }

  get allHighlights() {
    return this.highlights
  }
}

export const highlightStore = new HighlightStore()
