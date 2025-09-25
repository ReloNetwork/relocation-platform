'use client';
import { useState } from 'react';
import Layout from '@/components/Layout';

export default function DocsPage() {
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
    setMsg('Uploading and analyzing document...');

    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('case_id', caseId);
      
      const res = await fetch('/api/docs/upload', { 
        method: 'POST', 
        body: fd 
      });
      
      const json = await res.json();
      
      if (res.ok) {
        // After successful upload, analyze the document for task suggestions
        try {
          const interpretRes = await fetch('/api/docs/interpret', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name,
              contentType: file.type,
              caseId: caseId
            })
          });
          
          const interpretJson = await interpretRes.json();
          
          if (interpretRes.ok && interpretJson.tasks?.length > 0) {
            setMsg(`Upload successful! Analyzed document and found ${interpretJson.tasks.length} suggested tasks. Check your case dashboard to review and add them.`);
            
            // Store suggested tasks in localStorage for the case page to pick up
            localStorage.setItem('suggestedTasks', JSON.stringify({
              tasks: interpretJson.tasks,
              documentName: file.name,
              timestamp: Date.now()
            }));
          } else {
            setMsg('Upload successful! Document uploaded but no tasks were automatically generated.');
          }
        } catch (interpretError) {
          setMsg('Upload successful! Document analysis failed, but file was uploaded.');
        }
        
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
    <Layout>
      <div className="bg-[#FAFAF9] py-12 px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-semibold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Documents Upload
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
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.jpg,.jpeg,.png,.gif,.webp"
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
              msg.includes('successful') 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : msg.includes('Failed') || msg.includes('Error')
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}>
              <div className="text-sm font-medium">{msg}</div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-[#C9A24A]/5 border border-[#C9A24A]/20 rounded-xl p-6">
            <h3 className="font-semibold text-[#0B1B2B] mb-3">Upload Instructions</h3>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li className="flex items-center gap-2">
                <span className="text-[#C9A24A]">•</span>
                Enter the case ID for the document you want to upload
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C9A24A]">•</span>
                Select a file (PDF, Word, Excel, Images, Text files)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C9A24A]">•</span>
                Maximum file size: 50MB
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C9A24A]">•</span>
                Files are stored securely and linked to the case
              </li>
            </ul>
          </div>

          {/* Supported File Types */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10">
            <h3 className="font-semibold text-[#0B1B2B] mb-3">Supported File Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex-shrink-0 text-red-600">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                </div>
                <span>PDF Documents</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex-shrink-0 text-blue-600">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M7,11V13H17V11H7M7,15V17H17V15H7Z"/>
                  </svg>
                </div>
                <span>Word (.doc, .docx)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex-shrink-0 text-green-600">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M8,12V14H16V12H8M8,16V18H13V16H8Z"/>
                  </svg>
                </div>
                <span>Excel (.xls, .xlsx)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex-shrink-0 text-purple-600">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"/>
                  </svg>
                </div>
                <span>Images (JPEG, PNG, GIF)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex-shrink-0 text-gray-600">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M7,11V13H17V11H7M7,15V17H14V15H7Z"/>
                  </svg>
                </div>
                <span>Text Files (.txt)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex-shrink-0 text-orange-600">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M8,13V15H10V17H8V19H6V13H8M16,13V17H14V19H12V13H16M10,15V13H12V17H10V15Z"/>
                  </svg>
                </div>
                <span>CSV Files</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}