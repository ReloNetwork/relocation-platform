// DocuSign Integration for Fast Contract Signing
// Enables 2-minute contract signing process

export interface ContractTemplate {
  templateId: string
  name: string
  description: string
  signingOrder: number
  requiredFields: string[]
}

export interface SigningRequest {
  templateId: string
  signerEmail: string
  signerName: string
  signerTitle?: string
  companyName?: string
  customFields?: Record<string, string>
  returnUrl?: string
}

export const contractTemplates: Record<string, ContractTemplate> = {
  executiveService: {
    templateId: "executive-service-agreement-v2025",
    name: "Executive Service Agreement",
    description: "72-Hour Setup Audit service agreement",
    signingOrder: 1,
    requiredFields: [
      "clientName",
      "clientEmail", 
      "serviceDate",
      "referenceId",
      "urgencyLevel"
    ]
  },
  
  corporateService: {
    templateId: "corporate-master-service-agreement-v2025",
    name: "Corporate Master Service Agreement",
    description: "Corporate relocation services MSA",
    signingOrder: 1,
    requiredFields: [
      "companyName",
      "signerName",
      "signerTitle",
      "companyAddress",
      "serviceTier",
      "volumeCommitment",
      "pricingSchedule"
    ]
  },
  
  corporateSLA: {
    templateId: "corporate-sla-v2025",
    name: "Corporate Service Level Agreement",
    description: "SLA for corporate relocation services",
    signingOrder: 2,
    requiredFields: [
      "companyName",
      "responseTime",
      "deliveryCommitments",
      "reportingFrequency",
      "accountManager"
    ]
  }
}

// Mock DocuSign integration (replace with actual DocuSign SDK in production)
export class DocuSignService {
  private apiKey: string
  private accountId: string
  private environment: 'demo' | 'production'
  
  constructor(apiKey: string, accountId: string, environment: 'demo' | 'production' = 'demo') {
    this.apiKey = apiKey
    this.accountId = accountId
    this.environment = environment
  }
  
  async createSigningRequest(request: SigningRequest): Promise<{
    envelopeId: string
    signingUrl: string
    expirationDate: string
  }> {
    // In production, this would use the actual DocuSign API
    // For now, return mock data that can be used for development
    
    const template = contractTemplates[request.templateId as keyof typeof contractTemplates]
    if (!template) {
      throw new Error(`Template ${request.templateId} not found`)
    }
    
    // Mock response - replace with actual DocuSign API call
    const mockEnvelopeId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const mockSigningUrl = `https://demo.docusign.net/signing/${mockEnvelopeId}`
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30) // 30 days from now
    
    console.log('DocuSign signing request created:', {
      template: template.name,
      signer: request.signerEmail,
      envelopeId: mockEnvelopeId
    })
    
    return {
      envelopeId: mockEnvelopeId,
      signingUrl: mockSigningUrl,
      expirationDate: expirationDate.toISOString()
    }
  }
  
  async getEnvelopeStatus(envelopeId: string): Promise<{
    status: 'created' | 'sent' | 'delivered' | 'signed' | 'completed' | 'declined' | 'voided'
    completedDate?: string
    signers: Array<{
      email: string
      status: string
      signedDate?: string
    }>
  }> {
    // Mock status check - replace with actual DocuSign API call
    return {
      status: 'sent',
      signers: [{
        email: 'client@example.com',
        status: 'sent'
      }]
    }
  }
  
  async downloadSignedDocument(envelopeId: string): Promise<{
    documentBytes: Buffer
    fileName: string
  }> {
    // Mock document download - replace with actual DocuSign API call
    const mockPdf = Buffer.from('Mock PDF content')
    return {
      documentBytes: mockPdf,
      fileName: `signed-agreement-${envelopeId}.pdf`
    }
  }
}

export function generateContractUrl(
  templateType: 'executive' | 'corporate' | 'corporateSLA',
  clientData: {
    name: string
    email: string
    company?: string
    referenceId: string
    serviceDetails: any
  }
): string {
  // Generate a direct contract signing URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://therelonetwork.com'
  const contractPath = `/contracts/sign/${templateType}/${clientData.referenceId}`
  
  return `${baseUrl}${contractPath}`
}

