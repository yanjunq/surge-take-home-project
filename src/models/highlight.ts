class Highlight {
  id: number
  description: string
  title: string
  location: string

  constructor(
    title: string,
    location: string,
    description: string,
    id: number,
  ) {
    this.id = id
    this.title = title
    this.location = location
    this.description = description
  }
}

export { Highlight }
