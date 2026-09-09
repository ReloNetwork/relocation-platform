'use client';

import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  MessageCircle,
  X,
  Mic,
  Phone,
  MicOff,
  Volume2,
  VolumeX,
  Mail,
  CalendarDays,
  ClipboardList,
} from 'lucide-react';
import { useRetellClient } from '@/hooks/useRetellClient';
import { trackCommercialEvent } from '@/lib/commercial-analytics';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

interface UnifiedAssistantProps {
  variant?: 'floating' | 'embedded';
  className?: string;
  initialQuestion?: string;
}

interface UnifiedAssistantRef {
  openAssistant: () => void;
}

const UnifiedAssistant = forwardRef<UnifiedAssistantRef, UnifiedAssistantProps>(
  ({ variant = 'floating', className = '', initialQuestion = '' }, ref) => {
    // Chat state
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const [remainingQuestions, setRemainingQuestions] = useState(3);
    const [limitReached, setLimitReached] = useState(false);
    const [showSummaryForm, setShowSummaryForm] = useState(false);
    const [summaryEmail, setSummaryEmail] = useState('');
    const [summaryConsent, setSummaryConsent] = useState(false);
    const [summaryStatus, setSummaryStatus] = useState<
      'idle' | 'sending' | 'sent' | 'failed'
    >('idle');
    const calPath = process.env.NEXT_PUBLIC_CAL_COM_EMBED_ID || '';
    const calUrl = calPath ? `https://cal.com/${calPath.replace(/^\/+/, '')}` : '';
    const voiceEnabled =
      process.env.NEXT_PUBLIC_ASK_RELO_VOICE_ENABLED === '1';

    // Voice state
    const [mode, setMode] = useState<'chat' | 'voice'>('chat');
    const [callStatus, setCallStatus] = useState<
      'idle' | 'connecting' | 'connected' | 'ended'
    >('idle');
    const [callId, setCallId] = useState('');
    const [isMuted, setIsMuted] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [audioTestStatus, setAudioTestStatus] = useState<
      'idle' | 'testing' | 'success' | 'failed'
    >('idle');
    const [error, setError] = useState('');

    // Retell client
    const {
      retellClient,
      isLoading: clientLoading,
      error: clientError,
    } = useRetellClient();
    const retellClientRef = useRef<any>(null);
    const timerRef = useRef<NodeJS.Timeout>();

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      openAssistant: () => {
        setIsOpen(true);
        setIsMinimized(false);
      },
    }));

    // Timer for call duration
    useEffect(() => {
      if (callStatus === 'connected') {
        timerRef.current = setInterval(() => {
          setCallDuration((prev) => prev + 1);
        }, 1000);
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, [callStatus]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Initialize chat with welcome message
    useEffect(() => {
      if ((isOpen || variant === 'embedded') && messages.length === 0) {
        const welcomeMessage: ChatMessage = {
          role: 'assistant',
          content: `Hello. I'm Relo, an AI London relocation guide.

I can help you compare neighbourhoods, frame housing and school decisions, and plan the practical sequence of your move.

You can ask three questions for free. Please do not share passport numbers, payment details or sensitive records.

What would you like to understand about relocating to London?`,
          timestamp: new Date().toISOString(),
        };
        setMessages([welcomeMessage]);
      }
    }, [isOpen]);

    useEffect(() => {
      const storedSession = localStorage.getItem('ask_relo_session_id');
      if (storedSession) setSessionId(storedSession);
    }, []);

    useEffect(() => {
      if (initialQuestion) setInputValue(initialQuestion);
    }, [initialQuestion]);

    // Format call duration
    const formatDuration = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Test audio capabilities
    const testAudio = async () => {
      setAudioTestStatus('testing');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        console.log('Microphone test passed');

        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;

        oscillator.start();
        setTimeout(() => {
          oscillator.stop();
          audioContext.close();
        }, 200);

        stream.getTracks().forEach((track) => track.stop());

        console.log('Audio playback test passed');
        setAudioTestStatus('success');

        setTimeout(() => setAudioTestStatus('idle'), 3000);
      } catch (error) {
        console.error('Audio test failed:', error);
        setAudioTestStatus('failed');
        setError(`Audio test failed: ${error}`);
        setTimeout(() => setAudioTestStatus('idle'), 3000);
      }
    };

    // Start voice chat
    const startVoiceChat = async () => {
      setIsLoading(true);
      setError('');

      if (clientLoading) {
        setError(
          'Voice client is still loading. Please wait a moment and try again.'
        );
        setIsLoading(false);
        return;
      }

      if (clientError || !retellClient) {
        setError(
          'Voice client not available. Please refresh the page and try again.'
        );
        setIsLoading(false);
        return;
      }

      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone permission granted');
      } catch (permissionError) {
        console.error('Microphone permission denied:', permissionError);
        setError(
          'Microphone access required. Please allow microphone permissions and try again.'
        );
        setIsLoading(false);
        return;
      }

      try {
        const activeSessionId = sessionId || crypto.randomUUID();
        if (!sessionId) {
          setSessionId(activeSessionId);
          localStorage.setItem('ask_relo_session_id', activeSessionId);
        }

        const response = await fetch('/api/retell/call', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'web',
            sessionId: activeSessionId,
          }),
        });

        const data = await response.json();

        if (data.success && data.accessToken) {
          setRemainingQuestions(data.remaining);
          setCallId(data.callId);
          setCallStatus('connecting');
          setCallDuration(0);
          setMode('voice');

          retellClient.on('call_started', () => {
            setCallStatus('connected');
          });

          retellClient.on('call_ended', () => {
            setCallStatus('ended');
          });

          retellClient.on('error', (error: any) => {
            console.error('Retell Web Client error:', error);
            setError(`Voice call error: ${error.message || error}`);
            setCallStatus('ended');
          });

          try {
            await retellClient.startCall({
              accessToken: data.accessToken,
              sampleRate: 24000,
            });
          } catch (startError) {
            console.error('Failed to start call:', startError);
            setError(`Failed to start voice call: ${startError}`);
            setCallStatus('ended');
          }

          retellClientRef.current = retellClient;
        } else {
          if (data.limitReached) {
            trackCommercialEvent('ask_relo_limit_reached', 'ask_relo');
            setLimitReached(true);
            setRemainingQuestions(0);
          }
          setError(data.error || 'Failed to start web call');
        }
      } catch (error) {
        console.error('Web call error:', error);
        setError('Failed to initiate web call. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    // End call
    const endCall = () => {
      if (retellClientRef.current) {
        retellClientRef.current.stopCall();
      }

      setCallStatus('ended');
      setCallDuration(0);

      setTimeout(() => {
        setCallStatus('idle');
        setCallId('');
        setMode('chat');
      }, 3000);
    };

    // Toggle mute
    const toggleMute = () => {
      if (retellClientRef.current) {
        if (isMuted) {
          retellClientRef.current.unmute();
        } else {
          retellClientRef.current.mute();
        }
      }
      setIsMuted(!isMuted);
    };

    // Send chat message
    const sendMessage = async () => {
      if (!inputValue.trim() || isLoading || limitReached) return;

      const activeSessionId = sessionId || crypto.randomUUID();
      if (!sessionId) {
        setSessionId(activeSessionId);
        localStorage.setItem('ask_relo_session_id', activeSessionId);
      }

      const userMessage: ChatMessage = {
        role: 'user',
        content: inputValue.trim(),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsLoading(true);

      try {
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            sessionId: activeSessionId,
          }),
        });

        const data = await response.json();

        if (data.success) {
          trackCommercialEvent('ask_relo_question_answered', 'ask_relo', {
            remaining: data.remaining,
          });
          setMessages((prev) => [...prev, data.message]);
          setSessionId(data.sessionId);
          setRemainingQuestions(data.remaining);
        } else {
          if (data.limitReached) {
            trackCommercialEvent('ask_relo_limit_reached', 'ask_relo');
            setLimitReached(true);
            setRemainingQuestions(0);
            setMessages((prev) => [
              ...prev,
              {
                role: 'assistant',
                content:
                  'You have used your three free questions. If you would like personal help, share your private relocation brief for human review.',
                timestamp: new Date().toISOString(),
              },
            ]);
            return;
          }
          throw new Error(data.error || 'Failed to send message');
        }
      } catch (error) {
        console.error('Chat error:', error);
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content:
            "Sorry, Ask Relo is temporarily unavailable. Please try again in a moment or start your move for help from our team.",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    };

    const usefulConversation = messages.filter(
      (message) => message.role === 'user' || message.role === 'assistant'
    );
    const hasUsefulAnswer =
      usefulConversation.some((message) => message.role === 'user') &&
      usefulConversation.filter((message) => message.role === 'assistant').length > 1;

    const prepareStartYourMove = () => {
      const notes = usefulConversation
        .filter((message, index) => !(index === 0 && message.role === 'assistant'))
        .slice(-6)
        .map((message) =>
          `${message.role === 'user' ? 'Client' : 'Ask Relo'}: ${message.content}`
        )
        .join('\n\n')
        .slice(0, 2600);

      sessionStorage.setItem(
        'ask_relo_transfer_data',
        JSON.stringify({
          otherRequirements: notes
            ? `Notes transferred at your request from Ask Relo:\n\n${notes}`
            : 'I spoke with Ask Relo Voice and would like a person to review my move.',
        })
      );
      trackCommercialEvent('ask_relo_move_handoff_started', 'ask_relo');
      window.location.assign('/executive-intake?source=ask-relo');
    };

    const sendSummary = async () => {
      if (!summaryEmail.trim() || !summaryConsent || !sessionId) return;
      setSummaryStatus('sending');

      try {
        const response = await fetch('/api/ask-relo/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            email: summaryEmail.trim(),
            consent: true,
            messages: usefulConversation.slice(-12).map(({ role, content }) => ({
              role,
              content,
            })),
          }),
        });
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.error);
        trackCommercialEvent('ask_relo_summary_requested', 'ask_relo');
        setSummaryStatus('sent');
      } catch (error) {
        console.error('Ask Relo summary request failed', error);
        setSummaryStatus('failed');
      }
    };

    const followUpActions = hasUsefulAnswer ? (
      <div className="mt-4 border-t border-[#E5E7EB] pt-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
          Keep moving
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setShowSummaryForm((current) => !current)}
            className="flex items-center justify-center gap-2 border border-[#C9A24A] px-3 py-2 text-xs font-semibold text-[#0B1B2B] transition-colors hover:bg-[#F7F4ED]"
          >
            <Mail className="h-4 w-4" /> Email my notes
          </button>
          <button
            type="button"
            onClick={prepareStartYourMove}
            className="flex items-center justify-center gap-2 bg-[#0B1B2B] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#183553]"
          >
            <ClipboardList className="h-4 w-4" /> Start Your Move
          </button>
          {calUrl && (
            <a
              href={calUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackCommercialEvent('move_review_opened', 'relocation', {
                  source: 'ask_relo',
                })
              }
              className="flex items-center justify-center gap-2 border border-[#D8D1C4] px-3 py-2 text-xs font-semibold text-[#0B1B2B] transition-colors hover:bg-[#F7F4ED] sm:col-span-2"
            >
              <CalendarDays className="h-4 w-4" /> Book a 20-minute Move Review
            </a>
          )}
        </div>
        {showSummaryForm && summaryStatus !== 'sent' && (
          <div className="mt-3 bg-[#F7F4ED] p-3">
            <label className="block text-xs font-semibold text-[#0B1B2B]">
              Email address
              <input
                type="email"
                value={summaryEmail}
                onChange={(event) => setSummaryEmail(event.target.value)}
                className="mt-2 w-full border border-[#D8D1C4] bg-white px-3 py-2 font-normal outline-none focus:border-[#C9A24A]"
                autoComplete="email"
              />
            </label>
            <label className="mt-3 flex items-start gap-2 text-xs leading-5 text-[#4B5563]">
              <input
                type="checkbox"
                checked={summaryConsent}
                onChange={(event) => setSummaryConsent(event.target.checked)}
                className="mt-1"
              />
              Send this conversation to this address as a one-off email. This does
              not subscribe me to marketing.
            </label>
            <button
              type="button"
              onClick={sendSummary}
              disabled={
                summaryStatus === 'sending' ||
                !summaryEmail.trim() ||
                !summaryConsent
              }
              className="mt-3 w-full bg-[#C9A24A] px-3 py-2 text-xs font-semibold text-[#081627] disabled:opacity-50"
            >
              {summaryStatus === 'sending' ? 'Sending…' : 'Send my notes'}
            </button>
            {summaryStatus === 'failed' && (
              <p className="mt-2 text-xs text-red-700">
                We could not send your notes just now. Please try again.
              </p>
            )}
          </div>
        )}
        {summaryStatus === 'sent' && (
          <p className="mt-3 bg-[#E8F1EA] px-3 py-2 text-xs text-[#285C35]">
            Your Ask Relo notes are on their way.
          </p>
        )}
      </div>
    ) : null;

    const voiceFollowUpActions = (
      <div className="grid gap-2 pt-2">
        <button
          type="button"
          onClick={prepareStartYourMove}
          className="flex items-center justify-center gap-2 bg-[#0B1B2B] px-4 py-3 text-sm font-semibold text-white"
        >
          <ClipboardList className="h-4 w-4" /> Start Your Move
        </button>
        {calUrl && (
          <a
            href={calUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackCommercialEvent('move_review_opened', 'relocation', {
                source: 'ask_relo_voice',
              })
            }
            className="flex items-center justify-center gap-2 border border-[#C9A24A] px-4 py-3 text-sm font-semibold text-[#0B1B2B]"
          >
            <CalendarDays className="h-4 w-4" /> Book a Move Review
          </a>
        )}
      </div>
    );

    const formatMessage = (content: string) => {
      return content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/• (.*?)(?=\n|$)/g, '• $1')
        .replace(/\n/g, '<br>');
    };

    if (variant === 'floating') {
      return (
        <>
          {/* Floating Assistant Button */}
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#C9A24A] to-[#B8923D] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 animate-pulse"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          )}

          {/* Assistant Window */}
          {isOpen && (
            <div
              className={`fixed bottom-6 right-6 w-96 bg-white rounded-xl shadow-2xl border border-[#E5E7EB] z-50 flex flex-col ${isMinimized ? 'h-16' : 'h-[600px]'} transition-all duration-300`}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 text-white p-4 rounded-t-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center">
                    {mode === 'voice' ? (
                      <Mic className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base leading-tight">
                      {mode === 'voice'
                        ? 'Ask Relo - Voice'
                        : 'Ask Relo - Text'}
                    </h3>
                    <p className="text-xs text-white/90">Ask Relo beta</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Mode Toggle */}
                  {voiceEnabled && callStatus === 'idle' && (
                    <div className="flex bg-white/20 rounded-lg p-1 border border-white/20">
                      <button
                        onClick={() => setMode('chat')}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          mode === 'chat'
                            ? 'bg-[#C9A24A] text-white shadow-sm'
                            : 'text-white hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setMode('voice')}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          mode === 'voice'
                            ? 'bg-[#C9A24A] text-white shadow-sm'
                            : 'text-white hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-white hover:text-white/80 p-1 hover:bg-white/10 rounded transition-colors"
                    title={isMinimized ? 'Maximize' : 'Minimize'}
                  >
                    {isMinimized ? (
                      <Maximize2 className="w-4 h-4" />
                    ) : (
                      <Minimize2 className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-white/80 p-1 hover:bg-white/10 rounded transition-colors"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Content */}
                  <div className="flex-1 overflow-hidden">
                    {mode === 'chat' ? (
                      <>
                        {/* Chat Messages */}
                        <div className="h-full overflow-y-auto p-4 space-y-4">
                          {messages.map((message, index) => (
                            <div
                              key={index}
                              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              {message.role === 'assistant' && (
                                <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0">
                                  <Bot className="w-4 h-4 text-white" />
                                </div>
                              )}
                              <div
                                className={`max-w-[80%] p-3 rounded-lg ${
                                  message.role === 'user'
                                    ? 'bg-[#C9A24A] text-white'
                                    : 'bg-[#F3F4F6] text-[#0B1B2B]'
                                }`}
                              >
                                <div
                                  className="text-sm leading-relaxed"
                                  dangerouslySetInnerHTML={{
                                    __html: formatMessage(message.content),
                                  }}
                                />
                                <div
                                  className={`text-xs mt-2 ${
                                    message.role === 'user'
                                      ? 'text-white/70'
                                      : 'text-[#6B7280]'
                                  }`}
                                >
                                  {new Date(
                                    message.timestamp
                                  ).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </div>
                              </div>
                              {message.role === 'user' && (
                                <div className="w-8 h-8 bg-[#0B1B2B] rounded-full flex items-center justify-center flex-shrink-0">
                                  <User className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                          ))}

                          {isLoading && (
                            <div className="flex gap-3 justify-start">
                              <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                              </div>
                              <div className="bg-[#F3F4F6] p-3 rounded-lg">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce"></div>
                                  <div
                                    className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce"
                                    style={{ animationDelay: '0.1s' }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce"
                                    style={{ animationDelay: '0.2s' }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Voice Interface */}
                        <div className="h-full flex items-center justify-center p-4">
                          {callStatus === 'idle' && (
                            <div className="text-center space-y-4">
                              <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto">
                                <Mic className="w-8 h-8 text-[#C9A24A]" />
                              </div>
                              <h3 className="text-lg font-bold text-[#0B1B2B]">
                                Voice Chat with Relo
                              </h3>
                              <p className="text-[#6B7280] text-sm">
                                Start a natural conversation about your London
                                relocation
                              </p>

                              <button
                                onClick={startVoiceChat}
                                disabled={isLoading || clientLoading}
                                className="w-full px-4 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg transition-colors disabled:opacity-50 font-semibold flex items-center justify-center gap-2"
                              >
                                <Mic className="w-5 h-5" />
                                {isLoading
                                  ? 'Connecting...'
                                  : clientLoading
                                    ? 'Loading...'
                                    : 'Start Voice Chat'}
                              </button>

                              <button
                                onClick={testAudio}
                                disabled={audioTestStatus === 'testing'}
                                className={`w-full px-4 py-2 text-sm rounded-lg transition-colors disabled:opacity-50 font-medium flex items-center justify-center gap-2 ${
                                  audioTestStatus === 'success'
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : audioTestStatus === 'failed'
                                      ? 'bg-red-50 text-red-700 border border-red-200'
                                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                                }`}
                              >
                                {audioTestStatus === 'testing' && (
                                  <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                )}
                                {audioTestStatus === 'success' && (
                                  <Volume2 className="w-4 h-4" />
                                )}
                                {audioTestStatus === 'failed' && (
                                  <VolumeX className="w-4 h-4" />
                                )}
                                {audioTestStatus === 'idle' && (
                                  <Volume2 className="w-4 h-4" />
                                )}
                                {audioTestStatus === 'testing'
                                  ? 'Testing Audio...'
                                  : audioTestStatus === 'success'
                                    ? 'Audio Test Passed'
                                    : audioTestStatus === 'failed'
                                      ? 'Audio Test Failed'
                                      : 'Test Audio & Mic'}
                              </button>

                              {(error || clientError) && (
                                <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">
                                  {error || clientError}
                                </div>
                              )}
                            </div>
                          )}

                          {(callStatus === 'connecting' ||
                            callStatus === 'connected') && (
                            <div className="text-center space-y-4">
                              <div className="w-20 h-20 bg-[#C9A24A] rounded-full flex items-center justify-center mx-auto relative">
                                <Phone className="w-8 h-8 text-white" />
                                {callStatus === 'connecting' && (
                                  <div className="absolute inset-0 rounded-full border-4 border-[#C9A24A]/30 animate-ping"></div>
                                )}
                              </div>

                              <div>
                                <h3 className="text-lg font-bold text-[#0B1B2B]">
                                  {callStatus === 'connecting'
                                    ? 'Connecting...'
                                    : 'Connected to Relo'}
                                </h3>
                                {callStatus === 'connected' && (
                                  <div className="flex items-center justify-center gap-2 text-[#6B7280] text-sm">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    {formatDuration(callDuration)}
                                  </div>
                                )}
                              </div>

                              <div className="flex justify-center gap-4">
                                {callStatus === 'connected' && (
                                  <button
                                    onClick={toggleMute}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                                      isMuted
                                        ? 'bg-red-500 hover:bg-red-600 text-white'
                                        : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#6B7280]'
                                    }`}
                                  >
                                    {isMuted ? (
                                      <MicOff className="w-5 h-5" />
                                    ) : (
                                      <Mic className="w-5 h-5" />
                                    )}
                                  </button>
                                )}
                                <button
                                  onClick={endCall}
                                  className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                                  title="End Call"
                                >
                                  <Phone className="w-5 h-5 transform rotate-[135deg]" />
                                </button>
                              </div>
                            </div>
                          )}

                          {callStatus === 'ended' && (
                            <div className="text-center space-y-4">
                              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <Phone className="w-8 h-8 text-green-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-[#0B1B2B]">
                                  Call Ended
                                </h3>
                                <p className="text-[#6B7280] text-sm">
                                  Thank you for speaking with Relo. Choose the
                                  next step that is useful to you.
                                </p>
                              </div>
                              {voiceFollowUpActions}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Input (only for chat mode) */}
                  {mode === 'chat' && (
                    <div className="p-4 border-t border-[#E5E7EB]">
                      <div className="flex gap-2">
                        <input
                          ref={inputRef}
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask about your London relocation..."
                          className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent text-sm"
                          disabled={isLoading || limitReached}
                        />
                        <button
                          onClick={sendMessage}
                          disabled={!inputValue.trim() || isLoading || limitReached}
                          className="px-4 py-2 bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#6B7280] mt-2 text-center">
                        {limitReached
                          ? 'Complimentary preview complete'
                          : `${remainingQuestions} free question${remainingQuestions === 1 ? '' : 's'} left`}
                      </p>
                      {limitReached && (
                        <a
                          href="/executive-intake"
                          className="mt-3 flex w-full items-center justify-center bg-[#0B1B2B] px-4 py-3 text-sm font-semibold text-white"
                        >
                          Share my private relocation brief
                        </a>
                      )}
                      {followUpActions}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </>
      );
    }

    // Embedded variant
    return (
      <div
        className={`bg-white rounded-xl shadow-lg border border-[#E5E7EB] ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C9A24A] rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0B1B2B]">Ask Relo</h3>
              <p className="text-sm text-[#6B7280]">
                AI Assistant for London Relocation
              </p>
            </div>
          </div>
          {voiceEnabled && <div className="flex items-center gap-2">
            <button
              onClick={() => setMode(mode === 'chat' ? 'voice' : 'chat')}
              className={`p-2 rounded-lg transition-colors ${
                mode === 'voice'
                  ? 'bg-[#C9A24A] text-white'
                  : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
              }`}
              title={mode === 'chat' ? 'Switch to Voice' : 'Switch to Chat'}
            >
              {mode === 'chat' ? (
                <Mic className="w-4 h-4" />
              ) : (
                <MessageCircle className="w-4 h-4" />
              )}
            </button>
          </div>}
        </div>

        {/* Chat Content */}
        <div className="h-96 flex flex-col">
          {mode === 'chat' ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bot className="w-8 h-8 text-[#C9A24A]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0B1B2B] mb-2">
                      Welcome to Ask Relo!
                    </h3>
                    <p className="text-[#6B7280] text-sm max-w-sm mx-auto">
                      I'm here to help with your London relocation questions.
                      Ask me about housing, schools, visas, neighbourhoods, or
                      anything else!
                    </p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-[#C9A24A] text-white'
                            : 'bg-[#F3F4F6] text-[#0B1B2B]'
                        }`}
                      >
                        <div
                          className="text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: formatMessage(message.content),
                          }}
                        />
                        <div
                          className={`text-xs mt-2 ${
                            message.role === 'user'
                              ? 'text-white/70'
                              : 'text-[#6B7280]'
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 bg-[#0B1B2B] rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))
                )}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-[#F3F4F6] p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-[#E5E7EB]">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about your London relocation..."
                    className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent text-sm"
                    disabled={isLoading || limitReached}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading || limitReached}
                    className="px-4 py-2 bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-[#6B7280] mt-2 text-center">
                  {limitReached
                    ? 'Complimentary preview complete'
                    : `${remainingQuestions} free question${remainingQuestions === 1 ? '' : 's'} left`}
                </p>
                {limitReached && (
                  <a
                    href="/executive-intake"
                    className="mt-3 flex w-full items-center justify-center bg-[#0B1B2B] px-4 py-3 text-sm font-semibold text-white"
                  >
                    Share my private relocation brief
                  </a>
                )}
                {followUpActions}
              </div>
            </>
          ) : (
            /* Voice Mode */
            <div className="flex-1 flex items-center justify-center p-8">
              {callStatus === 'idle' && (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-[#C9A24A] rounded-full flex items-center justify-center mx-auto">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1B2B] mb-2">
                      Voice Chat with Relo
                    </h3>
                    <p className="text-[#6B7280] text-sm mb-6 max-w-sm mx-auto">
                      Start a voice conversation for a more personal
                      consultation experience.
                    </p>
                  </div>
                  <button
                    onClick={startVoiceChat}
                    disabled={clientLoading}
                    className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    {clientLoading ? 'Loading...' : 'Start Voice Chat'}
                  </button>
                  {error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                  )}
                </div>
              )}

              {(callStatus === 'connecting' || callStatus === 'connected') && (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-[#C9A24A] rounded-full flex items-center justify-center mx-auto relative">
                    <Phone className="w-8 h-8 text-white" />
                    {callStatus === 'connecting' && (
                      <div className="absolute inset-0 rounded-full border-4 border-[#C9A24A]/30 animate-ping"></div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#0B1B2B]">
                      {callStatus === 'connecting'
                        ? 'Connecting...'
                        : 'Connected to Relo'}
                    </h3>
                    {callStatus === 'connected' && (
                      <div className="flex items-center justify-center gap-2 text-[#6B7280] text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        {formatDuration(callDuration)}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center gap-4">
                    {callStatus === 'connected' && (
                      <button
                        onClick={toggleMute}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                          isMuted
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#6B7280]'
                        }`}
                      >
                        {isMuted ? (
                          <MicOff className="w-5 h-5" />
                        ) : (
                          <Mic className="w-5 h-5" />
                        )}
                      </button>
                    )}
                    <button
                      onClick={endCall}
                      className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                      title="End Call"
                    >
                      <Phone className="w-5 h-5 transform rotate-[135deg]" />
                    </button>
                  </div>
                </div>
              )}

              {callStatus === 'ended' && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1B2B]">
                      Call Ended
                    </h3>
                    <p className="text-[#6B7280] text-sm">
                        Thank you for speaking with Relo. Choose the next step
                        that is useful to you.
                      </p>
                    </div>
                    {voiceFollowUpActions}
                  <button
                    onClick={() => setCallStatus('idle')}
                    className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Start New Chat
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

UnifiedAssistant.displayName = 'UnifiedAssistant';

export default UnifiedAssistant;