export const contractContent = {
  executive: {
    title: "Executive Service Agreement",
    content: `
# Executive Service Agreement
## 72-Hour Setup Audit

**Service Provider:** Relo Network Ltd  
**Client:** {clientName}  
**Reference:** {referenceId}  
**Service Level:** {urgencyLevel}

### Service Description
The Provider will deliver a comprehensive 72-Hour Setup Audit including:

1. **Strategy Consultation** (60 minutes)
   - Detailed requirements analysis
   - Area recommendations based on lifestyle
   - Timeline and budget planning

2. **Bespoke Area Analysis**
   - Customised property shortlist
   - Transport and commute analysis
   - Local amenities assessment

3. **Partner Introductions** (3 warm introductions)
   - Vetted partners matching client requirements
   - Direct coordination and scheduling
   - Quality guarantee on introductions

4. **30-Day Concierge Support**
   - Ongoing guidance and support
   - Priority access to additional services
   - Emergency contact availability

### Service Timeline
- **Emergency Level:** 2-hour initial response
- **Urgent Level:** 12-hour initial response  
- **Standard Level:** 24-hour initial response
- **Introductions:** Guaranteed within 7 days

### Service Guarantee
If 3 qualified partner introductions are not provided within 7 days, the concierge support window will be extended at no additional cost.

### Payment Terms
- Service fee: As agreed and paid via Stripe
- Payment method: Credit card via secure checkout
- Refund policy: As per Terms of Service

### Contact Information
**Executive Team:** executive@therelonetwork.com  
**Priority Support:** +44 20 3105 9566  
**Reference:** {referenceId}

**Client Signature:** _________________  
**Date:** _________________

**Relo Network Representative:** _________________  
**Date:** _________________
    `
  },
  
  corporate: {
    title: "Corporate Master Service Agreement",
    content: `
# Corporate Master Service Agreement
## Relocation Services for {companyName}

**Service Provider:** Relo Network Ltd  
**Corporate Client:** {companyName}  
**Effective Date:** {effectiveDate}  
**Service Tier:** {serviceTier}

### Scope of Services
The Provider will deliver corporate relocation services including:

1. **Employee Relocation Coordination**
   - End-to-end relocation management
   - Property search and area recommendations
   - Moving coordination and support

2. **Account Management**
   - Dedicated account manager assignment
   - Regular reporting and communication
   - Performance monitoring and optimization

3. **Compliance and Support**
   - UK relocation compliance management
   - Emergency support availability
   - Custom reporting and analytics

### Service Levels
**Service Tier:** {serviceTier}  
**Volume Commitment:** {volumeCommitment} employees annually  
**Response Time:** As per Service Level Agreement  
**Account Management:** {accountManagement}

### Commercial Terms
- **Pricing:** As per attached pricing schedule
- **Payment Terms:** Net 30 days
- **Contract Period:** 12 months (auto-renewal)
- **Volume Discounts:** As specified in pricing schedule

### Performance Standards
- Response time compliance: 95% minimum
- Service delivery on time: 90% minimum
- Client satisfaction: 4.5/5.0 minimum

### Termination
Either party may terminate with 90 days written notice.

**Company Representative:** _________________  
**Title:** {signerTitle}  
**Date:** _________________

**Relo Network Representative:** _________________  
**Date:** _________________
    `
  }
}

export function generateSigningEmail(
  templateType: string,
  signerName: string,
  signingUrl: string,
  companyName?: string
): string {
  const template = contractTemplates[templateType as keyof typeof contractTemplates]
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0B1B2B; color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0;">Contract Ready for Signature</h1>
        <p style="margin: 10px 0 0 0;">${template?.description}</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2 style="color: #0B1B2B;">Dear ${signerName},</h2>
        
        <p>Your ${template?.name} is ready for digital signature.</p>
        
        <div style="background: #C9A24A; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="margin: 0 0 15px 0;">Ready to Sign</h3>
          <a href="${signingUrl}" 
             style="background: white; color: #C9A24A; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Sign Contract Now
          </a>
        </div>
        
        <h3 style="color: #0B1B2B;">What happens next:</h3>
        <ol style="color: #6B7280; line-height: 1.6;">
          <li>Click the "Sign Contract Now" button above</li>
          <li>Review the agreement terms</li>
          <li>Sign digitally (takes 2 minutes)</li>
          <li>Receive signed copy immediately</li>
          <li>Service activation begins automatically</li>
        </ol>
        
        <p>Questions? Contact us at hello@therelonetwork.com or +44 20 3105 9566</p>
        
        <p>Best regards,<br>
        <strong>The Relo Network Team</strong></p>
      </div>
    </div>
  `
}