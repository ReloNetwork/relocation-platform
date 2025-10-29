// Service Delivery Workflows and Checklists
// Ensures timeline compliance for both executive and corporate tracks

export interface WorkflowStep {
  id: string
  title: string
  description: string
  timeline: string
  assignee: string
  dependencies: string[]
  deliverables: string[]
  checklist: string[]
}

export interface ServiceWorkflow {
  name: string
  description: string
  totalDuration: string
  steps: WorkflowStep[]
  milestones: string[]
  escalationTriggers: string[]
}

export const executiveServiceWorkflows: Record<string, ServiceWorkflow> = {
  "72hour_audit_emergency": {
    name: "72-Hour Audit - Emergency",
    description: "Emergency executive relocation with 2-hour response",
    totalDuration: "72 hours", 
    milestones: ["Initial contact", "Strategy call booked", "Shortlist delivered", "Introductions made"],
    escalationTriggers: ["2-hour response missed", "7-day introduction deadline"],
    steps: [
      {
        id: "initial_contact",
        title: "Emergency Contact",
        description: "Immediate phone contact within 2 hours",
        timeline: "0-2 hours",
        assignee: "Executive Team Lead",
        dependencies: [],
        deliverables: ["Phone contact confirmation", "Strategy call scheduled"],
        checklist: [
          "Phone customer within 2 hours of payment",
          "Confirm urgency and timeline requirements",
          "Schedule strategy call within 4 hours",
          "Send calendar confirmation email",
          "Assign dedicated specialist",
          "Alert all team members of emergency status"
        ]
      },
      {
        id: "strategy_call",
        title: "Emergency Strategy Call",
        description: "60-minute consultation call",
        timeline: "2-6 hours",
        assignee: "Senior Executive Specialist",
        dependencies: ["initial_contact"],
        deliverables: ["Requirements document", "Area shortlist scope", "Partner identification"],
        checklist: [
          "Conduct 60-minute strategy call",
          "Document detailed requirements",
          "Identify top 3 area preferences",
          "Note budget and timeline constraints",
          "Confirm family/lifestyle requirements",
          "Set expectations for next 48 hours"
        ]
      },
      {
        id: "shortlist_preparation",
        title: "Bespoke Area Analysis",
        description: "Create customised property and area shortlist",
        timeline: "6-24 hours",
        assignee: "Area Research Team + Property Specialists",
        dependencies: ["strategy_call"],
        deliverables: ["Area analysis report", "Property shortlist", "Transport analysis"],
        checklist: [
          "Research identified areas in detail",
          "Create transport/commute analysis",
          "Identify suitable properties",
          "Prepare area comparison document",
          "Include local amenities and schools",
          "Format for client presentation"
        ]
      },
      {
        id: "partner_selection",
        title: "Partner Matching",
        description: "Identify and brief 3 vetted partners",
        timeline: "12-48 hours",
        assignee: "Partner Relations Manager",
        dependencies: ["shortlist_preparation"],
        deliverables: ["Partner selection rationale", "Briefing documents", "Introduction schedule"],
        checklist: [
          "Review partner performance in target areas",
          "Select top 3 partners for client profile",
          "Brief partners on client requirements",
          "Confirm partner availability",
          "Prepare introduction materials",
          "Schedule warm introductions"
        ]
      },
      {
        id: "delivery_and_introductions",
        title: "Delivery & Warm Introductions",
        description: "Deliver shortlist and facilitate partner introductions",
        timeline: "24-72 hours",
        assignee: "Executive Team Lead",
        dependencies: ["partner_selection"],
        deliverables: ["Complete package delivery", "3 warm introductions", "30-day support activation"],
        checklist: [
          "Deliver comprehensive shortlist package",
          "Schedule first partner introduction",
          "Facilitate 3 warm introductions within 7 days",
          "Activate 30-day concierge support",
          "Set up regular check-in schedule",
          "Provide emergency contact details"
        ]
      }
    ]
  },

  "72hour_audit_standard": {
    name: "72-Hour Audit - Standard",
    description: "Standard executive relocation with 24-hour response",
    totalDuration: "7 days",
    milestones: ["Initial contact", "Strategy call completed", "Shortlist delivered", "3 introductions made"],
    escalationTriggers: ["24-hour response missed", "7-day introduction deadline"],
    steps: [
      {
        id: "initial_contact",
        title: "Customer Contact",
        description: "Phone contact within 24 hours",
        timeline: "0-24 hours",
        assignee: "Executive Team",
        dependencies: [],
        deliverables: ["Contact confirmation", "Strategy call scheduled"],
        checklist: [
          "Phone customer within 24 hours",
          "Confirm requirements and timeline",
          "Schedule strategy call within 48 hours",
          "Send confirmation email with agenda",
          "Assign account specialist"
        ]
      },
      {
        id: "strategy_call",
        title: "Strategy Consultation",
        description: "60-minute detailed consultation",
        timeline: "24-72 hours",
        assignee: "Executive Specialist",
        dependencies: ["initial_contact"],
        deliverables: ["Detailed requirements", "Area preferences", "Timeline confirmation"],
        checklist: [
          "Conduct comprehensive strategy call",
          "Document all requirements",
          "Identify area preferences and constraints",
          "Confirm budget and timeline",
          "Note special requirements",
          "Set client expectations"
        ]
      },
      {
        id: "research_and_shortlist",
        title: "Research & Shortlist Creation",
        description: "Detailed area analysis and property shortlist",
        timeline: "2-5 days",
        assignee: "Research Team",
        dependencies: ["strategy_call"],
        deliverables: ["Area analysis", "Property shortlist", "Transport report"],
        checklist: [
          "Complete area research",
          "Analyse transport links",
          "Create property shortlist",
          "Include school information if needed",
          "Add local amenities analysis",
          "Prepare comparison matrix"
        ]
      },
      {
        id: "partner_introductions",
        title: "Partner Introductions",
        description: "Facilitate 3 warm partner introductions",
        timeline: "5-7 days",
        assignee: "Partner Relations",
        dependencies: ["research_and_shortlist"],
        deliverables: ["3 partner introductions", "Briefing materials", "Contact schedule"],
        checklist: [
          "Select 3 best-matched partners",
          "Brief partners on client needs",
          "Schedule introduction calls",
          "Provide client background to partners",
          "Facilitate warm introductions",
          "Set up ongoing support"
        ]
      }
    ]
  }
}

