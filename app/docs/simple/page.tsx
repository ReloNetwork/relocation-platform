'use client';
import { useState } from 'react';

export default function SimpleDocsPage() {
  const [caseId, setCaseId] = useState('');
  const [file, setFile] = useState<File|null>(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function upload() {
    if (!file || !caseId) {
      setMsg('Please select a file and enter a case ID');
      return;
    }

    setLoading(true);
    setMsg('Uploading...');

    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('case_id', caseId);
      
      const res = await fetch('/api/docs/simple', { 
        method: 'POST', 
        body: fd 
      });
      
      const json = await res.json();
      
      if (res.ok) {
        setMsg(`Uploaded ✓ - Path: ${json.path}`);
        setFile(null);
        // Clear the file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setMsg(`Failed: ${json.error}`);
      }
    } catch (error) {
      setMsg(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Simple Documents Upload
        </h1>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#0B1B2B]/10">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                Case ID
              </label>
              <input 
                placeholder="Enter case ID" 
                value={caseId} 
                onChange={e => setCaseId(e.target.value)} 
                className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                Select File
              </label>
              <input 
                type="file" 
                onChange={e => setFile(e.target.files?.[0] || null)}
                className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
              />
              {file && (
                <div className="mt-2 text-sm text-[#6B7280]">
                  Selected: {file.name} ({Math.round(file.size / 1024)}KB)
                </div>
              )}
            </div>
            
            <button 
              onClick={upload} 
              disabled={loading || !file || !caseId}
              className="w-full rounded-2xl px-6 py-3 bg-[#0B1B2B] text-[#C9A24A] font-semibold hover:bg-[#0B1B2B]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
            >
              {loading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>
        </div>

        {msg && (
          <div className={`p-4 rounded-xl border ${
            msg.includes('✓') 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : msg.includes('Failed') || msg.includes('Error')
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="text-sm font-medium">{msg}</div>
          </div>
        )}

        {/* Simple Note */}
        <div className="bg-[#C9A24A]/5 border border-[#C9A24A]/20 rounded-xl p-6">
          <h3 className="font-semibold text-[#0B1B2B] mb-3">Simple Upload</h3>
          <p className="text-sm text-[#6B7280]">
            This is a simplified version that uploads files directly to storage without complex database operations. 
            Files are stored with the case ID and timestamp for organization.
          </p>
        </div>

        {/* API Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10">
          <h3 className="font-semibold text-[#0B1B2B] mb-3">API Information</h3>
          <div className="space-y-2 text-sm font-mono">
            <div className="flex items-center gap-3">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">POST</span>
              <span>/api/docs/simple</span>
              <span className="text-[#6B7280]">- Simple file upload</span>
            </div>
            <div className="text-[#6B7280] text-xs mt-2">
              Requires: FormData with 'file' and 'case_id' fields
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}