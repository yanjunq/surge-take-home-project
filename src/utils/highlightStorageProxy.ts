import { Highlight } from '@/models/highlight'

class HighlightStorageProxy {

  async getHighlights() {
    const res = await fetch('/api/getReviews')
    if (!res.ok) throw new Error("Failed to fetch highlights")
    return await res.json()
  }

  async createHighlight(highlight: Highlight) {
    console.log('check adding highlight', JSON.stringify({ highlight }))
    // const res = await fetch('/api/postReview', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ highlight }),
    // })
    // if (!res.ok) throw new Error("Failed to create highlight")
    // return await res.json()
  }
}

export default new HighlightStorageProxy()
