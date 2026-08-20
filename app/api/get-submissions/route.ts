import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { hasInternalAccess } from '@/lib/api-auth'

export async function GET(request: Request) {
  if (!hasInternalAccess(request)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const submissionsPath = path.join(process.cwd(), 'submissions.json')
    
    try {
      const data = await fs.readFile(submissionsPath, 'utf-8')
      const submissions = JSON.parse(data || '[]')
      
      return NextResponse.json({
        success: true,
        submissions: submissions,
        count: submissions.length
      })
    } catch (error) {
      // File doesn't exist or is empty
      return NextResponse.json({
        success: true,
        submissions: [],
        count: 0
      })
    }
  } catch (error) {
    console.error('Error reading submissions:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to read submissions',
        submissions: [] 
      },
      { status: 500 }
    )
  }
}
