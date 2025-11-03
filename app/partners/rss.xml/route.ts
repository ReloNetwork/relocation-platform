import { NextResponse } from 'next/server'

export async function GET() {
  // Redirect to main RSS feed
  return NextResponse.redirect(new URL('/rss.xml', 'https://therelonetwork.com'), 301)
}