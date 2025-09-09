'use client'

import React, { useState, useEffect } from 'react'
import { Phone, Clock, Shield, Trophy, AlertTriangle, Calculator, Building, Users, CheckCircle, Star, ArrowRight, Zap, Target, Globe, BarChart3, Award, UserCheck, FileText, Briefcase, TrendingUp, ChevronDown, ChevronRight, MapPin, HeadphonesIcon } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'
import { getAllCorporateSchemas } from '../../lib/seo/corporate-schemas'

const ExecutiveCard = ({ name, role, credentials, image, expertise }: { 
  name: string, 
  role: string, 
  credentials: string[], 
  image: string,
  expertise: string[]
}) => (
  <div className="bg-white rounded-lg p-6 border border-[#0B1B2B]/10 shadow-sm">
    <div className="flex items-start gap-4 mb-4">
      <div className="w-20 h-20 bg-[#C9A24A]/10 rounded-full flex items-center justify-center text-2xl font-bold text-[#C9A24A]">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-[#0B1B2B] mb-1">{name}</h3>
        <p className="text-[#C9A24A] font-semibold mb-2">{role}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {credentials.map((cred, idx) => (
            <span key={idx} className="bg-[#0B1B2B]/5 text-[#0B1B2B] px-2 py-1 rounded text-xs font-medium">
              {cred}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div>
      <div className="text-sm font-medium text-[#0B1B2B] mb-2">Specializations:</div>
      <ul className="space-y-1">
        {expertise.map((item, idx) => (
          <li key={idx} className="text-[#6B7280] text-sm flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-[#C9A24A] flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const MethodologyStep = ({ number, title, description, details, duration }: { 
  number: string, 
  title: string, 
  description: string,
  details: string[],
  duration: string
}) => {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <div className="bg-white rounded-lg p-6 border border-[#0B1B2B]/10 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#C9A24A] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
          {number}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-2">{title}</h3>
              <p className="text-[#6B7280] mb-2">{description}</p>
              <div className="inline-block bg-[#C9A24A]/10 text-[#C9A24A] px-3 py-1 rounded-full text-sm font-semibold">
                {duration}
              </div>
            </div>
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-[#C9A24A] hover:text-[#B8923D] transition-colors"
            >
              {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
          
          {expanded && (
            <div className="border-t border-[#E5E7EB] pt-4 mt-4">
              <h4 className="font-semibold text-[#0B1B2B] mb-3">Detailed Process:</h4>
              <ul className="space-y-2">
                {details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C9A24A] mt-0.5 flex-shrink-0" />
                    <span className="text-[#6B7280] text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    employeeLevel: 'senior',
    numberOfEmployees: 5,
    averageSalary: 150000,
    relocationType: 'permanent',
    timeframe: 'standard'
  })

  const industryBenchmarks = {
    'investment-banking': { multiplier: 1.4, avgCost: 45000, successRate: 0.73 },
    'consulting': { multiplier: 1.2, avgCost: 35000, successRate: 0.78 },
    'technology': { multiplier: 1.1, avgCost: 32000, successRate: 0.82 },
    'pharmaceuticals': { multiplier: 1.3, avgCost: 38000, successRate: 0.75 },
    'oil-gas': { multiplier: 1.5, avgCost: 52000, successRate: 0.71 }
  }

  const calculateROI = () => {
    const baseCost = 25000
    const employeeCount = inputs.numberOfEmployees
    const totalInvestment = baseCost * employeeCount
    
    // Calculate benefits
    const retentionSavings = inputs.averageSalary * 0.3 * employeeCount * 0.95 // 95% retention vs 70% industry avg
    const productivityGains = inputs.averageSalary * 0.15 * employeeCount // 15% faster integration
    const recruitmentSavings = inputs.averageSalary * 0.25 * employeeCount * 0.05 // Reduced re-hiring
    
    const totalBenefits = retentionSavings + productivityGains + recruitmentSavings
    const netROI = totalBenefits - totalInvestment
    const roiPercentage = Math.round((netROI / totalInvestment) * 100)
    
    return {
      investment: totalInvestment,
      benefits: Math.round(totalBenefits),
      netROI: Math.round(netROI),
      roiPercentage,
      retentionSavings: Math.round(retentionSavings),
      productivityGains: Math.round(productivityGains),
      recruitmentSavings: Math.round(recruitmentSavings)
    }
  }

  const results = calculateROI()

  return (
    <div className="bg-white rounded-lg p-8 border border-[#0B1B2B]/10 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-8 w-8 text-[#C9A24A]" />
        <h3 className="text-2xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Corporate ROI Calculator
        </h3>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Employee Level</label>
            <select 
              value={inputs.employeeLevel}
              onChange={(e) => setInputs({...inputs, employeeLevel: e.target.value})}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            >
              <option value="senior">Senior Managers</option>
              <option value="executive">Vice Presidents</option>
              <option value="c-level">C-Suite Executives</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Number of Employees</label>
            <input
              type="number"
              min="1"
              max="100"
              value={inputs.numberOfEmployees}
              onChange={(e) => setInputs({...inputs, numberOfEmployees: parseInt(e.target.value) || 1})}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Average Annual Salary (£)</label>
            <input
              type="number"
              min="50000"
              max="1000000"
              step="10000"
              value={inputs.averageSalary}
              onChange={(e) => setInputs({...inputs, averageSalary: parseInt(e.target.value) || 150000})}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Relocation Type</label>
            <select 
              value={inputs.relocationType}
              onChange={(e) => setInputs({...inputs, relocationType: e.target.value})}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            >
              <option value="permanent">Permanent Relocation</option>
              <option value="assignment">Long-term Assignment (2-5 years)</option>
              <option value="project">Project-based (1-2 years)</option>
            </select>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-[#0B1B2B] mb-4">Projected ROI Analysis</h4>
          <div className="space-y-4">
            <div className="bg-[#C9A24A]/5 rounded-lg p-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#C9A24A] mb-2">{results.roiPercentage}%</div>
                <div className="text-[#0B1B2B] font-semibold">Projected ROI</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-[#6B7280]">Total Investment</span>
                <span className="font-semibold text-[#0B1B2B]">£{results.investment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-[#6B7280]">Retention Savings</span>
                <span className="font-semibold text-green-600">£{results.retentionSavings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-[#6B7280]">Productivity Gains</span>
                <span className="font-semibold text-green-600">£{results.productivityGains.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                <span className="text-[#6B7280]">Recruitment Savings</span>
                <span className="font-semibold text-green-600">£{results.recruitmentSavings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t-2 border-[#0B1B2B]">
                <span className="font-bold text-[#0B1B2B]">Net ROI</span>
                <span className="text-2xl font-bold text-[#C9A24A]">£{results.netROI.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#FAFAF9] rounded-lg border">
            <div className="text-sm text-[#6B7280] mb-2">
              <strong>Industry Benchmark:</strong> Our managed relocations achieve 94% success rate vs 73% industry average
            </div>
            <div className="text-sm text-[#6B7280]">
              <strong>Time to Productivity:</strong> 6.2 weeks vs 12.5 weeks industry average
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ServicePackage = ({ 
  name, 
  description, 
  pricing, 
  features, 
  industryFocus, 
  isEnterprise = false 
}: {
  name: string
  description: string
  pricing: string
  features: string[]
  industryFocus: string[]
  isEnterprise?: boolean
}) => (
  <div className={`bg-white rounded-lg p-8 border ${isEnterprise ? 'border-[#C9A24A] ring-2 ring-[#C9A24A]/20' : 'border-[#0B1B2B]/10'} shadow-sm hover:shadow-lg transition-all`}>
    {isEnterprise && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div className="bg-[#C9A24A] text-white px-6 py-2 rounded-full text-sm font-semibold">
          ENTERPRISE
        </div>
      </div>
    )}
    
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>{name}</h3>
      <p className="text-[#6B7280] mb-4">{description}</p>
      <div className="text-3xl font-bold text-[#C9A24A] mb-2">{pricing}</div>
      <div className="text-sm text-[#6B7280]">per employee</div>
    </div>

    <div className="mb-6">
      <h4 className="font-semibold text-[#0B1B2B] mb-3">Service Features:</h4>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-[#C9A24A] mt-0.5 flex-shrink-0" />
            <span className="text-[#6B7280] text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="border-t border-[#E5E7EB] pt-4">
      <h4 className="font-semibold text-[#0B1B2B] mb-3">Industry Specialization:</h4>
      <div className="flex flex-wrap gap-2">
        {industryFocus.map((industry, idx) => (
          <span key={idx} className="bg-[#C9A24A]/10 text-[#C9A24A] px-2 py-1 rounded text-xs font-medium">
            {industry}
          </span>
        ))}
      </div>
    </div>

    <div className="mt-6">
      <Button 
        className={`w-full rounded-md ${isEnterprise ? 'bg-[#C9A24A] hover:bg-[#B8923D]' : 'bg-[#0B1B2B] hover:bg-[#0B1B2B]/90'} text-white`}
      >
        Get Detailed Proposal <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
)

const CaseStudy = ({ 
  company, 
  industry, 
  challenge, 
  solution, 
  results, 
  metrics 
}: {
  company: string
  industry: string
  challenge: string
  solution: string
  results: string
  metrics: { label: string, value: string, improvement: string }[]
}) => (
  <div className="bg-white rounded-lg p-8 border border-[#0B1B2B]/10 shadow-sm">
    <div className="flex items-start gap-4 mb-6">
      <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center">
        <Building className="h-8 w-8 text-[#C9A24A]" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#0B1B2B] mb-1">{company}</h3>
        <p className="text-[#C9A24A] font-semibold">{industry}</p>
      </div>
    </div>

    <div className="space-y-4 mb-6">
      <div>
        <h4 className="font-semibold text-[#0B1B2B] mb-2">Challenge:</h4>
        <p className="text-[#6B7280] text-sm">{challenge}</p>
      </div>
      
      <div>
        <h4 className="font-semibold text-[#0B1B2B] mb-2">Solution:</h4>
        <p className="text-[#6B7280] text-sm">{solution}</p>
      </div>
      
      <div>
        <h4 className="font-semibold text-[#0B1B2B] mb-2">Results:</h4>
        <p className="text-[#6B7280] text-sm">{results}</p>
      </div>
    </div>

    <div className="border-t border-[#E5E7EB] pt-4">
      <h4 className="font-semibold text-[#0B1B2B] mb-3">Key Metrics:</h4>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="text-center">
            <div className="text-2xl font-bold text-[#C9A24A]">{metric.value}</div>
            <div className="text-[#0B1B2B] text-sm font-medium">{metric.label}</div>
            <div className="text-[#6B7280] text-xs">{metric.improvement}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default function CorporatePage() {
  const [loading, setLoading] = useState(false)
  const schemas = getAllCorporateSchemas()

  const methodology = [
    {
      number: "1",
      title: "Strategic Assessment & Planning",
      description: "Comprehensive analyses of relocation requirements, stakeholder needs, and success criteria",
      duration: "Week 1-2",
      details: [
        "Executive stakeholder interviews and needs assessment",
        "Destination market analyses and competitive landscape review",
        "Regulatory compliance and visa requirement evaluation",
        "Cost-benefit analyses and budget optimisation",
        "Risk assessment and mitigation strategy development",
        "Success metrics definition and tracking framework setup"
      ]
    },
    {
      number: "2", 
      title: "Pre-Deployment Preparation",
      description: "Comprehensive preparation phase ensuring all elements are in place before relocation",
      duration: "Week 3-6",
      details: [
        "Housing search and negotiation with premium property partners",
        "School placement assistance for executive families",
        "Tax planning and optimisation consultation",
        "Healthcare and insurance arrangement",
        "Cultural integration and orientation program setup",
        "Legal documentation and compliance preparation"
      ]
    },
    {
      number: "3",
      title: "Managed Transition & Move",
      description: "Seamless relocation execution with white-glove service and real-time coordination",
      duration: "Week 7-8", 
      details: [
        "Professional packing and secure international shipping",
        "Executive travel coordination and VIP airport services",
        "Temporary accommodation management and concierge services",
        "Home setup and essential services activation",
        "Transportation and logistics coordination",
        "24/7 emergency support and issue resolution"
      ]
    },
    {
      number: "4",
      title: "Integration & Settling Support", 
      description: "Comprehensive support ensuring full professional and personal integration",
      duration: "Week 9-16",
      details: [
        "Professional networking and industry connection facilitation",
        "Spouse career transition and job placement assistance",
        "Children's school integration and academic support",
        "Social integration and community connection programs",
        "Banking and financial services establishment",
        "Cultural mentoring and ongoing adaptation support"
      ]
    },
    {
      number: "5",
      title: "Performance Monitoring & Optimization",
      description: "Continuous monitoring and optimisation to ensure relocation success and ROI",
      duration: "Month 4-12",
      details: [
        "Regular performance reviews and success metric tracking",
        "Ongoing support and issue resolution",
        "Career development and advancement support",
        "Family satisfaction monitoring and additional services",
        "ROI reporting and optimisation recommendations",
        "Long-term retention strategy implementation"
      ]
    }
  ]

  const executiveTeam = [
    {
      name: "James Wellington-Smith",
      role: "CEO & Managing Director",
      credentials: ["MBA Cambridge", "FRICS", "CRP", "20+ Years"],
      image: "/team/james.jpg",
      expertise: [
        "C-Suite Executive Relocations",
        "Global Mobility Strategy",
        "International Business Development", 
        "Cross-border M&A Support"
      ]
    },
    {
      name: "Victoria Ashford",
      role: "Global Head of Corporate Services",
      credentials: ["MSc London Business School", "SHRM", "GPHR", "15+ Years"],
      image: "/team/victoria.jpg",
      expertise: [
        "Fortune 500 Account Management",
        "Global Talent Mobility",
        "Executive Compensation Planning",
        "International HR Strategy"
      ]
    },
    {
      name: "Marcus Chen",
      role: "Director of Client Success",
      credentials: ["PhD Imperial College", "PMP", "Six Sigma Black Belt", "12+ Years"],
      image: "/team/marcus.jpg",
      expertise: [
        "Process Optimization",
        "Client Success Management",
        "Cross-cultural Integration",
        "Performance Analytics"
      ]
    }
  ]

  const servicePackages = [
    {
      name: "Corporate Standard",
      description: "Comprehensive relocation management for senior professionals and managers",
      pricing: "£18,500",
      features: [
        "Dedicated relocation manager",
        "Housing search and negotiation support",
        "Immigration and visa assistance",
        "Shipping and logistics coordination",
        "Settling-in services (30 days)",
        "Tax consultation and planning",
        "School search assistance",
        "Cultural orientation program"
      ],
      industryFocus: ["Technology", "Consulting", "Manufacturing"]
    },
    {
      name: "Executive Plus",
      description: "Enhanced services designed for VP-level and senior executives",
      pricing: "£28,500",
      features: [
        "Everything in Corporate Standard",
        "Executive housing concierge service",
        "Spouse career transition support",
        "Private school placement assistance",
        "Premium shipping and white-glove setup",
        "Ongoing integration support (90 days)",
        "Networking and professional connections",
        "Family lifestyle and social integration"
      ],
      industryFocus: ["Investment Banking", "Private Equity", "Pharmaceuticals"]
    },
    {
      name: "C-Suite Elite",
      description: "White-glove service for C-level executives and board members",
      pricing: "£45,000+",
      isEnterprise: true,
      features: [
        "Everything in Executive Plus",
        "Dedicated C-suite account director",
        "Security consultation and arrangements",
        "Personal staff recruitment and training",
        "Board meeting and business travel coordination",
        "Reputation management support",
        "Estate planning and wealth management connections",
        "12-month comprehensive integration program",
        "Annual relationship reviews and optimisation"
      ],
      industryFocus: ["Investment Banking", "Hedge Funds", "Oil & Gas", "Telecommunications"]
    }
  ]

  const caseStudies = [
    {
      company: "Global Investment Bank",
      industry: "Investment Banking",
      challenge: "Relocating 12 senior executives to establish London European headquarters within 6 months while maintaining business continuity and client relationships.",
      solution: "Implemented phased relocation program with dedicated executive coordinators, premium temporary housing, and accelerated family integration services including private school placements and spouse career support.",
      results: "All 12 executives successfully relocated within 5 months. 100% retention rate after 18 months with strong performance metrics and client satisfaction.",
      metrics: [
        { label: "Time to Productivity", value: "4.2 weeks", improvement: "65% faster than industry" },
        { label: "Retention Rate", value: "100%", improvement: "vs 73% industry avg" },
        { label: "Client Satisfaction", value: "98%", improvement: "Above all benchmarks" },
        { label: "ROI", value: "340%", improvement: "Within 12 months" }
      ]
    },
    {
      company: "Technology Unicorn",
      industry: "Technology",
      challenge: "Rapid expansion required relocating 25 senior engineers and executives to London to establish European R&D center while competing for top talent.",
      solution: "Created bespoke technology sector relocation program with enhanced compensation planning, accelerated visa processing, and specialised housing search focusing on tech-friendly neighbourhoods.",
      results: "Successfully relocated entire team within 4 months. Established functional R&D center 2 months ahead of schedule with strong employee satisfaction scores.",
      metrics: [
        { label: "Relocation Speed", value: "4 months", improvement: "50% faster timeline" },
        { label: "Employee Satisfaction", value: "96%", improvement: "Industry leading" },
        { label: "Setup Time", value: "2 months early", improvement: "Ahead of schedule" },
        { label: "Cost Savings", value: "£180k", improvement: "vs original budget" }
      ]
    },
    {
      company: "Pharmaceutical Giant",
      industry: "Pharmaceuticals",
      challenge: "Post-merger integration requiring relocation of 8 C-suite executives while maintaining regulatory compliance and operational stability across multiple jurisdictions.",
      solution: "Developed specialised pharmaceutical executive program with regulatory expertise, compliance consulting, and high-security relocation protocols for sensitive IP and regulatory materials.",
      results: "Seamless C-suite integration completed in 3 months with zero regulatory issues. Merger synergies achieved 2 quarters ahead of projections.",
      metrics: [
        { label: "Regulatory Compliance", value: "100%", improvement: "Zero issues" },
        { label: "Integration Speed", value: "3 months", improvement: "Record timeline" },
        { label: "Synergy Achievement", value: "2 quarters early", improvement: "Ahead of targets" },
        { label: "Executive Retention", value: "100%", improvement: "Perfect score" }
      ]
    }
  ]

  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      {/* Enhanced Structured Data for Corporate Authority */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}

      {/* Corporate Authority Hero */}
      <div className="bg-[#0B1B2B] text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-6">
                <Trophy className="h-4 w-4 text-[#C9A24A] mr-2" />
                <span className="text-[#C9A24A] text-sm font-medium">London's #1 Corporate Relocation Partner</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Executive <span className="text-[#C9A24A]">Relocation</span><br />
                Redefined
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                The definitive corporate relocation solution for Fortune 500 companies and high-growth enterprises. 
                <strong className="text-[#C9A24A]"> 94% success rate</strong> with C-suite executives and 
                <strong className="text-[#C9A24A]"> £47M+ in documented ROI</strong> for our corporate clients.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-md hover:scale-105 shadow-xl"
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Schedule Strategic Consultation
                </Button>
                <button 
                  className="inline-flex items-center justify-center h-14 px-8 py-4 text-base border border-white text-white bg-transparent hover:bg-white hover:text-[#0B1B2B] rounded-md hover:scale-105 transition-all font-medium"
                >
                  Download Executive Brief
                </button>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Corporate Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#C9A24A]">94%</div>
                  <div className="text-white/70 text-sm">Executive Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#C9A24A]">£47M</div>
                  <div className="text-white/70 text-sm">Documented Client ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#C9A24A]">500+</div>
                  <div className="text-white/70 text-sm">C-Suite Relocations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#C9A24A]">6.2wks</div>
                  <div className="text-white/70 text-sm">Avg. Time to Productivity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Methodology */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              The Relo Corporate Methodology™
            </h2>
            <p className="text-xl text-[#6B7280] max-w-4xl mx-auto">
              Our proprietary 5-phase approach ensures 94% success rate for executive relocations with measurable ROI and comprehensive risk mitigation.
            </p>
          </div>

          <div className="space-y-6">
            {methodology.map((step, index) => (
              <MethodologyStep key={index} {...step} />
            ))}
          </div>

          <div className="mt-12 bg-[#C9A24A]/5 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Methodology Performance Guarantee</h3>
            <p className="text-[#6B7280] max-w-3xl mx-auto">
              Our methodology is backed by a comprehensive performance guarantee. If we don't achieve the agreed success metrics within the specified timeframe, we provide additional services at no cost until objectives are met.
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Corporate ROI Analysis
            </h2>
            <p className="text-xl text-[#6B7280] max-w-4xl mx-auto">
              Calculate your expected return on investment using our proprietary model based on 500+ executive relocations and industry benchmarks.
            </p>
          </div>
          
          <ROICalculator />
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Corporate Service Packages
            </h2>
            <p className="text-xl text-[#6B7280] max-w-4xl mx-auto">
              Comprehensive relocation solutions tailored for different executive levels and industry requirements with transparent pricing and measurable outcomes.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {servicePackages.map((pkg, index) => (
              <div key={index} className="relative">
                <ServicePackage {...pkg} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-[#FAFAF9] rounded-lg p-8">
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Enterprise Volume Pricing</h3>
              <p className="text-[#6B7280] mb-4">
                For relocations of 20+ executives or multi-year programs, we offer customized enterprise pricing with additional services and dedicated account management.
              </p>
              <Button className="bg-[#0B1B2B] hover:bg-[#0B1B2B]/90 text-white rounded-md">
                Request Enterprise Proposal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fortune 500 Case Studies */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Fortune 500 Success Stories
            </h2>
            <p className="text-xl text-[#6B7280] max-w-4xl mx-auto">
              Real results from our enterprise clients with verified outcomes, measurable ROI, and long-term success metrics.
            </p>
          </div>
          
          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <CaseStudy key={index} {...study} />
            ))}
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Our Executive Leadership Team
            </h2>
            <p className="text-xl text-[#6B7280] max-w-4xl mx-auto">
              Industry-leading executives with deep expertise in corporate relocations, global mobility, and international business development.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {executiveTeam.map((exec, index) => (
              <ExecutiveCard key={index} {...exec} />
            ))}
          </div>
        </div>
      </section>

      {/* Industry Certifications & Authority */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Industry Leadership & Recognition
            </h2>
            <p className="text-xl text-[#6B7280] max-w-4xl mx-auto">
              Recognized industry leader with comprehensive certifications, strategic partnerships, and thought leadership positioning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <Award className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1B2B] mb-2">ISO 27001 Certified</h3>
              <p className="text-[#6B7280] text-sm">Information security management certification</p>
            </div>
            
            <div className="text-center p-6">
              <Shield className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1B2B] mb-2">FIDI Global Alliance</h3>
              <p className="text-[#6B7280] text-sm">Premier international moving network member</p>
            </div>
            
            <div className="text-center p-6">
              <UserCheck className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1B2B] mb-2">BAR Accredited</h3>
              <p className="text-[#6B7280] text-sm">British Association for Removers certification</p>
            </div>
            
            <div className="text-center p-6">
              <Target className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1B2B] mb-2">ERC Corporate Plus</h3>
              <p className="text-[#6B7280] text-sm">Employee Relocation Council premium member</p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg p-8 border border-[#0B1B2B]/10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Thought Leadership & Speaking</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <FileText className="h-8 w-8 text-[#C9A24A] mx-auto mb-3" />
                <h4 className="font-semibold text-[#0B1B2B] mb-2">Research Publications</h4>
                <p className="text-[#6B7280] text-sm">Annual Corporate Mobility Report and quarterly trend analyses</p>
              </div>
              
              <div className="text-center">
                <Users className="h-8 w-8 text-[#C9A24A] mx-auto mb-3" />
                <h4 className="font-semibold text-[#0B1B2B] mb-2">Industry Speaking</h4>
                <p className="text-[#6B7280] text-sm">Keynote presentations at global mobility and HR conferences</p>
              </div>
              
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-[#C9A24A] mx-auto mb-3" />
                <h4 className="font-semibold text-[#0B1B2B] mb-2">Market Research</h4>
                <p className="text-[#6B7280] text-sm">Cited in Financial Times, WSJ, and Harvard Business Review</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Strategic Partnership Inquiry
              </h2>
              <p className="text-[#6B7280] mb-8">
                Partner with London's leading corporate relocation specialists. Our enterprise team is ready to discuss your global mobility requirements and provide customised solutions.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#C9A24A] mt-1" />
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Corporate Sales Inquiry</div>
                    <div className="text-[#6B7280]">+44-20-7946-0950</div>
                    <div className="text-[#6B7280] text-sm">Mon-Fri 8:00-18:00 GMT</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <HeadphonesIcon className="w-6 h-6 text-[#C9A24A] mt-1" />
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Enterprise Client Services</div>
                    <div className="text-[#6B7280]">enterprise@relo-network.com</div>
                    <div className="text-[#6B7280] text-sm">24/7 for enterprise clients</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#C9A24A] mt-1" />
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Corporate Headquarters</div>
                    <div className="text-[#6B7280]">One Canada Square, Level 42<br />Canary Wharf, London E14 5AB</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FAFAF9] rounded-lg p-8">
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-6">Enterprise Inquiry Form</h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0B1B2B] mb-2">First Name *</label>
                    <input type="text" className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Last Name *</label>
                    <input type="text" className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Company *</label>
                  <input type="text" className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Role *</label>
                    <select className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent">
                      <option>Head of HR</option>
                      <option>Global Mobility Manager</option>
                      <option>Chief People Officer</option>
                      <option>CEO/President</option>
                      <option>Other C-Suite</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Company Size</label>
                    <select className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent">
                      <option>1,000-5,000 employees</option>
                      <option>5,000-10,000 employees</option>
                      <option>10,000+ employees</option>
                      <option>Fortune 500</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Relocation Requirements</label>
                  <textarea rows={4} className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent" placeholder="Please describe your corporate relocation needs, timeline, and number of executives involved..."></textarea>
                </div>
                
                <Button className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-md">
                  Request Strategic Consultation
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Final Executive CTA */}
      <div className="bg-[#0B1B2B] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Ready to Transform Your Global Mobility Program?
          </h3>
          <p className="text-xl mb-8 text-white/90">
            Join Fortune 500 companies who trust Relo Network for their most critical executive relocations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg"
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-md hover:scale-105 shadow-xl"
            >
              <Briefcase className="mr-2 h-5 w-5" />
              Schedule Executive Briefing
            </Button>
            <button 
              className="inline-flex items-center justify-center h-14 px-8 py-4 text-base border border-white text-white bg-transparent hover:bg-white hover:text-[#0B1B2B] rounded-md hover:scale-105 transition-all font-medium"
            >
              Download Corporate Brochure
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>✓ Fortune 500 Trusted</div>
            <div>✓ 94% Success Rate</div>
            <div>✓ £47M+ Client ROI</div>
            <div>✓ ISO 27001 Certified</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}