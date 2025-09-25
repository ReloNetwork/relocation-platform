'use client';
import { useState, useEffect, useRef } from 'react';

type Msg = { id: string; body: string; sender: string; created_at: string };

export default function CaseMessages({ params }: { params: { caseId: string } }) {
  const caseId = params.caseId;
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadMsgs() {
      try {
        const response = await fetch(`/api/case/${caseId}/messages`);
        if (response.ok) {
          const data = await response.json();
          setMsgs(data.messages || []);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    }
    loadMsgs();

    // Poll for new messages every 5 seconds
    const interval = setInterval(loadMsgs, 5000);
    return () => clearInterval(interval);
  }, [caseId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  async function sendMsg() {
    if (!body.trim() || loading) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/case/${caseId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          body: body.trim(), 
          sender: 'client' 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMsgs(prev => [...prev, data.message]);
        setBody('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Case Messages
          </h1>
          <p className="text-[#6B7280] mt-2">Case ID: {caseId}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#0B1B2B]/10 h-[600px] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              {msgs.length === 0 ? (
                <div className="text-center text-[#6B7280] py-12">
                  <div className="text-4xl mb-4">💬</div>
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                msgs.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'concierge' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-4 rounded-2xl ${
                        msg.sender === 'concierge'
                          ? 'bg-[#0B1B2B] text-[#C9A24A]'
                          : 'bg-[#F3F4F6] text-[#0B1B2B] border border-[#E5E7EB]'
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {msg.body}
                      </div>
                      <div
                        className={`text-xs mt-2 opacity-70 ${
                          msg.sender === 'concierge' ? 'text-[#C9A24A]' : 'text-[#6B7280]'
                        }`}
                      >
                        {msg.sender} • {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-[#E5E7EB] p-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMsg()}
                placeholder="Type your message..."
                disabled={loading}
                className="flex-1 border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all disabled:opacity-50"
              />
              <button
                onClick={sendMsg}
                disabled={loading || !body.trim()}
                className="px-6 py-3 bg-[#0B1B2B] text-[#C9A24A] font-semibold rounded-xl hover:bg-[#0B1B2B]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>

        {/* Back to Case */}
        <div className="mt-6">
          <a
            href={`/case/${caseId}`}
            className="inline-flex items-center gap-2 text-[#0B1B2B] hover:text-[#C9A24A] transition-colors"
          >
            ← Back to Case Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}