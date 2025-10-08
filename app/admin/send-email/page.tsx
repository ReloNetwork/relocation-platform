'use client'

import { useState } from 'react'
import { Button } from '@/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'
import { Input } from '@/ui/components/input'
import { Textarea } from '@/ui/components/textarea'
import Layout from '@/components/Layout'

// Partnership email templates for launch week
const EMAIL_TEMPLATES = {
  chancery: {
    to: 'michael.bonsor@rosewoodhotels.com',
    subject: 'Exclusive Launch Week Partnership: The Chancery Rosewood Featured in Relo Network\'s Executive Platform',
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
  <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
  </div>
  
  <div style="padding: 30px 20px;">
    <p>Dear Michael,</p>
    
    <p>I hope this email finds you well during what must be an exciting few months after The Chancery Rosewood's highly anticipated opening in Mayfair.</p>
    
    <p>This week marks the official launch of Relo Network - London's premier AI-powered relocation platform exclusively serving Fortune 500 executives and high-net-worth individuals. I'm reaching out because The Chancery Rosewood is already featured prominently in our launch content as London's newest luxury landmark, perfectly positioned for the executive accommodation market we serve.</p>
    
    <h2 style="color: #C9A24A; font-family: 'Playfair Display', Georgia, serif;">Perfect Strategic Alignment</h2>
    
    <p>Having transformed the former US Embassy into London's most prestigious extended-stay destination, The Chancery Rosewood aligns perfectly with our client profile:</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <ul>
        <li><strong>73% earn £150K+</strong>, 45% are C-suite executives</li>
        <li><strong>Average relocation budgets of £75K-200K</strong></li>
        <li><strong>Ultra-luxury accommodation requirements</strong> during London transitions</li>
        <li><strong>Sophisticated service excellence</strong> that Rosewood represents</li>
      </ul>
    </div>
    
    <h2 style="color: #C9A24A; font-family: 'Playfair Display', Georgia, serif;">Launch Week Founding Partner Opportunity</h2>
    
    <p>This is our launch week, and I'd like to invite The Chancery Rosewood to become one of our 12 exclusive Founding Partners. This category-exclusive partnership would position you as the only ultra-luxury extended-stay provider recommended by our 24/7 AI concierge to Fortune 500 executives relocating to London.</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <p style="margin: 0; font-weight: bold;">Founding Partner Benefits Include:</p>
      <ul style="margin: 10px 0;">
        <li><strong>Category Exclusivity</strong>: Only luxury extended-stay partner in our network</li>
        <li><strong>AI Priority Mentions</strong>: Direct recommendations by name from our AI concierge</li>
        <li><strong>Executive Client Introductions</strong>: Warm referrals to qualified corporate prospects</li>
        <li><strong>Monthly Newsletter Spotlight</strong>: Featured to our growing list of executive subscribers</li>
        <li><strong>Homepage Prominence</strong>: Rotating feature on our platform</li>
      </ul>
    </div>
    
    <p>Given Rosewood's reputation for serving discerning international guests and your strategic Mayfair location, this partnership represents a direct pipeline to your ideal clientele - executives requiring premium temporary accommodation while securing permanent London residences.</p>
    
    <p>The Founding Partner Charter closes this Friday, October 10th. I've attached our comprehensive media pack detailing the partnership structure and exclusive benefits available to founding members.</p>
    
    <p>Would you be available for a brief call this week to discuss how this partnership can support The Chancery Rosewood's business objectives as you continue in your launch period of this exceptional property?</p>
    
    <p>I look forward to welcoming The Chancery Rosewood as a Founding Partner in London's premier executive relocation network.</p>
    
    <p>Best regards,</p>
    
    <div style="margin: 30px 0;">
      <p style="margin: 0;"><strong>Calistar Ankrah</strong></p>
      <p style="margin: 0;">Founder, Relo Network</p>
      <p style="margin: 0;">✉ hello@therelonetwork.com</p>
      <p style="margin: 0;">☎ +44 (0)20 3105 9566</p>
      <p style="margin: 0;">◆ +44 (0) 7947 115 194</p>
      <p style="margin: 0;">◇ <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a></p>
    </div>
  </div>
  
  <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
    <p style="margin: 0; font-size: 12px; color: #6B7280;">
      Relo Network Ltd | London, United Kingdom<br>
      <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
    </p>
  </div>
</div>
    `
  },
  fragomen: {
    to: 'gkoureas@fragomen.com',
    subject: 'Exclusive Launch Week Partnership: Fragomen Featured in Relo Network\'s Executive Platform',
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
  <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
  </div>
  
  <div style="padding: 30px 20px;">
    <p>Dear George,</p>
    
    <p>Congratulations on Fragomen being recognized as 2024 Corporate Immigration Firm of the Year at the Lexology Index Awards - a testament to your continued excellence in serving Fortune 500 clients globally.</p>
    
    <p>This week marks the launch of Relo Network, London's premier AI-powered relocation platform exclusively serving Fortune 500 executives and high-net-worth individuals. With Fragomen's 70+ years of expertise and your leadership of the European operations, I believe there's a compelling strategic alignment worth exploring.</p>
    
    <h2 style="color: #C9A24A; font-family: 'Playfair Display', Georgia, serif;">Perfect Market Alignment</h2>
    
    <p>Our platform directly addresses the challenge you face: connecting with qualified corporate prospects requiring complex London visa processing. Our client profile matches perfectly with Fragomen's expertise:</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <ul>
        <li><strong>100+ Fortune 500 companies</strong> in our network requiring UK immigration services</li>
        <li><strong>45% C-suite executives</strong> needing Global Talent visas and investor routes</li>
        <li><strong>Average £15K-45K immigration budgets</strong> per executive relocation</li>
        <li><strong>Complex timelines</strong> requiring the expertise and processing capabilities Fragomen provides</li>
      </ul>
    </div>
    
    <h2 style="color: #C9A24A; font-family: 'Playfair Display', Georgia, serif;">Founding Partner Opportunity</h2>
    
    <p>I'd like to invite Fragomen to become one of our exclusive Founding Partners. This category-exclusive partnership would position you as the only immigration law firm recommended by our 24/7 AI concierge, providing direct referrals to pre-qualified Fortune 500 executives requiring:</p>
    
    <ul>
      <li>Global Talent visas for exceptional achievement</li>
      <li>Intra-company transfers for senior executives</li>
      <li>Investor visas for private equity and venture capital professionals</li>
      <li>Complex corporate immigration structures</li>
    </ul>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <p style="margin: 0; font-weight: bold;">Partnership Benefits Include:</p>
      <ul style="margin: 10px 0;">
        <li><strong>Exclusive Category Position</strong>: Only immigration partner in our network</li>
        <li><strong>AI-Powered Referrals</strong>: Direct mentions by name in client consultations</li>
        <li><strong>Fortune 500 Pipeline</strong>: Warm introductions to qualified corporate prospects</li>
        <li><strong>Executive Newsletter Features</strong>: Showcase to our growing list of executive subscribers</li>
        <li><strong>Performance Analytics</strong>: Track ROI on partnership investment</li>
      </ul>
    </div>
    
    <p>Given Fragomen's track record with Fortune 500 technology executives, private equity managing directors, and investment banking VPs, this partnership creates a direct channel to exactly the clients you serve best.</p>
    
    <p>The Founding Partner Charter closes this Friday, October 10th. I've attached our comprehensive media pack detailing the partnership structure and exclusive benefits available to founding members.</p>
    
    <p>Would you be available for a brief call this week to discuss how this partnership can support Fragomen's business development objectives in the London market?</p>
    
    <p>Best regards,</p>
    
    <div style="margin: 30px 0;">
      <p style="margin: 0;"><strong>Calistar Ankrah</strong></p>
      <p style="margin: 0;">Founder, Relo Network</p>
      <p style="margin: 0;">✉ hello@therelonetwork.com</p>
      <p style="margin: 0;">☎ +44 (0)20 3105 9566</p>
      <p style="margin: 0;">◆ +44 (0) 7947 115 194</p>
      <p style="margin: 0;">◇ <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a></p>
    </div>
  </div>
  
  <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
    <p style="margin: 0; font-size: 12px; color: #6B7280;">
      Relo Network Ltd | London, United Kingdom<br>
      <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
    </p>
  </div>
</div>
    `
  },
  asl: {
    to: 'asherman@asl.org',
    subject: 'Exclusive Launch Week Partnership: ASL Featured in Relo Network\'s Executive Platform',
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
  <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
  </div>
  
  <div style="padding: 30px 20px;">
    <p>Dear Andy,</p>
    
    <p>Congratulations on your recent appointment as Head of School at ASL. Your leadership comes at an exciting time as the demand for premium international education continues to grow among globally mobile executive families.</p>
    
    <p>This week marks the launch of Relo Network - London's premier AI-powered relocation platform exclusively serving Fortune 500 executives and high-net-worth individuals. Given ASL's exceptional track record with internationally mobile professionals (67% of your families), I see a compelling strategic opportunity worth exploring.</p>
    
    <h2 style="color: #C9A24A; font-family: 'Playfair Display', Georgia, serif;">Perfect Demographic Match</h2>
    
    <p>Our platform connects directly with your ideal demographic:</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <ul>
        <li><strong>Fortune 500 executives with families</strong> requiring school placements</li>
        <li><strong>89% international relocations</strong> needing seamless educational transitions</li>
        <li><strong>Average £10K-25K education budgets</strong> per family relocation</li>
        <li><strong>Mid-year transfer requirements</strong> where ASL's specialization shines</li>
      </ul>
    </div>
    
    <p>ASL's impressive outcomes speak directly to our clientele: 94% university acceptance rate, 78% to top-tier institutions, with graduates attending Harvard, Stanford, MIT, Oxford, Cambridge, and Imperial College. These results resonate perfectly with achievement-oriented executive families.</p>
    
    <h2 style="color: #C9A24A; font-family: 'Playfair Display', Georgia, serif;">Founding Partner Opportunity</h2>
    
    <p>I'd like to invite ASL to become one of our exclusive Founding Partners. This category-exclusive partnership would position you as the only international school recommended by our 24/7 AI concierge to Fortune 500 families relocating to London.</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <p style="margin: 0; font-weight: bold;">Partnership Benefits Include:</p>
      <ul style="margin: 10px 0;">
        <li><strong>Exclusive Education Category</strong>: Only school partner in our network</li>
        <li><strong>Executive Family Pipeline</strong>: Direct referrals to qualified prospects</li>
        <li><strong>AI Priority Recommendations</strong>: Mentioned by name during family consultations</li>
        <li><strong>Thought Leadership Platform</strong>: Monthly features to our growing list of executives</li>
        <li><strong>Seamless Placement Channel</strong>: For families with relocation timelines</li>
      </ul>
    </div>
    
    <p>This partnership addresses your strategic objectives while serving families who value ASL's American curriculum continuity, IB excellence, and social integration programs that ease the transition for executive children.</p>
    
    <p>The Founding Partner Charter closes this Friday, October 10th. I've attached our comprehensive media pack detailing the partnership structure and exclusive benefits available to founding members.</p>
    
    <p>Would you be available for a brief call this week to discuss how this partnership can support ASL's enrollment objectives and serve the globally mobile executive community?</p>
    
    <p>Best regards,</p>
    
    <div style="margin: 30px 0;">
      <p style="margin: 0;"><strong>Calistar Ankrah</strong></p>
      <p style="margin: 0;">Founder, Relo Network</p>
      <p style="margin: 0;">✉ hello@therelonetwork.com</p>
      <p style="margin: 0;">☎ +44 (0)20 3105 9566</p>
      <p style="margin: 0;">◆ +44 (0) 7947 115 194</p>
      <p style="margin: 0;">◇ <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a></p>
    </div>
  </div>
  
  <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
    <p style="margin: 0; font-size: 12px; color: #6B7280;">
      Relo Network Ltd | London, United Kingdom<br>
      <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
    </p>
  </div>
</div>
    `
  },
  coutts: {
    to: 'emma.crystal@coutts.com',
    subject: 'Exclusive Launch Week Partnership: Coutts Featured in Relo Network\'s Executive Platform',
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
  <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
  </div>
  
  <div style="padding: 30px 20px;">
    <p>Dear Emma,</p>
    
    <p>Congratulations on your appointment as CEO of Coutts and Wealth Businesses. Your extensive experience with Credit Suisse's Wealth Management for Northern & Western Europe positions you perfectly to understand the sophisticated banking needs of internationally mobile executives.</p>
    
    <p>This week marks the launch of Relo Network - London's premier AI-powered relocation platform exclusively serving Fortune 500 executives and high-net-worth individuals. Given Coutts' Royal Warrant status and expertise in non-domicile structuring, I see a compelling strategic alignment worth exploring.</p>
    
    <h2 style="color: #C9A24A; font-family: 'Playfair Display', Georgia, serif;">Ideal Client Match</h2>
    
    <p>Our platform connects directly with Coutts' ideal clientele:</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <ul>
        <li><strong>73% of clients earn £150K+ annually</strong> with significant assets requiring private banking</li>
        <li><strong>Fortune 500 executives</strong> needing sophisticated financial architecture for London relocations</li>
        <li><strong>Non-domicile tax optimization</strong> requirements matching Coutts' specialization</li>
        <li><strong>£75K-200K relocation budgets</strong> indicating substantial wealth management potential</li>
      </ul>
    </div>
    
    <p>Your background in sustainable finance and wealth management for high-net-worth Europeans aligns perfectly with our client base - international business leaders requiring the sophisticated banking setup that optimizes their London transition.</p>
    
    <h2 style="color: #C9A24A; font-family: 'Playfair Display', Georgia, serif;">Founding Partner Opportunity</h2>
    
    <p>I'd like to invite Coutts to become one of our exclusive Founding Partners. This category-exclusive partnership would position you as the only private bank recommended by our 24/7 AI concierge to Fortune 500 executives relocating to London.</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <p style="margin: 0; font-weight: bold;">Partnership Benefits Include:</p>
      <ul style="margin: 10px 0;">
        <li><strong>Exclusive Private Banking Category</strong>: Only wealth management partner in our network</li>
        <li><strong>Executive Client Pipeline</strong>: Direct referrals to pre-qualified prospects</li>
        <li><strong>AI Priority Mentions</strong>: Recommended by name for non-domicile structuring</li>
        <li><strong>Thought Leadership Platform</strong>: Monthly features to our growing list of wealthy executives</li>
        <li><strong>International Banking Showcase</strong>: Highlight cross-border capabilities</li>
      </ul>
    </div>
    
    <p>This partnership supports your strategic objectives by connecting Coutts with exactly the internationally mobile, high-net-worth individuals who require the sophisticated financial services, tax optimization, and private banking excellence that define the Coutts experience.</p>
    
    <p>The Founding Partner Charter closes this Friday, October 10th. I've attached our comprehensive media pack detailing the partnership structure and exclusive benefits available to founding members.</p>
    
    <p>Could we schedule a brief call this week to discuss how this partnership can accelerate Coutts' business development objectives in the executive wealth management space?</p>
    
    <p>Best regards,</p>
    
    <div style="margin: 30px 0;">
      <p style="margin: 0;"><strong>Calistar Ankrah</strong></p>
      <p style="margin: 0;">Founder, Relo Network</p>
      <p style="margin: 0;">✉ hello@therelonetwork.com</p>
      <p style="margin: 0;">☎ +44 (0)20 3105 9566</p>
      <p style="margin: 0;">◆ +44 (0) 7947 115 194</p>
      <p style="margin: 0;">◇ <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a></p>
    </div>
  </div>
  
  <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
    <p style="margin: 0; font-size: 12px; color: #6B7280;">
      Relo Network Ltd | London, United Kingdom<br>
      <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
    </p>
  </div>
</div>
    `
  },
  ubs: {
    to: 'beatriz.martinjimenez@ubs.com',
    subject: 'Exclusive Launch Week Partnership: UBS Featured in Relo Network\'s Executive Platform',
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
  <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
  </div>
  
  <div style="padding: 30px 20px;">
    <p>Dear Beatriz,</p>
    
    <p>Congratulations on your continued leadership as CEO UBS UK and your expanded role as President UBS EMEA. Your vision in building UBS's presence across the region positions you perfectly to understand the sophisticated wealth management needs of internationally mobile executives.</p>
    
    <p>This week marks the launch of Relo Network - London's premier AI-powered relocation platform exclusively serving Fortune 500 executives and high-net-worth individuals. Given UBS's global leadership in wealth management and your strategic oversight of the London operations, I see a compelling opportunity worth exploring.</p>
    
    <h2 style="color: #C9A24A; font-family: 'Playfair Display', Georgia, serif;">Target Demographic Alignment</h2>
    
    <p>Our platform connects directly with UBS's target demographic:</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <ul>
        <li><strong>73% of clients earn £150K+ annually</strong> with substantial investment portfolios</li>
        <li><strong>Fortune 500 executives</strong> requiring sophisticated wealth management during London transitions</li>
        <li><strong>International banking needs</strong> matching UBS's global capabilities</li>
        <li><strong>£75K-200K relocation budgets</strong> indicating significant wealth management potential</li>
      </ul>
    </div>
    
    <p>Your leadership in sustainability and impact investing also aligns with our clientele - forward-thinking executives who value responsible wealth management alongside performance excellence.</p>
    
    <h2 style="color: #C9A24A; font-family: 'Playfair Display', Georgia, serif;">Founding Partner Opportunity</h2>
    
    <p>I'd like to invite UBS to become one of our exclusive Founding Partners. This category-exclusive partnership would position you as the only global private bank recommended by our 24/7 AI concierge to Fortune 500 executives relocating to London.</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <p style="margin: 0; font-weight: bold;">Partnership Benefits Include:</p>
      <ul style="margin: 10px 0;">
        <li><strong>Exclusive Global Banking Category</strong>: Only international private bank in our network</li>
        <li><strong>Executive Client Pipeline</strong>: Direct referrals to pre-qualified high-net-worth prospects</li>
        <li><strong>AI Priority Recommendations</strong>: Mentioned by name for international wealth management</li>
        <li><strong>Thought Leadership Platform</strong>: Monthly features to our growing list of wealthy executives</li>
        <li><strong>Cross-Border Expertise Showcase</strong>: Highlight UBS's global banking capabilities</li>
      </ul>
    </div>
    
    <p>This partnership supports your strategic objectives by connecting UBS with internationally mobile, high-net-worth executives who require the global wealth management expertise, investment solutions, and private banking excellence that define the UBS experience.</p>
    
    <p>The Founding Partner Charter closes this Friday, October 10th. I've attached our comprehensive media pack detailing the partnership structure and exclusive benefits available to founding members.</p>
    
    <p>Could we schedule a brief call this week to discuss how this partnership can accelerate UBS's business development objectives with Fortune 500 executives?</p>
    
    <p>Best regards,</p>
    
    <div style="margin: 30px 0;">
      <p style="margin: 0;"><strong>Calistar Ankrah</strong></p>
      <p style="margin: 0;">Founder, Relo Network</p>
      <p style="margin: 0;">✉ hello@therelonetwork.com</p>
      <p style="margin: 0;">☎ +44 (0)20 3105 9566</p>
      <p style="margin: 0;">◆ +44 (0) 7947 115 194</p>
      <p style="margin: 0;">◇ <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a></p>
    </div>
  </div>
  
  <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
    <p style="margin: 0; font-size: 12px; color: #6B7280;">
      Relo Network Ltd | London, United Kingdom<br>
      <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
    </p>
  </div>
</div>
    `
  },
  juliusbaer: {
    to: 'david.durlacher@juliusbaer.com',
    subject: 'Exclusive Launch Week Partnership: Julius Baer Featured in Relo Network\'s Executive Platform',
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
  <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
  </div>
  
  <div style="padding: 30px 20px;">
    <p>Dear David,</p>
    
    <p>Your leadership of Julius Baer International's UK and Guernsey operations comes at an exciting time as London continues to attract the world's most successful executives and entrepreneurs. Your extensive experience in private banking perfectly positions you to understand the sophisticated wealth management needs of internationally mobile leaders.</p>
    
    <p>This week marks the launch of Relo Network - London's premier AI-powered relocation platform exclusively serving Fortune 500 executives and high-net-worth individuals. Given Julius Baer's reputation for serving discerning international clients and your strategic leadership in London, I see a compelling alignment worth exploring.</p>
    
    <h2 style="color: #C9A24A; font-family: 'Playfair Display', Georgia, serif;">Ideal Client Profile</h2>
    
    <p>Our platform connects directly with Julius Baer's ideal clientele:</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <ul>
        <li><strong>Fortune 500 executives</strong> with substantial wealth requiring sophisticated private banking</li>
        <li><strong>73% earn £150K+ annually</strong> with complex international financial structures</li>
        <li><strong>High-net-worth individuals</strong> needing wealth preservation and tax-efficient solutions</li>
        <li><strong>£75K-200K relocation budgets</strong> indicating significant investment potential</li>
      </ul>
    </div>
    
    <p>Julius Baer's heritage since 1890 and expertise in serving international clients aligns perfectly with our executive base - successful leaders who value the personalized service, investment expertise, and discretion that define Swiss private banking excellence.</p>
    
    <h2 style="color: #C9A24A; font-family: 'Playfair Display', Georgia, serif;">Founding Partner Opportunity</h2>
    
    <p>I'd like to invite Julius Baer to become one of our exclusive Founding Partners. This category-exclusive partnership would position you as the only Swiss private bank recommended by our 24/7 AI concierge to Fortune 500 executives relocating to London.</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <p style="margin: 0; font-weight: bold;">Partnership Benefits Include:</p>
      <ul style="margin: 10px 0;">
        <li><strong>Exclusive Swiss Banking Category</strong>: Only Swiss private bank in our network</li>
        <li><strong>Executive Client Pipeline</strong>: Direct referrals to pre-qualified wealthy prospects</li>
        <li><strong>AI Priority Mentions</strong>: Recommended by name for sophisticated wealth management</li>
        <li><strong>Thought Leadership Platform</strong>: Monthly features to our growing list of high-net-worth executives</li>
        <li><strong>Swiss Excellence Showcase</strong>: Highlight Julius Baer's private banking heritage</li>
      </ul>
    </div>
    
    <p>This partnership supports your strategic objectives by connecting Julius Baer with exactly the internationally mobile, high-net-worth executives who require the sophisticated wealth management, investment solutions, and private banking excellence that Julius Baer has delivered for over 130 years.</p>
    
    <p>The Founding Partner Charter closes this Friday, October 10th. I've attached our comprehensive media pack detailing the partnership structure and exclusive benefits available to founding members.</p>
    
    <p>Would you be available for a brief call this week to discuss how this partnership can support Julius Baer's London business development objectives?</p>
    
    <p>Best regards,</p>
    
    <div style="margin: 30px 0;">
      <p style="margin: 0;"><strong>Calistar Ankrah</strong></p>
      <p style="margin: 0;">Founder, Relo Network</p>
      <p style="margin: 0;">✉ hello@therelonetwork.com</p>
      <p style="margin: 0;">☎ +44 (0)20 3105 9566</p>
      <p style="margin: 0;">◆ +44 (0) 7947 115 194</p>
      <p style="margin: 0;">◇ <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a></p>
    </div>
  </div>
  
  <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
    <p style="margin: 0; font-size: 12px; color: #6B7280;">
      Relo Network Ltd | London, United Kingdom<br>
      <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
    </p>
  </div>
</div>
    `
  }
}

