'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AskReloBand({
  compact = false,
  placeholder = 'What’s the best neighbourhood for our family and commute?',
}: {
  compact?: boolean;
  placeholder?: string;
}) {
  const [question, setQuestion] = useState('');
  const router = useRouter();
  function submit(event: FormEvent) {
    event.preventDefault();
    const query = question.trim();
    router.push(
      query ? `/ask-relo?q=${encodeURIComponent(query)}` : '/ask-relo'
    );
  }
  return (
    <section
      className={`ask-relo-band ${compact ? 'ask-relo-band--compact' : ''}`}
    >
      <span className="ask-relo-band__wheel" aria-hidden="true" />
      <p>ASK A QUESTION ABOUT LONDON.</p>
      <form onSubmit={submit}>
        <label className="sr-only" htmlFor="ask-relo-question">
          Ask Relo a London relocation question
        </label>
        <input
          id="ask-relo-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={placeholder}
        />
        <button type="submit">
          ASK RELO <span>→</span>
        </button>
      </form>
    </section>
  );
}
