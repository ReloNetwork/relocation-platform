'use client';

import { Button } from '@/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card';
import { Badge } from '@/ui/components/badge';
import { Timeline } from '@/ui/components/timeline';
import { MessageCircle, Phone } from 'lucide-react';

// Mock data for demo
const mockCase = {
  id: '1',
  route_from: 'New York, USA',
  route_to: 'London, UK',
  move_date: '2024-03-15',
  status: 'scoping',
  concierge_name: 'Emma Richardson'
};

const mockTasks = [
  {
    id: '1',
    title: 'Complete intake questionnaire',
    description: 'Provide detailed information about relocation requirements',
    timestamp: '2 days ago',
    status: 'completed' as const,
    assignee: 'You'
  },
  {
    id: '2',
    title: 'Research visa requirements',
    description: 'Determine visa type and documentation needed for UK relocation',
    timestamp: 'Due in 2 days',
    status: 'in_progress' as const,
    assignee: 'Emma (Concierge)'
  },
  {
    id: '3',
    title: 'Property viewing appointments',
    description: 'Schedule virtual tours of shortlisted properties',
    timestamp: 'Due next week',
    status: 'pending' as const,
    assignee: 'Emma (Concierge)'
  },
  {
    id: '4',
    title: 'Moving company quotes',
    description: 'Get quotes from 3 vetted international moving companies',
    timestamp: 'No due date',
    status: 'pending' as const,
    assignee: 'Emma (Concierge)'
  },
  {
    id: '5',
    title: 'Bank account setup',
    description: 'Research UK banks and setup process for US citizens',
    timestamp: 'No due date',
    status: 'pending' as const,
    assignee: 'Emma (Concierge)'
  }
];

const mockMessages = [
  {
    id: '1',
    sender: 'Emma Richardson',
    message: 'Welcome to Relo Network! I\'ve reviewed your intake form and I\'m excited to help you with your move to London.',
    timestamp: '2 days ago',
    isFromConcierge: true
  },
  {
    id: '2',
    sender: 'You',
    message: 'Thank you Emma! I\'m really looking forward to working with you. When do you think we can start looking at properties in the Marylebone area?',
    timestamp: '1 day ago',
    isFromConcierge: false
  },
  {
    id: '3',
    sender: 'Emma Richardson',
    message: 'Great question! I\'ve already reached out to our contacts at Black Brick who specialise in that area. I should have some initial options for you by end of week.',
    timestamp: '1 day ago',
    isFromConcierge: true
  }
];

export default function AccountPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'intake':
        return <Badge variant="secondary">Intake</Badge>;
      case 'scoping':
        return <Badge variant="warning">Scoping</Badge>;
      case 'quoting':
        return <Badge variant="warning">Getting Quotes</Badge>;
      case 'booked':
        return <Badge variant="success">Booked</Badge>;
      case 'in_transit':
        return <Badge variant="sla">In Transit</Badge>;
      case 'settling':
        return <Badge variant="sla">Settling In</Badge>;
      case 'complete':
        return <Badge variant="success">Complete</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-display text-2xl font-bold text-primary">Relo Network</div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <a href="/">Home</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="/directory">Directory</a>
            </Button>
            <Button variant="outline">Sarah Johnson</Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Case Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Relocation Case</CardTitle>
                    <CardDescription>
                      {mockCase.route_from} → {mockCase.route_to}
                    </CardDescription>
                  </div>
                  {getStatusBadge(mockCase.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Move Date</h4>
                    <p className="text-muted-foreground">{mockCase.move_date}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Your Concierge</h4>
                    <p className="text-muted-foreground">{mockCase.concierge_name}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button>Schedule Call</Button>
                  <Button variant="outline">Upload Documents</Button>
                </div>
              </CardContent>
            </Card>

            {/* Tasks Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Progress Timeline</CardTitle>
                <CardDescription>
                  Track the progress of your relocation tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Timeline items={mockTasks} />
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>Communication with your concierge</CardDescription>
                  </div>
                  <Button>Send Message</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.isFromConcierge ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-md p-3 rounded-lg ${
                        message.isFromConcierge 
                          ? 'bg-muted text-left' 
                          : 'bg-primary text-primary-foreground text-right'
                      }`}>
                        <p className="text-sm mb-1">{message.message}</p>
                        <p className="text-xs opacity-75">
                          {message.sender} • {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  📅 Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📄 Upload Documents
                </Button>
                <a
                  href="/ask"
                  className="inline-flex items-center justify-start w-full rounded-md px-4 py-2 border border-gray-300 text-[var(--ink)] bg-white hover:bg-gray-50 transition focus-ring"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask Relo AI
                </a>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Contact
                </Button>
              </CardContent>
            </Card>

            {/* SLA Status */}
            <Card>
              <CardHeader>
                <CardTitle>Service Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Next Action Due</span>
                    <Badge variant="warning">2 days</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <Badge variant="success">&lt; 4 hours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Service Tier</span>
                    <Badge variant="sla">Premium</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border-l-2 border-accent pl-3">
                    <h4 className="font-medium text-sm">Property Viewings</h4>
                    <p className="text-xs text-muted-foreground">Tomorrow, 2:00 PM GMT</p>
                    <p className="text-xs text-muted-foreground">Virtual tour with Black Brick</p>
                  </div>
                  <div className="border-l-2 border-muted pl-3">
                    <h4 className="font-medium text-sm">Concierge Check-in</h4>
                    <p className="text-xs text-muted-foreground">Friday, 10:00 AM GMT</p>
                    <p className="text-xs text-muted-foreground">Weekly progress review</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Intake Form</span>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Property Shortlist</span>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Moving Checklist</span>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View All Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}