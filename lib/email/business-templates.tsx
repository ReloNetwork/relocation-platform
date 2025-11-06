// Business Development Email Templates
// Social media content and client outreach templates

export const socialMediaPosts = {
  linkedin: {
    executive: {
      title: "Executive London Relocation Services",
      content: `London calling? Moving to the capital as a C-suite executive shouldn't feel like navigating a maze.

Our 72-Hour Setup Audit takes the guesswork out of executive relocations:
• Bespoke area analysis (not generic recommendations)
• Property shortlist within 48 hours
• 3 warm introductions to vetted partners
• 30-day concierge support

Last month: Found a Managing Director their perfect Marylebone flat in 48 hours.
This week: Helped a Senior Partner navigate Singapore to London seamlessly.

Executive relocations require executive service.

#LondonRelocation #ExecutiveServices #CSuite #LondonProperty`,
      hashtags: ["LondonRelocation", "ExecutiveServices", "CSuite", "LondonProperty"]
    },
    
    corporate: {
      title: "Corporate Relocation Solutions for HR Teams",
      content: `HR teams: Tired of employee relocations becoming 6-month ordeals?

Our 15-minute Corporate Assessment identifies exactly what your team needs:
• Volume pricing with SLAs you can actually rely on
• Dedicated account management (no more vendor juggling)
• Executive reporting dashboards for full visibility
• Compliance support across all 33 London boroughs

From Fortune 500 to scale-ups - we handle 1 employee or 100.

Ready to transform your corporate mobility programme?

#CorporateRelocation #HRServices #EmployeeMobility #London #CorporateServices`,
      hashtags: ["CorporateRelocation", "HRServices", "EmployeeMobility", "London", "CorporateServices"]
    },
    
    valueProposition: {
      title: "Dual-Track Relocation Strategy",
      content: `Why London relocations fail: Most services treat a Goldman Sachs MD the same as a university student.

We don't.

Track 1: Executive Services (Individual professionals, entrepreneurs)
Track 2: Corporate Programmes (HR teams, corporate mobility)

Different clients. Different needs. Different service levels.

Both tracks start with comprehensive assessments, not one-size-fits-all packages.

#LondonRelocation #DualTrack #ExecutiveServices #CorporateServices`,
      hashtags: ["LondonRelocation", "DualTrack", "ExecutiveServices", "CorporateServices"]
    }
  }
}

export const clientOutreachTemplates = {
  executive: {
    subject: "Executive London Relocation - 72-Hour Setup Audit",
    template: (name: string) => `Hi ${name},

Congratulations on your move to London! As someone relocating at the executive level, you're probably discovering that most relocation services aren't designed for C-suite requirements.

That's exactly why we created our 72-Hour Setup Audit specifically for executives, senior partners, and entrepreneurs.

Rather than generic property listings, you get:
• Bespoke area analysis matching your lifestyle and business needs
• Property shortlist within 48 hours (not weeks)
• 3 warm introductions to vetted partners in your preferred areas
• 30-day concierge support for the inevitable questions

Recent client (Managing Director, Tech): "The strategy call alone was worth the fee. They found us the perfect Marylebone flat in 48 hours."

Would a brief 15-minute call this week be useful to discuss your specific requirements?

Best regards,
[Your name]
Executive Services Team
Relo Network

Phone: +44 20 3105 9566
Email: executive@therelonetwork.com`
  },
  
  corporate: {
    subject: "Corporate Relocation Program - 15-Minute Assessment",
    template: (name: string, company: string) => `Hi ${name},

I noticed ${company} has been expanding in London. Are employee relocations currently managed in-house, or are you working with external partners?

Most HR teams tell us their biggest challenge isn't finding relocation services - it's finding services that actually deliver on timelines and communicate proactively.

Our Corporate Assessment (takes 15 minutes) identifies exactly what your team needs:
• Volume pricing with realistic SLAs
• Dedicated account management (one point of contact)
• Executive reporting dashboards for full visibility
• Compliance support across all London requirements

We handle everything from 1 employee to 100+ relocations, with the same attention to detail.

Would a brief conversation this week be valuable to discuss ${company}'s approach to London relocations?

Best regards,
[Your name]
Corporate Services Team
Relo Network

Phone: +44 20 3105 9566
Email: corporate@therelonetwork.com`
  }
}

