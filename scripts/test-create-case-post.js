const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.vercel' })

async function testCreateCasePost() {
  console.log('🧪 Testing create-case POST request...')
  
  try {
    const response = await fetch('http://localhost:3000/create-case', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'full_name': 'Test User Debug',
        'email': 'debug@example.com',
        'phone': '+44 123 456 789',
        'origin_city': 'Singapore',
        'destination_city': 'Shoreditch',
        'target_date': '2025-02-15'
      }).toString(),
      redirect: 'manual'
    })

    console.log('Status:', response.status)
    
    if (response.status === 200) {
      const html = await response.text()
      console.log('Response is HTML (form page again)')
      
      // Check if there's an error in the HTML
      if (html.includes('Client creation failed')) {
        console.log('❌ Found "Client creation failed" error in HTML response')
        
        // Extract the error from HTML
        const errorMatch = html.match(/Client creation failed: ([^<]+)/)
        if (errorMatch) {
          console.log('Error details:', errorMatch[1])
        }
      } else if (html.includes('Unhandled Runtime Error')) {
        console.log('❌ Found "Unhandled Runtime Error" in HTML response')
        
        // Extract the error
        const errorMatch = html.match(/Error: ([^<]+)/)
        if (errorMatch) {
          console.log('Error details:', errorMatch[1])
        }
      } else if (html.includes('Start Your London Relocation')) {
        console.log('✅ Form page loaded normally (no error visible)')
      } else {
        console.log('❓ Unknown response content')
      }
    } else if (response.status >= 300 && response.status < 400) {
      console.log('✅ Redirect:', response.headers.get('location'))
    } else {
      console.log('❌ Error status:', response.status)
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testCreateCasePost()