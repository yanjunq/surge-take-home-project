import { NextResponse } from 'next/server'

const BASE_URL = 'https://surgetakehome.vercel.app/api'
const UUID = process.env.NEXT_PUBLIC_UUID

export async function GET() {
  const res = await fetch(`${BASE_URL}/getreviews/${UUID}`)

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch highlights' }, { status: 500 })
  }

  const data = await res.json()
  return NextResponse.json(data)
}


