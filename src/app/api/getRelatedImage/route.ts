import { NextRequest, NextResponse } from 'next/server'

const API_URL = 'https://api.openverse.org/v1/images/'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Missing query param `q`' }, { status: 400 })
  }

  try {
    const response = await fetch(`${API_URL}?q=${encodeURIComponent(query)}&page_size=1`)
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from Openverse' }, { status: 500 })
    }
    
    const data = await response.json()
    const firstImage = data?.results?.[0] ?? null
    const firstImageUrl = firstImage ? firstImage.url : null

    return NextResponse.json({ imageUrl: firstImageUrl })

  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
  }
}

