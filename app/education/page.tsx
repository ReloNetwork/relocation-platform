'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Search, Filter, Download, MapPin, Phone, Globe, Star, Users, Calendar, Award } from 'lucide-react'
import { Button } from '../../ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/components/card'
import { Badge } from '../../ui/components/badge'

// Comprehensive UK Schools Database
const SCHOOLS_DATA = [
  // Original Elite Schools
  {
    school_name: "Eton College",
    school_type: "Public School",
    address: "Windsor, Berkshire",
    city: "Windsor",
    postcode: "SL4 6DW",
    website: "etoncollege.com",
    phone: "01753 671000",
    region: "South East",
    head_teacher: "Simon Henderson",
    age_range: "13-18",
    day_boarding: "Boarding",
    fees: "£49,998 per year",
    notable_alumni: "Prince William, Boris Johnson",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Westminster School",
    school_type: "Public School", 
    address: "17 Dean's Yard, Westminster",
    city: "London",
    postcode: "SW1P 3PB",
    website: "westminster.org.uk",
    phone: "020 7963 1000",
    region: "London",
    head_teacher: "Dr Gary Savage",
    age_range: "13-18",
    day_boarding: "Day & Boarding",
    fees: "£46,980 per year",
    notable_alumni: "Stephen Hawking, Andrew Lloyd Webber",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "St Paul's School",
    school_type: "Public School",
    address: "Lonsdale Road, Barnes",
    city: "London", 
    postcode: "SW13 9JT",
    website: "stpaulsschool.org.uk",
    phone: "020 8748 9162",
    region: "London",
    head_teacher: "Mark Bailey",
    age_range: "13-18",
    day_boarding: "Day",
    fees: "£43,434 per year",
    notable_alumni: "George Osborne, Mo Farah",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Winchester College",
    school_type: "Public School",
    address: "73 Kingsgate Street",
    city: "Winchester",
    postcode: "SO23 9PE", 
    website: "winchestercollege.org",
    phone: "01962 621100",
    region: "South East",
    head_teacher: "Dr Tim Hands",
    age_range: "13-18",
    day_boarding: "Boarding",
    fees: "£48,000 per year",
    notable_alumni: "Rishi Sunak, Geoffrey Howe",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Harrow School",
    school_type: "Public School",
    address: "5 High Street, Harrow on the Hill",
    city: "Harrow",
    postcode: "HA1 3HP",
    website: "harrowschool.org.uk", 
    phone: "020 8872 8000",
    region: "London",
    head_teacher: "Alastair Land",
    age_range: "13-18",
    day_boarding: "Boarding",
    fees: "£48,000 per year",
    notable_alumni: "Winston Churchill, Benedict Cumberbatch",
    ofsted_rating: "Outstanding"
  },
  
  // Additional Prestigious Schools
  {
    school_name: "Stowe School",
    school_type: "Public School",
    address: "Stowe, Buckingham",
    city: "Buckingham",
    postcode: "MK18 5EH",
    website: "stowe.co.uk",
    phone: "01280 818000",
    region: "South East",
    head_teacher: "Dr Anthony Wallersteiner",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£46,950 per year",
    notable_alumni: "Richard Branson, Henry Cavill",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Colfe's School",
    school_type: "Independent School",
    address: "Horn Park Lane, Lee",
    city: "London",
    postcode: "SE12 8AW",
    website: "colfes.com",
    phone: "020 8852 2283",
    region: "London",
    head_teacher: "Richard Russell",
    age_range: "3-18",
    day_boarding: "Day",
    fees: "£21,450 per year",
    notable_alumni: "Bob Hope, Ernest Shackleton",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Rugby School",
    school_type: "Public School",
    address: "Lawrence Sheriff Street",
    city: "Rugby",
    postcode: "CV22 5EH",
    website: "rugbyschool.co.uk",
    phone: "01788 556216",
    region: "Midlands",
    head_teacher: "Peter Green",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£45,540 per year",
    notable_alumni: "Lewis Carroll, Salman Rushdie",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Charterhouse School",
    school_type: "Public School",
    address: "Charterhouse, Godalming",
    city: "Godalming",
    postcode: "GU7 2DX",
    website: "charterhouse.org.uk",
    phone: "01483 291501",
    region: "South East",
    head_teacher: "Alex Peterken",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£47,400 per year",
    notable_alumni: "Jonathan Swift, Ralph Vaughan Williams",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Marlborough College",
    school_type: "Public School",
    address: "Bath Road, Marlborough",
    city: "Marlborough",
    postcode: "SN8 1PA",
    website: "marlboroughcollege.org",
    phone: "01672 892300",
    region: "South West",
    head_teacher: "Louise Moelwyn-Hughes",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£46,890 per year",
    notable_alumni: "Kate Middleton, John Betjeman",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Sherborne School",
    school_type: "Public School",
    address: "Abbey Road, Sherborne",
    city: "Sherborne",
    postcode: "DT9 3AP",
    website: "sherborne.org",
    phone: "01935 812249",
    region: "South West",
    head_teacher: "Dr Dominic Luckett",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£44,550 per year",
    notable_alumni: "Alan Turing, Jeremy Irons",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Oundle School",
    school_type: "Public School",
    address: "New Street, Oundle",
    city: "Peterborough",
    postcode: "PE8 4GH",
    website: "oundleschool.org.uk",
    phone: "01832 277125",
    region: "Midlands",
    head_teacher: "Sarah Kerr-Dineen",
    age_range: "11-18",
    day_boarding: "Boarding & Day",
    fees: "£42,330 per year",
    notable_alumni: "Peter Scott, Bruce Dickinson",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Radley College",
    school_type: "Public School",
    address: "Radley, Abingdon",
    city: "Oxford",
    postcode: "OX14 2HR",
    website: "radley.org.uk",
    phone: "01235 543000",
    region: "South East",
    head_teacher: "John Moule",
    age_range: "13-18",
    day_boarding: "Boarding",
    fees: "£47,160 per year",
    notable_alumni: "Andrew Strauss, Peter Phillips",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Dulwich College",
    school_type: "Independent School",
    address: "Dulwich Common",
    city: "London",
    postcode: "SE21 7LD",
    website: "dulwich.org.uk",
    phone: "020 8693 3601",
    region: "London",
    head_teacher: "Joe Spence",
    age_range: "7-18",
    day_boarding: "Day & Boarding",
    fees: "£41,820 per year",
    notable_alumni: "P.G. Wodehouse, Chiwetel Ejiofor",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Wellington College",
    school_type: "Public School",
    address: "Duke's Ride, Crowthorne",
    city: "Crowthorne",
    postcode: "RG45 7PU",
    website: "wellingtoncollege.org.uk",
    phone: "01344 444000",
    region: "South East",
    head_teacher: "James Dahl",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£46,020 per year",
    notable_alumni: "George Orwell, Will Young",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Uppingham School",
    school_type: "Public School",
    address: "High Street West, Uppingham",
    city: "Oakham",
    postcode: "LE15 9QE",
    website: "uppingham.co.uk",
    phone: "01572 820611",
    region: "Midlands",
    head_teacher: "Richard Maloney",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£45,900 per year",
    notable_alumni: "Stephen Fry, Roald Dahl",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Cheltenham College",
    school_type: "Public School",
    address: "Bath Road, Cheltenham",
    city: "Cheltenham",
    postcode: "GL53 7LD",
    website: "cheltenhamcollege.org",
    phone: "01242 265600",
    region: "South West",
    head_teacher: "Nicola Huggett",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£44,280 per year",
    notable_alumni: "Brian Jones, James Bond author Ian Fleming",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Tonbridge School",
    school_type: "Public School",
    address: "High Street, Tonbridge",
    city: "Tonbridge",
    postcode: "TN9 1JP",
    website: "tonbridge-school.co.uk",
    phone: "01732 365555",
    region: "South East",
    head_teacher: "James Priory",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£46,818 per year",
    notable_alumni: "E.M. Forster, Vikram Seth",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Repton School",
    school_type: "Public School",
    address: "Repton, Derby",
    city: "Derby",
    postcode: "DE65 6FH",
    website: "repton.org.uk",
    phone: "01283 559200",
    region: "Midlands",
    head_teacher: "Mark Semmence",
    age_range: "13-18",
    day_boarding: "Boarding & Day",
    fees: "£43,470 per year",
    notable_alumni: "Roald Dahl, Jeremy Clarkson",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Benenden School",
    school_type: "Independent School",
    address: "Benenden, Cranbrook",
    city: "Cranbrook",
    postcode: "TN17 4AA",
    website: "benenden.kent.sch.uk",
    phone: "01580 240592",
    region: "South East",
    head_teacher: "Samantha Price",
    age_range: "11-18",
    day_boarding: "Boarding & Day",
    fees: "£45,120 per year",
    notable_alumni: "Princess Anne, Rachel Weisz",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Wycombe Abbey",
    school_type: "Independent School",
    address: "Abbey Way, High Wycombe",
    city: "High Wycombe",
    postcode: "HP11 1PE",
    website: "wycombeabbey.com",
    phone: "01494 897008",
    region: "South East",
    head_teacher: "Jo Duncan",
    age_range: "11-18",
    day_boarding: "Boarding & Day",
    fees: "£45,900 per year",
    notable_alumni: "Georgina Bloomberg, Lady Helen Taylor",
    ofsted_rating: "Outstanding"
  },
  {
    school_name: "Sevenoaks School",
    school_type: "Independent School",
    address: "High Street, Sevenoaks",
    city: "Sevenoaks",
    postcode: "TN13 1HU",
    website: "sevenoaksschool.org",
    phone: "01732 455133",
    region: "South East",
    head_teacher: "Katy Ricks",
    age_range: "11-18",
    day_boarding: "Day & Boarding",
    fees: "£42,120 per year",
    notable_alumni: "Kim Philby, Vita Sackville-West",
    ofsted_rating: "Outstanding"
  }
]