export const corporateServiceWorkflows: Record<string, ServiceWorkflow> = {
  "corporate_assessment": {
    name: "Corporate Assessment Process",
    description: "15-minute assessment to full proposal delivery",
    totalDuration: "48 hours",
    milestones: ["Assessment completed", "Proposal delivered", "SLA signed", "Account manager assigned"],
    escalationTriggers: ["24-hour proposal deadline", "48-hour SLA deadline"],
    steps: [
      {
        id: "assessment_processing",
        title: "Assessment Analysis",
        description: "Process corporate assessment and determine requirements",
        timeline: "0-2 hours",
        assignee: "Corporate Assessment Team",
        dependencies: [],
        deliverables: ["Requirements analysis", "Service recommendation", "Pricing calculation"],
        checklist: [
          "Review completed assessment form",
          "Analyse company size and volume needs",
          "Determine appropriate service tier",
          "Calculate volume-based pricing",
          "Identify compliance requirements",
          "Flag any special needs or deadlines"
        ]
      },
      {
        id: "proposal_creation",
        title: "Proposal Development",
        description: "Create customised corporate proposal",
        timeline: "2-24 hours",
        assignee: "Corporate Sales Team",
        dependencies: ["assessment_processing"],
        deliverables: ["Custom proposal", "SLA draft", "Volume pricing schedule"],
        checklist: [
          "Generate customised pricing proposal",
          "Create service level agreement draft",
          "Include volume discount calculations",
          "Add relevant case studies",
          "Prepare implementation timeline",
          "Include account management structure"
        ]
      },
      {
        id: "proposal_delivery",
        title: "Proposal Presentation",
        description: "Deliver proposal and schedule discussion",
        timeline: "12-24 hours",
        assignee: "Account Director",
        dependencies: ["proposal_creation"],
        deliverables: ["Proposal email", "Discussion call scheduled", "Questions addressed"],
        checklist: [
          "Send detailed proposal via email",
          "Schedule proposal discussion call",
          "Prepare for questions and negotiations",
          "Set up DocuSign for quick signature",
          "Identify decision makers",
          "Establish timeline for decision"
        ]
      },
      {
        id: "agreement_and_setup",
        title: "Agreement & Account Setup",
        description: "Finalise agreement and set up account management",
        timeline: "24-48 hours",
        assignee: "Account Management Team",
        dependencies: ["proposal_delivery"],
        deliverables: ["Signed SLA", "Account setup", "Team assignment"],
        checklist: [
          "Process signed service agreement",
          "Set up corporate account portal",
          "Assign dedicated account manager",
          "Create service delivery schedule",
          "Establish reporting requirements",
          "Schedule kick-off meeting"
        ]
      }
    ]
  }
}

