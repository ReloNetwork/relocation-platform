'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import FileUpload from '@/components/FileUpload';
import { createClient } from '@supabase/supabase-js';

// Mock case for demo
const DEMO_CASE_ID = 'demo-case-123';

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Document {
  id: string;
  name: string;
  path: string;
  size: number;
  type: string;
  uploaded_by: string;
  created_at: string;
  public_url: string;
}

export default function DocumentsDemoPage() {
  const [uploadMode, setUploadMode] = useState<'client' | 'concierge'>('concierge');
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data: documents } = await sb
        .from('documents')
        .select('size_bytes')
        .eq('case_id', DEMO_CASE_ID);

      if (documents) {
        setTotalDocuments(documents.length);
        setTotalSize(documents.reduce((sum, doc) => sum + (doc.size_bytes || 0), 0));
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleUploadComplete = (document: Document) => {
    console.log('Upload completed:', document);
    loadStats(); // Refresh stats
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-[#0B1B2B]/10">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Document Upload Demo
              </h1>
              <p className="text-lg text-[#6B7280] max-w-3xl mx-auto">
                Upload and manage documents for relocation cases with drag & drop support, 
                file validation, and secure cloud storage.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#C9A24A]/5 border border-[#C9A24A]/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#C9A24A] mb-2">{totalDocuments}</div>
                <div className="text-[#6B7280] font-medium">Total Documents</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{formatFileSize(totalSize)}</div>
                <div className="text-[#6B7280] font-medium">Total Storage Used</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">50MB</div>
                <div className="text-[#6B7280] font-medium">Max File Size</div>
              </div>
            </div>

            {/* Upload Mode Selector */}
            <div className="flex justify-center mb-8">
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-1 flex">
                <button
                  onClick={() => setUploadMode('concierge')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    uploadMode === 'concierge'
                      ? 'bg-[#C9A24A] text-white'
                      : 'text-[#6B7280] hover:text-[#0B1B2B]'
                  }`}
                >
                  Upload as Concierge
                </button>
                <button
                  onClick={() => setUploadMode('client')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    uploadMode === 'client'
                      ? 'bg-[#C9A24A] text-white'
                      : 'text-[#6B7280] hover:text-[#0B1B2B]'
                  }`}
                >
                  Upload as Client
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#0B1B2B]/10 mb-8">
            <h2 className="text-2xl font-semibold text-[#0B1B2B] mb-6">Features & Capabilities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🗂️</span>
                </div>
                <h3 className="font-medium text-[#0B1B2B] mb-2">Drag & Drop</h3>
                <p className="text-sm text-[#6B7280]">Intuitive file upload with visual feedback</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-medium text-[#0B1B2B] mb-2">Secure Storage</h3>
                <p className="text-sm text-[#6B7280]">Files stored securely in Supabase Storage</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-medium text-[#0B1B2B] mb-2">File Validation</h3>
                <p className="text-sm text-[#6B7280]">Type and size validation with error handling</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-medium text-[#0B1B2B] mb-2">Responsive</h3>
                <p className="text-sm text-[#6B7280]">Works perfectly on mobile and desktop</p>
              </div>
            </div>
          </div>

          {/* Supported File Types */}
          <div className="bg-[#C9A24A]/5 border border-[#C9A24A]/20 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-[#0B1B2B] mb-4">Supported File Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">📄</span>
                <span>PDF Documents</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🖼️</span>
                <span>Images (JPEG, PNG, GIF, WebP)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">📝</span>
                <span>Word Documents (.doc, .docx)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">📊</span>
                <span>Excel Files (.xls, .xlsx)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">📄</span>
                <span>Text Files (.txt)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">📈</span>
                <span>CSV Files</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <span>Max 50MB per file</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">📦</span>
                <span>Up to 10 files at once</span>
              </div>
            </div>
          </div>

          {/* Current Mode Indicator */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#0B1B2B]">
                  Current Upload Mode: <span className="text-[#C9A24A]">{uploadMode === 'concierge' ? 'Concierge' : 'Client'}</span>
                </h3>
                <p className="text-[#6B7280] text-sm mt-1">
                  {uploadMode === 'concierge' 
                    ? 'Files will be marked as uploaded by the concierge team'
                    : 'Files will be marked as uploaded by the client'
                  }
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                uploadMode === 'concierge' 
                  ? 'bg-[#C9A24A]/10 text-[#C9A24A]'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {uploadMode === 'concierge' ? '👨‍💼 Concierge' : '👤 Client'}
              </div>
            </div>
          </div>
        </div>

        {/* File Upload Component */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <div className="bg-white rounded-xl shadow-sm border border-[#0B1B2B]/10 p-8">
            <FileUpload
              caseId={DEMO_CASE_ID}
              uploadedBy={uploadMode}
              onUploadComplete={handleUploadComplete}
              maxFiles={10}
              maxSize={50}
            />
          </div>
        </div>

        {/* API Information */}
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-[#0B1B2B] mb-4">API Endpoints</h3>
            <div className="space-y-3 text-sm font-mono">
              <div className="flex items-center gap-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">POST</span>
                <span>/api/documents/upload</span>
                <span className="text-[#6B7280]">- Upload files</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">GET</span>
                <span>/api/documents/upload?case_id=xxx</span>
                <span className="text-[#6B7280]">- Get case documents</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}