export const automatedEmailSequences = {
  executiveOnboarding: [
    {
      trigger: "payment_confirmed",
      delay: 0, // immediate
      subject: "Welcome to Executive Service - Your 72-Hour Audit Begins Now",
      template: (name: string, referenceId: string, urgency: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #C9A24A; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0;">Welcome to Executive Service</h1>
            <p style="margin: 10px 0 0 0;">Your 72-Hour Setup Audit has begun</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #0B1B2B;">Dear ${name},</h2>
            
            <p>Your payment has been confirmed and your 72-Hour Setup Audit is now active. Our executive team is already reviewing your requirements.</p>
            
            <div style="background: #C9A24A; background: linear-gradient(135deg, #C9A24A 0%, #B8923D 100%); color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0;">Your Reference: ${referenceId}</h3>
              <p style="margin: 0;">Please save this reference for all future communications</p>
            </div>
            
            <h3 style="color: #0B1B2B;">What Happens Next:</h3>
            <ol style="color: #6B7280; line-height: 1.6;">
              <li><strong>Strategy Call (Within ${urgency === 'emergency' ? '2 hours' : urgency === 'urgent' ? '12 hours' : '24 hours'}):</strong> Our team will call you to schedule your 60-minute consultation</li>
              <li><strong>Shortlist Preparation (Day 1-2):</strong> We begin curating your bespoke area analysis and property shortlist</li>
              <li><strong>Warm Introductions (Within 7 days):</strong> Direct connections to 3 vetted partners matching your requirements</li>
              <li><strong>30-Day Support Window:</strong> Ongoing guidance throughout your relocation process</li>
            </ol>
            
            <div style="background: #FEF3CD; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #92400E;"><strong>Guarantee:</strong> If we don't provide 3 qualified introductions within 7 days, we'll extend your concierge window at no additional cost.</p>
            </div>
            
            <h3 style="color: #0B1B2B;">Your Executive Team:</h3>
            <ul style="color: #6B7280;">
              <li><strong>Priority Support:</strong> +44 20 3105 9566</li>
              <li><strong>Direct Email:</strong> executive@therelonetwork.com</li>
              <li><strong>Reference:</strong> ${referenceId}</li>
            </ul>
            
            <p>We're excited to make your London relocation effortless.</p>
            
            <p>Best regards,<br>
            <strong>The Executive Team</strong><br>
            Relo Network</p>
          </div>
        </div>
      `
    },
    
    {
      trigger: "strategy_call_booked",
      delay: 0,
      subject: "Strategy Call Confirmed - Preparation Details",
      template: (name: string, callTime: string, referenceId: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0B1B2B; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0;">Strategy Call Confirmed</h1>
            <p style="margin: 10px 0 0 0;">Your 60-minute consultation is scheduled</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #0B1B2B;">Dear ${name},</h2>
            
            <p>Your strategy call is confirmed for <strong>${callTime}</strong>.</p>
            
            <div style="background: #C9A24A; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0;">Call Details</h3>
              <p style="margin: 0;"><strong>Time:</strong> ${callTime}</p>
              <p style="margin: 5px 0 0 0;"><strong>Duration:</strong> 60 minutes</p>
              <p style="margin: 5px 0 0 0;"><strong>Reference:</strong> ${referenceId}</p>
            </div>
            
            <h3 style="color: #0B1B2B;">What We'll Cover:</h3>
            <ul style="color: #6B7280;">
              <li>Review your relocation requirements in detail</li>
              <li>Discuss area recommendations based on your lifestyle</li>
              <li>Outline your bespoke property shortlist approach</li>
              <li>Identify the 3 partners best suited to your needs</li>
              <li>Set timeline expectations for your 30-day support window</li>
            </ul>
            
            <h3 style="color: #0B1B2B;">Please Have Ready:</h3>
            <ul style="color: #6B7280;">
              <li>Any additional location preferences or requirements</li>
              <li>Questions about specific London areas</li>
              <li>Your ideal timeline for viewing properties</li>
            </ul>
            
            <p>Our team has already begun preparing your initial area analysis.</p>
            
            <p>Looking forward to speaking with you!</p>
            
            <p>Best regards,<br>
            <strong>The Executive Team</strong><br>
            Relo Network</p>
          </div>
        </div>
      `
    }
  ],
  
  corporateOnboarding: [
    {
      trigger: "assessment_completed",
      delay: 0,
      subject: "Corporate Assessment Received - Proposal Within 24 Hours",
      template: (name: string, company: string, referenceId: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0B1B2B; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0;">Assessment Received</h1>
            <p style="margin: 10px 0 0 0;">Corporate relocation proposal in development</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #0B1B2B;">Dear ${name},</h2>
            
            <p>Thank you for completing the Corporate Assessment for ${company}. Our team is now preparing your customised relocation proposal.</p>
            
            <div style="background: #C9A24A; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0;">Your Reference: ${referenceId}</h3>
              <p style="margin: 0;">All future communications will reference this ID</p>
            </div>
            
            <h3 style="color: #0B1B2B;">Next Steps (Next 48 Hours):</h3>
            <ol style="color: #6B7280; line-height: 1.6;">
              <li><strong>Within 24 hours:</strong> Complete proposal with volume pricing and SLAs</li>
              <li><strong>Within 48 hours:</strong> Service Level Agreement ready for signature</li>
              <li><strong>Upon approval:</strong> Dedicated account manager assignment</li>
            </ol>
            
            <h3 style="color: #0B1B2B;">Your Corporate Team:</h3>
            <ul style="color: #6B7280;">
              <li><strong>Corporate Support:</strong> +44 20 3105 9566</li>
              <li><strong>Direct Email:</strong> corporate@therelonetwork.com</li>
              <li><strong>Reference:</strong> ${referenceId}</li>
            </ul>
            
            <p>We look forward to supporting ${company}'s London relocation needs.</p>
            
            <p>Best regards,<br>
            <strong>The Corporate Team</strong><br>
            Relo Network</p>
          </div>
        </div>
      `
    }
  ]
}

export const serviceDeliveryTimelines = {
  executive: {
    emergency: {
      contactTime: "2 hours",
      strategyCall: "4 hours",
      shortlistDelivery: "24 hours",
      warmIntroductions: "7 days"
    },
    urgent: {
      contactTime: "12 hours",
      strategyCall: "24 hours", 
      shortlistDelivery: "48 hours",
      warmIntroductions: "7 days"
    },
    normal: {
      contactTime: "24 hours",
      strategyCall: "48 hours",
      shortlistDelivery: "72 hours", 
      warmIntroductions: "7 days"
    }
  },
  
  corporate: {
    assessment: "15 minutes",
    proposal: "24 hours",
    slaReady: "48 hours",
    accountManager: "72 hours",
    dashboardAccess: "72 hours"
  }
}