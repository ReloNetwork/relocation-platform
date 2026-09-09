'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle, Download, Eye } from 'lucide-react';

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

interface FileUploadProps {
  caseId: string;
  uploadedBy?: 'client' | 'concierge';
  onUploadComplete?: (document: Document) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
}

export default function FileUpload({ 
  caseId, 
  uploadedBy = 'concierge',
  onUploadComplete,
  maxFiles = 10,
  maxSize = 50
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing documents
  const loadDocuments = useCallback(async () => {
    try {
      const response = await fetch(`/api/documents/upload?case_id=${caseId}`);
      const data = await response.json();
      
      if (data.ok) {
        setDocuments(data.documents);
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  }, [caseId]);

  // Load documents on mount
  useEffect(() => {
    void loadDocuments();
  }, [loadDocuments]);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('case_id', caseId);
    formData.append('uploaded_by', uploadedBy);

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      return data.document;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleFiles = async (files: FileList | File[]) => {
    setError(null);
    setSuccess(null);
    
    const fileArray = Array.from(files);
    
    // Validate file count
    if (fileArray.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate file sizes
    const oversizedFiles = fileArray.filter(file => file.size > maxSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError(`Files too large. Maximum size is ${maxSize}MB per file.`);
      return;
    }

    setUploading(true);
    
    try {
      const uploadPromises = fileArray.map(async (file, index) => {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: Math.min(prev[file.name] + 10, 90)
          }));
        }, 200);

        try {
          const document = await uploadFile(file);
          clearInterval(progressInterval);
          
          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
          
          // Add to documents list
          setDocuments(prev => [document, ...prev]);
          
          if (onUploadComplete) {
            onUploadComplete(document);
          }
          
          return document;
        } catch (error) {
          clearInterval(progressInterval);
          throw error;
        }
      });

      await Promise.all(uploadPromises);
      
      setSuccess(`Successfully uploaded ${fileArray.length} file(s)`);
      
      // Clear progress after a delay
      setTimeout(() => {
        setUploadProgress({});
      }, 2000);
      
    } catch (error: any) {
      setError(error.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    
    // Clear input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (contentType: string) => {
    // Return appropriate Lucide icon component or class name instead of emojis
    if (contentType.startsWith('image/')) return 'File';
    if (contentType === 'application/pdf') return 'File';
    if (contentType.includes('word')) return 'File';
    if (contentType.includes('excel') || contentType.includes('sheet')) return 'File';
    return 'File';
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[#C9A24A] bg-[#C9A24A]/5'
            : uploading
            ? 'border-blue-300 bg-blue-50'
            : 'border-gray-300 hover:border-[#C9A24A] hover:bg-[#C9A24A]/5'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.jpg,.jpeg,.png,.gif,.webp"
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center">
            <Upload className={`h-8 w-8 ${uploading ? 'text-blue-500' : 'text-[#C9A24A]'}`} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[#0B1B2B]">
              {uploading ? 'Uploading...' : 'Upload Documents'}
            </h3>
            <p className="text-[#6B7280] mt-1">
              Drag and drop files here or click to browse
            </p>
            <p className="text-sm text-[#9CA3AF] mt-2">
              Supports: PDF, Images, Word, Excel, Text files (max {maxSize}MB each)
            </p>
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-[#0B1B2B]">Upload Progress</h4>
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="bg-white border border-[#E5E7EB] rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#0B1B2B]">{fileName}</span>
                <span className="text-sm text-[#6B7280]">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#C9A24A] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-red-800">Upload Error</h4>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-800">Upload Successful</h4>
            <p className="text-green-700 text-sm mt-1">{success}</p>
          </div>
        </div>
      )}

      {/* Documents List */}
      {documents.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-[#0B1B2B]">Uploaded Documents</h4>
          <div className="grid gap-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border border-[#E5E7EB] rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getFileIcon(doc.type)}</span>
                  <div>
                    <h5 className="font-medium text-[#0B1B2B]">{doc.name}</h5>
                    <p className="text-sm text-[#6B7280]">
                      {formatFileSize(doc.size)} • Uploaded by {doc.uploaded_by} • {new Date(doc.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.open(doc.public_url, '_blank')}
                    className="p-2 text-[#6B7280] hover:text-[#C9A24A] hover:bg-[#C9A24A]/10 rounded-lg transition-colors"
                    title="View document"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <a
                    href={doc.public_url}
                    download={doc.name}
                    className="p-2 text-[#6B7280] hover:text-[#C9A24A] hover:bg-[#C9A24A]/10 rounded-lg transition-colors"
                    title="Download document"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