const REGIONS = ["All Regions", "London", "South East", "South West", "North West", "North East", "Midlands", "Yorkshire", "Scotland", "Wales", "Northern Ireland"]
const SCHOOL_TYPES = ["All Types", "Public School", "Grammar School", "Independent School", "State School", "Academy", "Free School"]

export default function EducationPortal() {
  const [schools, setSchools] = useState(SCHOOLS_DATA)
  const [filteredSchools, setFilteredSchools] = useState(SCHOOLS_DATA)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All Regions')
  const [selectedType, setSelectedType] = useState('All Types')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status
  useEffect(() => {
    const authStatus = localStorage.getItem('educationPortalAuth')
    setIsAuthenticated(authStatus === 'true')
  }, [])

  // Filter schools based on search and filters
  useEffect(() => {
    let filtered = schools

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(school =>
        school.school_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.postcode.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Region filter
    if (selectedRegion !== 'All Regions') {
      filtered = filtered.filter(school => school.region === selectedRegion)
    }

    // Type filter  
    if (selectedType !== 'All Types') {
      filtered = filtered.filter(school => school.school_type === selectedType)
    }

    setFilteredSchools(filtered)
  }, [searchTerm, selectedRegion, selectedType, schools])

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'school_name', 'school_type', 'address', 'city', 'postcode', 
      'website', 'phone', 'region', 'head_teacher', 'age_range',
      'day_boarding', 'fees', 'notable_alumni', 'ofsted_rating'
    ]
    
    const csvContent = [
      headers.join(','),
      ...filteredSchools.map(school => 
        headers.map(header => `"${school[header as keyof typeof school] || ''}"`).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `uk-schools-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  // If not authenticated, show payment options
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#FAFAF9] py-16">
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                UK Schools Database
              </h1>
              <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
                Access comprehensive data on the UK's leading schools with detailed information, 
                contact details, and insights to support your relocation decision.
              </p>
            </div>

            {/* Pricing Tiers */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Family Tier */}
              <Card className="relative border-2 border-[#E5E7EB] hover:border-[#C9A24A] transition-all">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-[#0B1B2B]">Premium Family</CardTitle>
                  <div className="text-3xl font-bold text-[#C9A24A]">£399</div>
                  <CardDescription>Interactive directory access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">AI-powered matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">3 recommended schools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">Concierge consultation</span>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-[#C9A24A] hover:bg-[#B8923D]"
                    onClick={() => window.location.href = '/education/payment?tier=family'}
                  >
                    Get Family Access
                  </Button>
                </CardContent>
              </Card>

              {/* Campaign Tier */}
              <Card className="relative border-2 border-[#C9A24A] shadow-lg">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#C9A24A] text-white">Most Popular</Badge>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-[#0B1B2B]">Campaign License</CardTitle>
                  <div className="text-3xl font-bold text-[#C9A24A]">£2,250</div>
                  <CardDescription>Marketing campaign dataset</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">Campaign data extract</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">Segmented by region/type</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">90-day access window</span>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-[#C9A24A] hover:bg-[#B8923D]"
                    onClick={() => window.location.href = '/education/payment?tier=campaign'}
                  >
                    Get Campaign License
                  </Button>
                </CardContent>
              </Card>

              {/* Professional Tier */}
              <Card className="relative border-2 border-[#E5E7EB] hover:border-[#C9A24A] transition-all">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-[#0B1B2B]">Data License</CardTitle>
                  <div className="text-3xl font-bold text-[#C9A24A]">£6,500</div>
                  <CardDescription>Professional database access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">200+ elite schools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">CSV/Excel + API access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">Commercial use rights</span>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-[#C9A24A] hover:bg-[#B8923D]"
                    onClick={() => window.location.href = '/education/payment?tier=professional'}
                  >
                    Get Data License
                  </Button>
                </CardContent>
              </Card>

              {/* Founding Partner Tier */}
              <Card className="relative border-2 border-purple-600 bg-gradient-to-br from-purple-900 to-[#0B1B2B] text-white">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white">Exclusive</Badge>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-white">Founding Partner</CardTitle>
                  <div className="text-3xl font-bold text-[#C9A24A]">£24,500</div>
                  <CardDescription className="text-gray-300">Category-exclusive partnership</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">Founding Partner status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">Warm client introductions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#C9A24A]" />
                    <span className="text-sm">Co-branded integration</span>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-[#C9A24A] hover:bg-[#B8923D]"
                    onClick={() => window.location.href = '/education/payment?tier=founding'}
                  >
                    Become Founding Partner
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Feature Preview */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#0B1B2B] mb-6 text-center">What You'll Get Access To</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Search className="w-12 h-12 text-[#C9A24A] mx-auto mb-4" />
                  <h4 className="font-semibold text-[#0B1B2B] mb-2">Advanced Search</h4>
                  <p className="text-[#6B7280] text-sm">Search by name, location, type, and more filters</p>
                </div>
                <div className="text-center">
                  <Award className="w-12 h-12 text-[#C9A24A] mx-auto mb-4" />
                  <h4 className="font-semibold text-[#0B1B2B] mb-2">Detailed Profiles</h4>
                  <p className="text-[#6B7280] text-sm">Comprehensive information including fees and ratings</p>
                </div>
                <div className="text-center">
                  <Download className="w-12 h-12 text-[#C9A24A] mx-auto mb-4" />
                  <h4 className="font-semibold text-[#0B1B2B] mb-2">Export Data</h4>
                  <p className="text-[#6B7280] text-sm">Download filtered results as CSV for your records</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // Main portal interface for authenticated users
  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              UK Schools Database
            </h1>
            <p className="text-[#6B7280]">
              Search and filter through comprehensive school data
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search schools, cities, postcodes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                />
              </div>

              {/* Region Filter */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              >
                {REGIONS.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              >
                {SCHOOL_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              {/* Export Button */}
              <Button
                onClick={exportToCSV}
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-[#6B7280]">
              Showing {filteredSchools.length} of {schools.length} schools
            </p>
          </div>

          {/* Schools Table */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F9FA]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">School</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {filteredSchools.map((school, index) => (
                    <tr key={index} className="hover:bg-[#F8F9FA]">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-[#0B1B2B]">{school.school_name}</div>
                          <div className="text-sm text-[#6B7280]">{school.head_teacher}</div>
                          <div className="text-sm text-[#6B7280]">Ages: {school.age_range}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="text-[#C9A24A] border-[#C9A24A]">
                          {school.school_type}
                        </Badge>
                        <div className="text-sm text-[#6B7280] mt-1">{school.day_boarding}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-1">
                          <MapPin className="w-4 h-4 text-[#6B7280] mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-[#0B1B2B]">{school.city}</div>
                            <div className="text-sm text-[#6B7280]">{school.postcode}</div>
                            <div className="text-sm text-[#6B7280]">{school.region}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#6B7280]" />
                            <span className="text-sm text-[#0B1B2B]">{school.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#6B7280]" />
                            <a 
                              href={`https://${school.website}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-[#C9A24A] hover:underline"
                            >
                              {school.website}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-[#0B1B2B]">{school.fees}</div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-[#6B7280]">{school.ofsted_rating}</span>
                          </div>
                          <div className="text-xs text-[#6B7280]">{school.notable_alumni}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}