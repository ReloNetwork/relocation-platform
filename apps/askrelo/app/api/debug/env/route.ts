import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const env = {
    STRIPE_SECRET_KEY_EXISTS: !!process.env.STRIPE_SECRET_KEY,
    STRIPE_SECRET_KEY_LENGTH: process.env.STRIPE_SECRET_KEY?.length || 0,
    STRIPE_SECRET_KEY_PREFIX: process.env.STRIPE_SECRET_KEY?.substring(0, 10) || 'none',
    STRIPE_WEBHOOK_SECRET_EXISTS: !!process.env.STRIPE_WEBHOOK_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  }

  console.log('Environment debug info:', env)

  return NextResponse.json(env)
}