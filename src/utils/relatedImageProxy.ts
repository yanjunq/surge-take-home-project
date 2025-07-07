class RelatedImageProxy {
  async fetchFirstImage(query: string) {
    try {
      const res = await fetch(`/api/getRelatedImage?q=${encodeURIComponent(query)}`)

      if (!res.ok) {
        throw new Error(`Failed to fetch image for "${query}"`)
      }
      const { imageUrl } = await res.json()
      return imageUrl
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Image fetch error:", err.message)
        throw err
      } else {
        console.error("Unknown image fetch error:", err)
        throw new Error("Unknown error occurred while fetching image")
      }
    }
  }
}

export default new RelatedImageProxy()
