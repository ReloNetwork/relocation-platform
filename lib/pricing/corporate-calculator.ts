// Corporate Pricing Calculator
// Dynamic pricing based on volume, services, and SLA requirements

export interface CorporateRequirements {
  companySize: string
  annualRelocations: number
  timeline: string
  servicesNeeded: string[]
  slaLevel: 'standard' | 'priority' | 'emergency'
  budgetRange: string
  complianceRequirements: string[]
}

export interface PricingTier {
  name: string
  description: string
  basePrice: number
  volumeDiscount: number
  includedServices: string[]
  slaCommitments: {
    response: string
    delivery: string
    reporting: string
  }
  accountManagement: string
}

export const corporatePricingTiers: Record<string, PricingTier> = {
  starter: {
    name: "Corporate Starter",
    description: "Essential relocation support for small teams",
    basePrice: 2500, // £25 per employee base
    volumeDiscount: 0,
    includedServices: [
      "Property search assistance",
      "Area recommendations", 
      "Basic compliance support",
      "Monthly reporting"
    ],
    slaCommitments: {
      response: "48 hours",
      delivery: "14 days",
      reporting: "Monthly"
    },
    accountManagement: "Shared account manager"
  },
  
  professional: {
    name: "Corporate Professional", 
    description: "Comprehensive support for growing companies",
    basePrice: 1800, // £18 per employee base
    volumeDiscount: 15,
    includedServices: [
      "Full relocation coordination",
      "Dedicated partner introductions",
      "Compliance management",
      "Family integration support",
      "Bi-weekly reporting",
      "Emergency support line"
    ],
    slaCommitments: {
      response: "24 hours",
      delivery: "10 days", 
      reporting: "Bi-weekly"
    },
    accountManagement: "Dedicated account manager"
  },
  
  enterprise: {
    name: "Corporate Enterprise",
    description: "White-glove service for large-scale relocations",
    basePrice: 1200, // £12 per employee base
    volumeDiscount: 25,
    includedServices: [
      "End-to-end relocation management",
      "C-suite concierge services",
      "Custom compliance frameworks",
      "Real-time reporting dashboard",
      "24/7 emergency support",
      "Quarterly business reviews",
      "Custom SLA agreements"
    ],
    slaCommitments: {
      response: "2 hours",
      delivery: "7 days",
      reporting: "Real-time dashboard"
    },
    accountManagement: "Senior account director + team"
  }
}

export function calculateCorporatePricing(requirements: CorporateRequirements): {
  recommendedTier: string
  pricing: {
    perEmployee: number
    annualEstimate: number
    volumeDiscount: number
    totalSavings: number
  }
  slaCommitments: any
  includedServices: string[]
} {
  const { annualRelocations, slaLevel, companySize } = requirements
  
  // Determine tier based on volume and requirements
  let recommendedTier = 'starter'
  
  if (annualRelocations >= 50 || slaLevel === 'emergency') {
    recommendedTier = 'enterprise'
  } else if (annualRelocations >= 10 || slaLevel === 'priority') {
    recommendedTier = 'professional'  
  }
  
  const tier = corporatePricingTiers[recommendedTier]
  
  // Calculate volume discount
  const volumeMultiplier = annualRelocations >= 25 ? 0.75 : 
                          annualRelocations >= 10 ? 0.85 : 
                          annualRelocations >= 5 ? 0.95 : 1.0
  
  const perEmployeePrice = Math.round(tier.basePrice * volumeMultiplier)
  const annualEstimate = perEmployeePrice * annualRelocations
  const originalPrice = tier.basePrice * annualRelocations
  const totalSavings = originalPrice - annualEstimate
  const volumeDiscount = Math.round(((originalPrice - annualEstimate) / originalPrice) * 100)
  
  return {
    recommendedTier,
    pricing: {
      perEmployee: perEmployeePrice,
      annualEstimate,
      volumeDiscount,
      totalSavings
    },
    slaCommitments: tier.slaCommitments,
    includedServices: tier.includedServices
  }
}

