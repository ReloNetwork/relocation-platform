import Layout from '@/components/Layout'
import { Users, Building, Briefcase, CheckCircle, Calendar, ArrowRight, Crown } from 'lucide-react'

export default function DemoDashboard() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-8">
        {/* Header Alert */}
        <div className="bg-green-50 border border-green-200 p-4 mx-4 mb-6 rounded-lg">
          <h2 className="text-green-800 font-bold flex items-center gap-2">
            <Crown className="w-5 h-5" />
            🎯 Client Dashboard Access - Ready for Demos!
          </h2>
          <p className="text-green-700 text-sm">
            Perfect! Your relocation platform is working. Use this dashboard to demonstrate 
            the client experience during sales calls tomorrow.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Welcome back, Executive Client
            </h1>
            <p className="text-[#6B7280]">Here is your relocation progress and upcoming tasks.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6">
              <div className="flex items-center">
                <Briefcase className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-[#6B7280]">Move Case</p>
                  <p className="text-2xl font-bold text-[#0B1B2B]">Active</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-[#6B7280]">Tasks Complete</p>
                  <p className="text-2xl font-bold text-[#0B1B2B]">3/8</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-[#6B7280]">Appointments</p>
                  <p className="text-2xl font-bold text-[#0B1B2B]">5</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6">
              <div className="flex items-center">
                <Building className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-[#6B7280]">Move Date</p>
                  <p className="text-lg font-bold text-[#0B1B2B]">Mar 15</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">Perfect for Sales Demos! 🎯</h3>
            <p className="text-blue-800 mb-4">
              This dashboard demonstrates exactly what your executive clients will see: 
              personalized relocation progress, priority tasks, and white-glove service coordination.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                📞 Schedule Client Demo
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                💰 Close More Deals
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
