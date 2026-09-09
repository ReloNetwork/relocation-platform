import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.redirect(new URL('/rss.xml', 'https://www.therelonetwork.com'), 308)
}