export function generateCorporateProposal(
  requirements: CorporateRequirements,
  contactName: string,
  companyName: string
): string {
  const pricing = calculateCorporatePricing(requirements)
  const tier = corporatePricingTiers[pricing.recommendedTier]
  
  return `
# Corporate Relocation Proposal
## ${companyName} - ${tier.name}

### Executive Summary
Based on your assessment, we recommend our **${tier.name}** package for ${companyName}'s relocation needs.

**Annual Volume:** ${requirements.annualRelocations} employees  
**Service Level:** ${requirements.slaLevel} priority  
**Estimated Annual Investment:** £${pricing.pricing.annualEstimate.toLocaleString()}

### Pricing Structure
- **Per Employee:** £${pricing.pricing.perEmployee.toLocaleString()}
- **Volume Discount:** ${pricing.pricing.volumeDiscount}% (saving £${pricing.pricing.totalSavings.toLocaleString()} annually)
- **Payment Terms:** Net 30, quarterly billing available

### Service Level Agreements
- **Response Time:** ${tier.slaCommitments.response}
- **Service Delivery:** ${tier.slaCommitments.delivery}  
- **Reporting:** ${tier.slaCommitments.reporting}
- **Account Management:** ${tier.accountManagement}

### Included Services
${tier.includedServices.map(service => `- ${service}`).join('\n')}

### Next Steps
1. **Service Agreement:** Digital signature via DocuSign
2. **Account Setup:** Dedicated portal access within 72 hours
3. **Team Assignment:** ${tier.accountManagement} introduction
4. **First Employee:** Ready to begin immediately upon agreement

**Proposal Valid:** 30 days  
**Contact:** corporate@therelonetwork.com | +44 20 3105 9566

---
*This proposal is customised for ${companyName} based on your specific requirements assessment.*
  `
}

export const corporateServiceLevels = {
  standard: {
    name: "Standard Service",
    description: "Professional service with industry-standard timelines",
    responseTime: "48 hours",
    deliveryTime: "14 days",
    reportingFrequency: "Monthly",
    escalationPath: "Account manager → Team lead",
    pricing: { multiplier: 1.0 }
  },
  
  priority: {
    name: "Priority Service", 
    description: "Accelerated timelines with dedicated support",
    responseTime: "24 hours",
    deliveryTime: "10 days", 
    reportingFrequency: "Bi-weekly",
    escalationPath: "Account manager → Director → VP",
    pricing: { multiplier: 1.3 }
  },
  
  emergency: {
    name: "Emergency Service",
    description: "Immediate response with C-suite escalation", 
    responseTime: "2 hours",
    deliveryTime: "7 days",
    reportingFrequency: "Real-time dashboard",
    escalationPath: "Director → VP → CEO",
    pricing: { multiplier: 1.8 }
  }
}

export function generateServiceLevelAgreement(
  companyName: string,
  tier: string,
  requirements: CorporateRequirements
): string {
  const tierData = corporatePricingTiers[tier]
  const serviceLevel = corporateServiceLevels[requirements.slaLevel]
  
  return `
# Service Level Agreement
## ${companyName} - ${tierData.name}

### Service Commitments

**Response Times**
- Initial contact: ${serviceLevel.responseTime}
- Emergency escalation: ${serviceLevel.escalationPath}
- Business hours: Monday-Friday 9AM-6PM GMT

**Delivery Standards** 
- Property shortlist: Within ${serviceLevel.deliveryTime}
- Partner introductions: Within 7 days of shortlist approval
- Move coordination: As per employee timeline requirements

**Performance Metrics**
- Response time compliance: 95% target
- Service delivery on time: 90% target  
- Client satisfaction score: 4.5/5.0 minimum

**Reporting & Communication**
- Account reviews: ${serviceLevel.reportingFrequency}
- Dashboard access: Real-time portal
- Dedicated contacts: ${tierData.accountManagement}

**Escalation Procedures**
${serviceLevel.escalationPath}

### Commercial Terms
- Service fees: As per signed proposal
- Payment terms: Net 30 days
- Contract period: 12 months (renewable)
- Termination: 90 days written notice

**Effective Date:** [Contract signature date]  
**Review Date:** [Annual review]

---
*This SLA is binding upon signature and forms part of the Master Service Agreement between Relo Network Ltd and ${companyName}.*
  `
}