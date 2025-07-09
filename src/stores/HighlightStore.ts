'use client'

import { makeAutoObservable, runInAction, observable } from 'mobx'
import { Highlight } from '@/models/highlight'
import HighlightStorageProxy from '@/utils/highlightStorageProxy'
import RelatedImageProxy from '@/utils/relatedImageProxy'

export type HighlightPreview = {
  title: string,
  location: string
  description: string,
}

export class HighlightStore {
  highlights: Highlight[] = []
  imageUrlMap: Map<number, string | undefined> = observable.map()
  
   constructor() {
    makeAutoObservable(this, {
      imageUrlMap: observable
    })
  }

  fetchImageUrlFor = async (highlight: Highlight) => {
    try {
      const imageUrl = await RelatedImageProxy.fetchFirstImage(highlight.title)
      runInAction(() => {
        this.imageUrlMap.set(highlight.id, imageUrl || undefined)
      })
    } catch {
      runInAction(() => {
        this.imageUrlMap.set(highlight.id, undefined)
      })
    }
  }

  fetchHighlights = async () => {
    try {
      const data = await HighlightStorageProxy.getHighlights()
      
      runInAction(() => {
        this.highlights = data
      })

      // Update image URL for each highlight 
      for (const highlight of data) {
        this.fetchImageUrlFor(highlight)
      }

    } catch (err: unknown) {
      console.error('error', err)
    }
  }
  
  addHighlight = async (highlightPreview: HighlightPreview) => {
    try {
      await HighlightStorageProxy.createHighlight(highlightPreview)
      
      const updatedHighlight: Highlight = {
        ...highlightPreview,
        // since we don't handle the delete of highlight object, just assume that the list is consistent 
        id: this.highlights.length + 1
      }

      runInAction(() => {
        this.highlights.push(updatedHighlight)
      })
      
      this.fetchImageUrlFor(updatedHighlight)

    } catch (err: unknown) {
      console.error('Error adding highlight:', err)
    }
  }

  get allHighlights() {
    return this.highlights
  }
}

export const highlightStore = new HighlightStore()
