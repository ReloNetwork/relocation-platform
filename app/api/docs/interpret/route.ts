import { NextResponse } from 'next/server'

// Mock document interpretation service
// In production, this would integrate with AI services like OpenAI, Claude, or Google Document AI
function interpretDocument(filename: string, contentType: string): Array<{
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  dueDate?: string
  category: string
}> {
  const filename_lower = filename.toLowerCase()
  const tasks: Array<{
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
    dueDate?: string
    category: string
  }> = []

  // Visa/Immigration documents
  if (filename_lower.includes('visa') || filename_lower.includes('passport') || filename_lower.includes('immigration')) {
    tasks.push({
      title: 'Submit Visa Application',
      description: 'Complete visa application process based on uploaded documentation',
      priority: 'high',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
      category: 'immigration'
    })
    tasks.push({
      title: 'Prepare Supporting Documents',
      description: 'Gather additional required documents for visa application',
      priority: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      category: 'immigration'
    })
  }

  // Employment/Contract documents
  if (filename_lower.includes('employment') || filename_lower.includes('contract') || filename_lower.includes('offer')) {
    tasks.push({
      title: 'Review Employment Terms',
      description: 'Review and negotiate employment contract terms',
      priority: 'high',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
      category: 'employment'
    })
    tasks.push({
      title: 'Set up Payroll and Benefits',
      description: 'Complete payroll setup and benefits enrollment',
      priority: 'medium',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      category: 'employment'
    })
  }

  // Property/Housing documents
  if (filename_lower.includes('lease') || filename_lower.includes('rental') || filename_lower.includes('property') || filename_lower.includes('housing')) {
    tasks.push({
      title: 'Schedule Property Inspection',
      description: 'Arrange professional property inspection before move-in',
      priority: 'high',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
      category: 'housing'
    })
    tasks.push({
      title: 'Set up Utilities',
      description: 'Arrange electricity, gas, water, and internet connections',
      priority: 'medium',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
      category: 'housing'
    })
  }

  // Medical documents
  if (filename_lower.includes('medical') || filename_lower.includes('health') || filename_lower.includes('insurance')) {
    tasks.push({
      title: 'Register with Local Healthcare',
      description: 'Find and register with local GP and healthcare providers',
      priority: 'medium',
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 21 days from now
      category: 'healthcare'
    })
    tasks.push({
      title: 'Transfer Medical Records',
      description: 'Request and transfer medical records from previous providers',
      priority: 'low',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      category: 'healthcare'
    })
  }

  // School/Education documents
  if (filename_lower.includes('school') || filename_lower.includes('education') || filename_lower.includes('transcript')) {
    tasks.push({
      title: 'Enroll Children in School',
      description: 'Complete school enrollment process and arrange uniforms',
      priority: 'high',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days from now
      category: 'education'
    })
    tasks.push({
      title: 'Arrange School Transportation',
      description: 'Set up school bus or transport arrangements',
      priority: 'medium',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
      category: 'education'
    })
  }

  // Banking/Financial documents
  if (filename_lower.includes('bank') || filename_lower.includes('financial') || filename_lower.includes('credit')) {
    tasks.push({
      title: 'Open Local Bank Account',
      description: 'Set up local banking and transfer funds',
      priority: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      category: 'banking'
    })
    tasks.push({
      title: 'Establish Credit History',
      description: 'Apply for local credit card to build credit history',
      priority: 'medium',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      category: 'banking'
    })
  }

  // Tax documents
  if (filename_lower.includes('tax') || filename_lower.includes('hmrc') || filename_lower.includes('p60') || filename_lower.includes('p45') || filename_lower.includes('self-assessment') || filename_lower.includes('vat') || filename_lower.includes('corporation tax') || filename_lower.includes('paye')) {
    tasks.push({
      title: 'Register for UK Tax',
      description: 'Complete tax registration and obtain UTR number if required',
      priority: 'high',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
      category: 'tax'
    })
    tasks.push({
      title: 'Review Tax Obligations',
      description: 'Understand UK tax requirements and double taxation treaties',
      priority: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      category: 'tax'
    })
    tasks.push({
      title: 'Set Up Tax Planning',
      description: 'Consult with tax advisor for optimal tax structure',
      priority: 'medium',
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 21 days from now
      category: 'tax'
    })
  }

  // Travel documents
  if (filename_lower.includes('flight') || filename_lower.includes('travel') || filename_lower.includes('itinerary') || filename_lower.includes('ticket')) {
    tasks.push({
      title: 'Review Travel Arrangements',
      description: 'Confirm travel dates and arrangements for relocation',
      priority: 'high',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
      category: 'travel'
    })
    tasks.push({
      title: 'Arrange Airport Transportation',
      description: 'Book transportation from airport to temporary accommodation',
      priority: 'medium',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      category: 'transport'
    })
  }

  // Transport/Driving documents
  if (filename_lower.includes('license') || filename_lower.includes('driving') || filename_lower.includes('vehicle')) {
    tasks.push({
      title: 'Exchange Driving License',
      description: 'Apply to exchange international driving license for local license',
      priority: 'medium',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      category: 'transport'
    })
    tasks.push({
      title: 'Research Local Transport Options',
      description: 'Explore public transport and commuting options in new area',
      priority: 'low',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
      category: 'transport'
    })
  }

  // Lifestyle/Social documents
  if (filename_lower.includes('club') || filename_lower.includes('membership') || filename_lower.includes('social') || filename_lower.includes('hobby')) {
    tasks.push({
      title: 'Join Local Social Groups',
      description: 'Research and join social clubs or hobby groups in new area',
      priority: 'low',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      category: 'lifestyle'
    })
    tasks.push({
      title: 'Find Recreation Facilities',
      description: 'Locate gyms, sports centers, and recreational facilities nearby',
      priority: 'low',
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 21 days from now
      category: 'lifestyle'
    })
  }

  // Shipping/Logistics documents
  if (filename_lower.includes('shipping') || filename_lower.includes('cargo') || filename_lower.includes('container') || filename_lower.includes('logistics') || filename_lower.includes('freight') || filename_lower.includes('customs') || filename_lower.includes('import') || filename_lower.includes('export')) {
    tasks.push({
      title: 'Arrange International Shipping',
      description: 'Organize shipping of household goods and personal belongings',
      priority: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      category: 'logistics'
    })
    tasks.push({
      title: 'Handle Customs Documentation',
      description: 'Complete customs forms and import declarations',
      priority: 'high',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
      category: 'logistics'
    })
    tasks.push({
      title: 'Coordinate Delivery Timeline',
      description: 'Schedule delivery and ensure someone is available to receive shipment',
      priority: 'medium',
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 21 days from now
      category: 'logistics'
    })
  }

  // Moving/Packing documents
  if (filename_lower.includes('moving') || filename_lower.includes('packing') || filename_lower.includes('inventory') || filename_lower.includes('manifest')) {
    tasks.push({
      title: 'Coordinate Moving Services',
      description: 'Schedule packing and loading of household items',
      priority: 'high',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
      category: 'logistics'
    })
    tasks.push({
      title: 'Arrange Storage Solutions',
      description: 'Set up temporary or permanent storage if needed',
      priority: 'medium',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days from now
      category: 'logistics'
    })
  }

  // If no specific matches, create a generic review task
  if (tasks.length === 0) {
    tasks.push({
      title: 'Review Uploaded Document',
      description: `Review and take action on uploaded document: ${filename}`,
      priority: 'medium',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      category: 'general'
    })
  }

  return tasks
}

export async function POST(req: Request) {
  try {
    const { filename, contentType, caseId } = await req.json()

    if (!filename || !caseId) {
      return NextResponse.json({
        ok: false,
        error: 'Missing filename or case ID'
      }, { status: 400 })
    }

    // Interpret the document and extract tasks
    const suggestedTasks = interpretDocument(filename, contentType || '')

    return NextResponse.json({
      ok: true,
      tasks: suggestedTasks,
      message: `Analyzed document and found ${suggestedTasks.length} suggested tasks`
    })

  } catch (error: any) {
    console.error('Document interpretation error:', error)
    return NextResponse.json({
      ok: false,
      error: error.message || 'Internal server error'
    }, { status: 500 })
  }
}