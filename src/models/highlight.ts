class Highlight {
  id: number
  description: string
  title: string
  location: string
  imageUrl?: string

  constructor(
    title: string,
    location: string,
    description: string,
    id: number,
    imageUrl?: string
  ) {
    this.id = id
    this.title = title
    this.location = location
    this.description = description
    if (imageUrl) this.imageUrl= imageUrl
  }
}

export { Highlight }
