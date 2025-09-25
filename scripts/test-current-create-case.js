const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.vercel' })

async function testCurrentCreateCase() {
  console.log('🧪 Testing current create-case functionality...')
  
  try {
    // Test the exact form submission using a POST request to the create-case page
    const formData = new URLSearchParams({
      'full_name': 'Test User 2024',
      'email': 'test2024@example.com',
      'phone': '+44 123 456 789',
      'origin_city': 'Singapore',
      'destination_city': 'Shoreditch',
      'target_date': '2025-02-15'
    })

    console.log('📤 Submitting create-case form...')
    
    const response = await fetch('http://localhost:3000/create-case', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      redirect: 'manual' // Don't follow redirects so we can see what happens
    })

    console.log('📥 Response status:', response.status)
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()))
    
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location')
      console.log('✅ Redirect to:', location)
      
      if (location && location.includes('/case/')) {
        console.log('🎉 Success! Form submitted and redirected to case dashboard')
        
        // Extract case ID from redirect location
        const caseIdMatch = location.match(/\/case\/([^\/]+)/)
        if (caseIdMatch) {
          const caseId = caseIdMatch[1]
          console.log('📋 Case ID:', caseId)
          
          // Test accessing the case dashboard
          console.log('🔍 Testing case dashboard access...')
          const dashboardResponse = await fetch(`http://localhost:3000/case/${caseId}`)
          console.log('📊 Dashboard status:', dashboardResponse.status)
          
          if (dashboardResponse.status === 200) {
            const dashboardHtml = await dashboardResponse.text()
            if (dashboardHtml.includes('Relocation Case Dashboard')) {
              console.log('✅ Case dashboard loads successfully')
            } else {
              console.log('❌ Case dashboard content not found')
            }
          }
        }
      } else {
        console.log('❌ Unexpected redirect location')
      }
    } else if (response.status >= 400) {
      const errorText = await response.text()
      console.log('❌ Error response:', errorText.substring(0, 500))
    } else {
      console.log('❓ Unexpected response status')
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testCurrentCreateCase()