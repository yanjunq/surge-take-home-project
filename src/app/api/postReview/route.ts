import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = 'https://surgetakehome.vercel.app/api'
const UUID = process.env.NEXT_PUBLIC_UUID

export async function POST(req: NextRequest) {
  const body = await req.json()
  const res = await fetch(`${BASE_URL}/postreview/${UUID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
       ...body.highlightPreview
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to post review' }, { status: 500 })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
