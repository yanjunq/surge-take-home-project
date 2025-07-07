 import { type highlightPreview } from "@/stores/HighlightStore"

class HighlightStorageProxy {

  async getHighlights() {
    const res = await fetch('/api/getReviews')
    if (!res.ok) throw new Error("Failed to fetch highlights")
    return await res.json()
  }

  async createHighlight(highlightPreview: highlightPreview) {
    const res = await fetch('/api/postReview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ highlightPreview }),
    })
    if (!res.ok) throw new Error("Failed to create highlight")
    return await res.json()
  }
}

export default new HighlightStorageProxy()
