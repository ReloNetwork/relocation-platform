'use client'

import { useState } from 'react'
import { Button } from '@/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'
import { Input } from '@/ui/components/input'
import { Badge } from '@/ui/components/badge'
import Layout from '@/components/Layout'

interface MoveCase {
  id: string
  status: string
  route_from: string
  route_to: string
  created_at: string
}

interface UserData {
  user: {
    id: string
    email: string
    created_at: string
  }
  moveCases: MoveCase[]
}

interface GeneratedLink {
  user: UserData['user']
  moveCase: MoveCase
  links: {
    dashboard: string
    magicLink: string | null
  }
  moveCases: MoveCase[]
}

export default function AdminDashboardLinks() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [generatedLink, setGeneratedLink] = useState<GeneratedLink | null>(null)
  const [selectedMoveCase, setSelectedMoveCase] = useState<string>('')
  const [error, setError] = useState('')

  const handleLookupUser = async () => {
    if (!email) return
    
    setLoading(true)
    setError('')
    setUserData(null)
    setGeneratedLink(null)
    
    try {
      const response = await fetch(`/api/admin/generate-dashboard-link?email=${encodeURIComponent(email)}`)
      const data = await response.json()
      
      if (!response.ok) {
        setError(data.error || 'Error looking up user')
        return
      }
      
      setUserData(data)
      if (data.moveCases.length > 0) {
        setSelectedMoveCase(data.moveCases[0].id)
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateLink = async () => {
    if (!email || !selectedMoveCase) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/admin/generate-dashboard-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          moveCase: selectedMoveCase
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setError(data.error || 'Error generating link')
        return
      }
      
      setGeneratedLink(data)
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'intake': 'bg-blue-100 text-blue-800',
      'scoping': 'bg-yellow-100 text-yellow-800',
      'quoting': 'bg-orange-100 text-orange-800',
      'booked': 'bg-green-100 text-green-800',
      'in_transit': 'bg-purple-100 text-purple-800',
      'settling': 'bg-indigo-100 text-indigo-800',
      'complete': 'bg-gray-100 text-gray-800',
      'on_hold': 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-[#FAFAF9] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Admin Dashboard Links
            </h1>
            <p className="text-[#6B7280]">
              Generate personalized dashboard links for clients
            </p>
          </div>

          {/* User Lookup */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Client Lookup</CardTitle>
              <CardDescription>
                Enter a client's email to view their move cases and generate dashboard links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="client@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleLookupUser}
                  disabled={loading || !email}
                  className="bg-[#0B1B2B] hover:bg-[#0B1B2B]/90"
                >
                  {loading ? 'Looking up...' : 'Lookup User'}
                </Button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* User Data */}
          {userData && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-[#6B7280]">Email</p>
                    <p className="font-medium">{userData.user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">User ID</p>
                    <p className="font-mono text-sm">{userData.user.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Account Created</p>
                    <p className="text-sm">{new Date(userData.user.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Move Cases</p>
                    <p className="font-medium">{userData.moveCases.length}</p>
                  </div>
                </div>

                {userData.moveCases.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Move Cases</h4>
                    <div className="space-y-2">
                      {userData.moveCases.map((moveCase) => (
                        <div 
                          key={moveCase.id} 
                          className={`p-3 border rounded-md cursor-pointer transition-colors ${
                            selectedMoveCase === moveCase.id 
                              ? 'border-[#C9A24A] bg-[#C9A24A]/5' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedMoveCase(moveCase.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={getStatusColor(moveCase.status)}>
                                  {moveCase.status}
                                </Badge>
                                <span className="text-sm text-[#6B7280]">
                                  {new Date(moveCase.created_at).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm font-medium">
                                {moveCase.route_from} → {moveCase.route_to}
                              </p>
                              <p className="text-xs text-[#6B7280] font-mono">{moveCase.id}</p>
                            </div>
                            {selectedMoveCase === moveCase.id && (
                              <div className="text-[#C9A24A]">
                                ✓
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <Button 
                        onClick={handleGenerateLink}
                        disabled={loading || !selectedMoveCase}
                        className="bg-[#C9A24A] hover:bg-[#B8923D]"
                      >
                        {loading ? 'Generating...' : 'Generate Dashboard Link'}
                      </Button>
                    </div>
                  </div>
                )}

                {userData.moveCases.length === 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                    <p className="text-sm text-amber-700">
                      This user has no move cases. They won't be able to access the dashboard until they purchase a relocation service.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Generated Links */}
          {generatedLink && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Dashboard Link</CardTitle>
                <CardDescription>
                  Share these links with your client for easy dashboard access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-[#6B7280] mb-2">Direct Dashboard Link</p>
                  <div className="flex gap-2">
                    <Input 
                      value={generatedLink.links.dashboard} 
                      readOnly 
                      className="font-mono text-sm"
                    />
                    <Button 
                      onClick={() => copyToClipboard(generatedLink.links.dashboard)}
                      variant="outline"
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Client will need to login first, then be redirected to their dashboard
                  </p>
                </div>

                {generatedLink.links.magicLink && (
                  <div>
                    <p className="text-sm font-medium text-[#6B7280] mb-2">Magic Link (Auto-Login)</p>
                    <div className="flex gap-2">
                      <Input 
                        value={generatedLink.links.magicLink} 
                        readOnly 
                        className="font-mono text-sm"
                      />
                      <Button 
                        onClick={() => copyToClipboard(generatedLink.links.magicLink!)}
                        variant="outline"
                      >
                        Copy
                      </Button>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-1">
                      One-click login link that automatically redirects to the dashboard
                    </p>
                  </div>
                )}

                <div className="bg-green-50 border border-green-200 rounded-md p-3">
                  <h4 className="text-sm font-medium text-green-800 mb-1">
                    Selected Move Case: {generatedLink.moveCase.route_from} → {generatedLink.moveCase.route_to}
                  </h4>
                  <p className="text-xs text-green-700">
                    Status: {generatedLink.moveCase.status} | ID: {generatedLink.moveCase.id}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  )
}