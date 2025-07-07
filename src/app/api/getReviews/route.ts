import { NextResponse } from 'next/server'

export async function GET() {
  const uuid = process.env.NEXT_PUBLIC_UUID
  const res = await fetch(`https://surgetakehome.vercel.app/api/getreviews/${uuid}`)

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch highlights' }, { status: 500 })
  }

  const data = await res.json()
  return NextResponse.json(data)
}