export const serviceDeliveryChecklists = {
  executive: {
    paymentReceived: [
      "Generate unique reference ID (EX-XXXXXXXX)",
      "Send payment confirmation email",
      "Create customer profile in database",
      "Assign account to appropriate specialist based on urgency",
      "Set calendar reminders for response deadlines",
      "Add to active customer dashboard"
    ],
    
    emergencyResponse: [
      "Contact customer within 2 hours",
      "Escalate to team lead immediately",
      "Schedule strategy call within 4 hours", 
      "Alert all team members",
      "Set up dedicated Slack channel",
      "Confirm emergency contact details"
    ],
    
    strategyCall: [
      "Review customer brief beforehand",
      "Prepare area recommendations",
      "Have transport maps ready",
      "Document detailed requirements",
      "Set clear expectations",
      "Schedule follow-up deliverables"
    ],
    
    shortlistDelivery: [
      "Include minimum 10 suitable properties",
      "Provide area analysis for each location",
      "Include transport/commute information",
      "Add local amenities and schools",
      "Format professionally",
      "Schedule delivery call"
    ],
    
    partnerIntroductions: [
      "Select 3 best-matched partners",
      "Brief partners on customer needs",
      "Provide customer background",
      "Schedule introduction calls",
      "Monitor introduction success",
      "Follow up on outcomes"
    ]
  },
  
  corporate: {
    assessmentReceived: [
      "Generate corporate reference ID (CA-XXXXXXXX)",
      "Send assessment confirmation email",
      "Analyse requirements and volume",
      "Calculate pricing and discounts",
      "Assign to appropriate sales team member",
      "Set proposal delivery deadline"
    ],
    
    proposalCreation: [
      "Use corporate pricing calculator",
      "Include volume discounts",
      "Add relevant case studies",
      "Prepare SLA terms",
      "Review with account director",
      "Format professionally"
    ],
    
    accountSetup: [
      "Create corporate portal access",
      "Assign dedicated account manager",
      "Set up reporting schedule",
      "Configure dashboard preferences",
      "Schedule kick-off meeting",
      "Provide emergency contacts"
    ]
  }
}

export function getWorkflowForService(serviceType: string, urgency?: string): ServiceWorkflow | null {
  if (serviceType === "72hour_audit") {
    return urgency === "emergency" 
      ? executiveServiceWorkflows["72hour_audit_emergency"]
      : executiveServiceWorkflows["72hour_audit_standard"]
  }
  
  if (serviceType === "corporate_assessment") {
    return corporateServiceWorkflows["corporate_assessment"]
  }
  
  return null
}

export function getChecklistForStep(serviceType: string, stepId: string): string[] {
  const workflow = getWorkflowForService(serviceType)
  if (!workflow) return []
  
  const step = workflow.steps.find(s => s.id === stepId)
  return step?.checklist || []
}

export function generateServiceTimeline(serviceType: string, urgency?: string): {
  milestones: Array<{
    name: string
    deadline: string
    description: string
  }>
} {
  const workflow = getWorkflowForService(serviceType, urgency)
  if (!workflow) return { milestones: [] }
  
  const milestones = workflow.steps.map(step => ({
    name: step.title,
    deadline: step.timeline,
    description: step.description
  }))
  
  return { milestones }
}