export default function AdminSendEmail() {
  const [to, setTo] = useState(EMAIL_TEMPLATES.chancery.to)
  const [subject, setSubject] = useState(EMAIL_TEMPLATES.chancery.subject)
  const [html, setHtml] = useState(EMAIL_TEMPLATES.chancery.html)
  const [from, setFrom] = useState('hello@therelonetwork.com')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; error?: string } | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState('chancery')
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null)

  const handleSend = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      let attachmentData = null
      
      // Convert file to base64 if attachment exists
      if (attachmentFile) {
        const reader = new FileReader()
        attachmentData = await new Promise((resolve, reject) => {
          reader.onload = () => {
            const base64 = reader.result as string
            const base64Data = base64.split(',')[1] // Remove data:application/pdf;base64, prefix
            resolve({
              content: base64Data,
              filename: attachmentFile.name,
              type: attachmentFile.type
            })
          }
          reader.onerror = reject
          reader.readAsDataURL(attachmentFile)
        })
      }
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          subject,
          html,
          from,
          replyTo: from,
          attachment: attachmentData
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setResult({ 
          success: true, 
          message: `Email sent successfully! Message ID: ${data.messageId}` 
        })
      } else {
        setResult({ 
          success: false, 
          message: 'Failed to send email', 
          error: data.details || data.error 
        })
      }
    } catch (error) {
      setResult({ 
        success: false, 
        message: 'Network error occurred', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      })
    } finally {
      setLoading(false)
    }
  }

  const loadTemplate = (templateKey: string) => {
    const template = EMAIL_TEMPLATES[templateKey as keyof typeof EMAIL_TEMPLATES]
    if (template) {
      setTo(template.to)
      setSubject(template.subject)
      setHtml(template.html)
      setSelectedTemplate(templateKey)
    }
  }

  const templateOptions = [
    { key: 'chancery', label: 'The Chancery Rosewood - Michael Bonsor' },
    { key: 'fragomen', label: 'Fragomen Immigration - George Koureas' },
    { key: 'asl', label: 'American School London - Andy Sherman' },
    { key: 'coutts', label: 'Coutts Private Bank - Emma Crystal' },
    { key: 'ubs', label: 'UBS London - Beatriz Martin Jimenez' },
    { key: 'juliusbaer', label: 'Julius Baer - David Durlacher' }
  ]

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-[#FAFAF9] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Launch Week Partnership Outreach
            </h1>
            <p className="text-[#6B7280]">
              Send professionally branded partnership emails to secure founding partners
            </p>
            <div className="mt-3 p-3 bg-[#FECACA] border border-[#EF4444] rounded-md">
              <p className="text-sm text-[#7F1D1D]">
                <strong>⚠ URGENT - LAUNCH WEEK:</strong> Partners confirmed before Friday can be included in official launch announcements. Limited Founding Partner slots - competing interest for each category!
              </p>
            </div>
            <div className="mt-3 p-3 bg-[#D1FAE5] border border-[#10B981] rounded-md">
              <p className="text-sm text-[#065F46]">
                <strong>✓ PDF Attachment System:</strong> Upload your media pack PDF below and it will be automatically attached to all outgoing emails.
              </p>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Launch Week Partnership Emails</CardTitle>
              <CardDescription>
                Select and send personalized partnership emails to key decision makers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#6B7280] mb-2 block">Partnership Email Template</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {templateOptions.map((option) => (
                    <Button
                      key={option.key}
                      onClick={() => loadTemplate(option.key)}
                      variant={selectedTemplate === option.key ? "default" : "outline"}
                      className={`justify-start text-left h-auto py-3 px-4 ${
                        selectedTemplate === option.key 
                          ? 'bg-[#C9A24A] hover:bg-[#B8923D] text-white' 
                          : 'hover:bg-[#F8F9FA]'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-sm">{option.label.split(' - ')[0]}</div>
                        <div className="text-xs opacity-75">{option.label.split(' - ')[1]}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#6B7280] mb-2 block">From</label>
                  <Input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="hello@therelonetwork.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#6B7280] mb-2 block">To</label>
                  <Input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="recipient@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#6B7280] mb-2 block">Subject</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#6B7280] mb-2 block">PDF Attachment</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setAttachmentFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <div className="text-gray-600 mb-2">
                      <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-sm font-medium">Click to upload PDF or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF files only</p>
                    </div>
                  </label>
                  {attachmentFile && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                      ✓ {attachmentFile.name} ({(attachmentFile.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#6B7280] mb-2 block">Email Content (HTML)</label>
                <Textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  placeholder="Email HTML content"
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>

              <Button 
                onClick={handleSend}
                disabled={loading || !to || !subject || !html}
                className="bg-[#C9A24A] hover:bg-[#B8923D] w-full"
              >
                {loading ? 'Sending...' : 'Send Email'}
              </Button>

              {result && (
                <div className={`p-4 rounded-md ${
                  result.success 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`text-sm font-medium ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.message}
                  </p>
                  {result.error && (
                    <p className="text-xs text-red-600 mt-1">{result.error}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Launch Week Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">▶ Partnership Email Strategy</h4>
                  <p className="text-[#6B7280]">6 key decision makers identified with personalized, research-backed outreach</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">● Target Companies</h4>
                  <ul className="text-[#6B7280] ml-4 list-disc space-y-1">
                    <li>The Chancery Rosewood (Ultra-luxury accommodation)</li>
                    <li>Fragomen Immigration (Corporate visa services)</li>
                    <li>American School London (Executive education)</li>
                    <li>Coutts, UBS, Julius Baer (Private banking)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">◐ Launch Week Timeline</h4>
                  <p className="text-[#6B7280]">Founding Partner Charter - Launch Week enrollment</p>
                  <p className="text-[#7F1D1D] font-medium">⚠ Partners confirmed before Friday included in launch announcements!</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">▲ Competitive Pressure</h4>
                  <p className="text-[#6B7280]">Multiple companies competing for each category - emphasize limited slots and urgency</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">✓ PDF Attachment System</h4>
                  <p className="text-[#6B7280]">Upload your media pack PDF and it will be automatically attached to all emails</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}