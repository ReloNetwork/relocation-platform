import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  
  console.log('DEBUG: Callback hit!', {
    url: request.url,
    origin,
    searchParams: Object.fromEntries(searchParams.entries())
  })
  
  return NextResponse.json({
    message: 'Debug callback working!',
    url: request.url,
    searchParams: Object.fromEntries(searchParams.entries())
  })
}