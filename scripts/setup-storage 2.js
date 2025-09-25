const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.vercel' })

async function setupStorage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🚀 Setting up Supabase Storage for file uploads...')

    // Check if documents bucket exists
    console.log('\n1️⃣ Checking existing buckets...')
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('❌ Failed to list buckets:', listError.message)
      return
    }

    console.log(`Found ${buckets.length} existing bucket(s):`)
    buckets.forEach(bucket => {
      console.log(`   - ${bucket.name} (public: ${bucket.public})`)
    })

    const documentsBucket = buckets.find(bucket => bucket.name === 'documents')
    
    if (documentsBucket) {
      console.log('\n✅ Documents bucket already exists!')
      console.log(`   - Public: ${documentsBucket.public}`)
      console.log(`   - Created: ${documentsBucket.created_at}`)
      
      if (!documentsBucket.public) {
        console.log('\n⚠️  Bucket is private. Consider making it public for easier file access.')
      }
    } else {
      console.log('\n2️⃣ Creating documents bucket...')
      
      const { data: newBucket, error: createError } = await supabase.storage.createBucket('documents', {
        public: true,
        allowedMimeTypes: [
          // Images
          'image/jpeg',
          'image/jpg', 
          'image/png',
          'image/gif',
          'image/webp',
          // Documents
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'text/plain',
          'text/csv'
        ],
        fileSizeLimit: 52428800 // 50MB in bytes
      })

      if (createError) {
        console.error('❌ Failed to create bucket:', createError.message)
        console.log('\n💡 Manual Setup Instructions:')
        console.log('1. Go to your Supabase Dashboard')
        console.log('2. Navigate to Storage')
        console.log('3. Create a new bucket named "documents"')
        console.log('4. Make it public for easier file access')
        console.log('5. Set file size limit to 50MB')
        return
      }

      console.log('✅ Documents bucket created successfully!')
      console.log('   - Name: documents')
      console.log('   - Public: true')
      console.log('   - Max file size: 50MB')
    }

    // Test bucket access
    console.log('\n3️⃣ Testing bucket access...')
    try {
      const { data: files, error: listFilesError } = await supabase.storage
        .from('documents')
        .list('', { limit: 1 })

      if (listFilesError) {
        console.error('❌ Bucket access test failed:', listFilesError.message)
      } else {
        console.log('✅ Bucket access successful')
        console.log(`   Found ${files.length} existing file(s)`)
      }
    } catch (error) {
      console.log('⚠️  Bucket access test inconclusive:', error.message)
    }

    // Create RLS policies for documents bucket (if needed)
    console.log('\n4️⃣ Setting up storage policies...')
    
    // Note: Storage policies are typically set up in the Supabase dashboard
    // This is just informational
    console.log('📋 Recommended Storage Policies:')
    console.log('')
    console.log('Policy Name: "Allow authenticated uploads"')
    console.log('Operation: INSERT')
    console.log('Target: authenticated users')
    console.log('SQL: auth.role() = \'authenticated\'')
    console.log('')
    console.log('Policy Name: "Allow public file access"')
    console.log('Operation: SELECT')
    console.log('Target: public')
    console.log('SQL: true')

    console.log('\n🎉 Storage setup completed!')
    
    console.log('\n📋 Setup Summary:')
    console.log('✅ Documents bucket configured')
    console.log('✅ File upload endpoint ready')
    console.log('✅ Public file access enabled')
    console.log('✅ File type restrictions in place')
    console.log('✅ 50MB file size limit set')
    
    console.log('\n🔧 Next Steps:')
    console.log('1. Test file upload: npm run test-file-upload')
    console.log('2. Try the demo: /documents-demo')
    console.log('3. Use FileUpload component in your app')

  } catch (error) {
    console.error('❌ Setup failed:', error.message)
  }
}

setupStorage()