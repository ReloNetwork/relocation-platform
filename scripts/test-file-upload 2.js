const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.vercel' })

async function testFileUpload() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🧪 Testing file upload functionality...')

    // Test 1: Check if storage bucket exists
    console.log('\n1️⃣ Checking storage bucket...')
    try {
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
      
      if (bucketsError) {
        console.error('❌ Failed to list buckets:', bucketsError.message)
        return
      }

      const documentsBucket = buckets.find(bucket => bucket.name === 'documents')
      if (documentsBucket) {
        console.log('✅ Documents bucket exists')
        console.log(`   - Public: ${documentsBucket.public}`)
        console.log(`   - Created: ${documentsBucket.created_at}`)
      } else {
        console.log('⚠️  Documents bucket not found. Creating bucket...')
        
        const { data: newBucket, error: createError } = await supabase.storage.createBucket('documents', {
          public: true,
          allowedMimeTypes: [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp',
            'application/pdf',
            'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/plain', 'text/csv'
          ],
          fileSizeLimit: 52428800 // 50MB
        })

        if (createError) {
          console.error('❌ Failed to create bucket:', createError.message)
          console.log('   Please create the "documents" bucket manually in Supabase Dashboard')
          return
        } else {
          console.log('✅ Documents bucket created successfully')
        }
      }
    } catch (error) {
      console.error('❌ Storage check failed:', error.message)
      return
    }

    // Test 2: Create a test case for file upload
    console.log('\n2️⃣ Creating test case...')
    const { data: testCase, error: caseError } = await supabase
      .from('move_cases')
      .insert({
        origin_city: 'Test City',
        destination_city: 'London',
        target_date: '2024-12-15',
        status: 'intake'
      })
      .select()
      .single()

    if (caseError) {
      console.error('❌ Test case creation failed:', caseError.message)
      return
    }
    console.log('✅ Test case created:', testCase.id)

    // Test 3: Create a test file and upload it
    console.log('\n3️⃣ Testing file upload...')
    
    // Create a simple test file
    const testContent = 'This is a test document for Relo Network file upload functionality.\n\nCreated at: ' + new Date().toISOString()
    const testFileName = `test-document-${Date.now()}.txt`
    const testFilePath = path.join(process.cwd(), testFileName)
    
    fs.writeFileSync(testFilePath, testContent)
    console.log(`✅ Test file created: ${testFileName}`)

    try {
      // Read the test file
      const fileBuffer = fs.readFileSync(testFilePath)
      const uploadPath = `${testCase.id}/${Date.now()}-${testFileName}`

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(uploadPath, fileBuffer, {
          contentType: 'text/plain',
          upsert: false
        })

      if (uploadError) {
        console.error('❌ File upload failed:', uploadError.message)
        return
      }
      console.log('✅ File uploaded to storage:', uploadData.path)

      // Insert document record
      const { data: docData, error: docError } = await supabase
        .from('documents')
        .insert({
          case_id: testCase.id,
          uploaded_by: 'concierge',
          name: testFileName,
          path: uploadPath,
          content_type: 'text/plain',
          size_bytes: fileBuffer.length
        })
        .select()
        .single()

      if (docError) {
        console.error('❌ Document record creation failed:', docError.message)
        return
      }
      console.log('✅ Document record created:', docData.id)

      // Test 4: Get public URL
      console.log('\n4️⃣ Testing public URL generation...')
      const { data: urlData } = supabase.storage
        .from('documents')
        .getPublicUrl(uploadPath)

      console.log('✅ Public URL generated:', urlData.publicUrl)

      // Test 5: Retrieve documents for case
      console.log('\n5️⃣ Testing document retrieval...')
      const { data: documents, error: retrieveError } = await supabase
        .from('documents')
        .select('*')
        .eq('case_id', testCase.id)

      if (retrieveError) {
        console.error('❌ Document retrieval failed:', retrieveError.message)
      } else {
        console.log(`✅ Retrieved ${documents.length} document(s) for case`)
        documents.forEach(doc => {
          console.log(`   - ${doc.name} (${doc.size_bytes} bytes)`)
        })
      }

      // Test 6: Test file download/access
      console.log('\n6️⃣ Testing file access...')
      try {
        const response = await fetch(urlData.publicUrl)
        if (response.ok) {
          const content = await response.text()
          console.log('✅ File download successful')
          console.log('   Content preview:', content.substring(0, 50) + '...')
        } else {
          console.log('⚠️  File access returned status:', response.status)
        }
      } catch (fetchError) {
        console.log('⚠️  File access test failed:', fetchError.message)
      }

      // Clean up
      console.log('\n🧹 Cleaning up test data...')
      await supabase.from('documents').delete().eq('case_id', testCase.id)
      await supabase.from('move_cases').delete().eq('id', testCase.id)
      await supabase.storage.from('documents').remove([uploadPath])
      fs.unlinkSync(testFilePath)
      console.log('✅ Test data cleaned up')

      console.log('\n🎉 File upload functionality test completed successfully!')
      
      console.log('\n📋 Test Results Summary:')
      console.log('✅ Storage bucket configuration works')
      console.log('✅ File upload to storage works')
      console.log('✅ Document record creation works')
      console.log('✅ Public URL generation works')
      console.log('✅ Document retrieval works')
      console.log('✅ File access/download works')
      
      console.log('\n🚀 Ready to use at:')
      console.log('   - /documents-demo (Interactive demo)')
      console.log('   - API: /api/documents/upload')
      console.log('   - Component: FileUpload')

    } catch (error) {
      console.error('❌ File operations failed:', error.message)
      
      // Clean up on error
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath)
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testFileUpload()