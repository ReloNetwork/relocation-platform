'use client';

import { useRef, useState, type FormEvent } from 'react';

const fieldClass = 'mt-2 w-full rounded-sm border border-[#C7C9CC] bg-white px-3 py-3 text-base font-normal';
const fields = [
  ['name', 'Your name', 'text', 'Jane Smith', 100],
  ['email', 'Email for your map', 'email', 'jane@example.com', 254],
  ['currentLocation', 'Where are you moving from?', 'text', 'New York', 100],
  ['moveTiming', 'When do you expect to move?', 'text', 'January 2027', 100],
  ['workDestinations', 'Work destinations or nearest stations', 'text', 'Liverpool Street, or working from home', 250],
  ['housingBudget', 'Accommodation budget in GBP', 'text', '£250/night initially; £5,000/month to rent', 150],
] as const;

export default function MoveMapCheckout() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [household, setHousehold] = useState('solo');
  const [firstStay, setFirstStay] = useState('unsure');
  const requestId = useRef('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    if (!requestId.current) requestId.current = crypto.randomUUID();
    try {
      const response = await fetch('/api/london-move-map/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': requestId.current },
        body: JSON.stringify({ ...Object.fromEntries(form), consent: form.has('consent'), startNow: form.has('startNow') }),
      });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error || 'We could not open checkout.');
      window.location.assign(result.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Please try again shortly.');
      setBusy(false);
    }
  }

  return <form onSubmit={submit} className="self-start bg-white p-6 shadow-sm md:p-9">
    <h2 className="font-serif text-3xl">Tell us about your move</h2>
    <p className="mt-2 text-sm text-[#4B5563]">Your answers shape your consultation. Review the £249 total on the secure payment screen next.</p>
    <fieldset className="mt-7">
      <legend className="text-sm font-medium">Who is moving?</legend>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {([['solo', 'Just me'], ['partner', 'With a partner'], ['children', 'With children']] as const).map(([value, label]) => <label key={value} className={`cursor-pointer border px-3 py-3 text-center text-sm ${household === value ? 'border-[#8B6C2F] bg-[#F7F4ED]' : 'border-[#C7C9CC]'}`}>
          <input type="radio" name="household" value={value} checked={household === value} onChange={() => setHousehold(value)} className="mr-2" />{label}
        </label>)}
      </div>
    </fieldset>
    <div className="mt-7 grid gap-5 sm:grid-cols-2">
      {fields.map(([name, label, type, placeholder, maxLength]) => <label key={name} className="text-sm font-medium">{label}<input name={name} type={type} placeholder={placeholder} required minLength={name === 'email' ? undefined : 2} maxLength={maxLength} className={fieldClass} /></label>)}
    </div>
    <div className="mt-5 grid gap-5 sm:grid-cols-2">
      <label className="text-sm font-medium">Where do you expect to stay first?
        <select name="firstStay" value={firstStay} onChange={event => setFirstStay(event.target.value)} className={fieldClass}>
          <option value="unsure">I’m deciding</option><option value="hotel">Hotel</option><option value="serviced">Serviced accommodation</option><option value="rental">A rental home</option><option value="owned">A home I own or am buying</option>
        </select>
      </label>
      <label className="text-sm font-medium">Your longer-term goal
        <select name="longerTermGoal" defaultValue="unsure" className={fieldClass}><option value="unsure">Still deciding</option><option value="rent">Rent</option><option value="buy">Buy</option></select>
      </label>
    </div>
    {['hotel', 'serviced', 'unsure'].includes(firstStay) && <label className="mt-5 block text-sm font-medium">How long might you need a temporary stay? (optional)<input name="temporaryStayLength" maxLength={100} placeholder="For example: 4–6 weeks" className={fieldClass} /></label>}
    {household === 'children' && <div className="mt-5 space-y-5 border-l-2 border-[#C9A24A] pl-4">
      <label className="block text-sm font-medium">Children’s ages<input name="childrenAges" required maxLength={100} placeholder="6 and 10" className={fieldClass} /></label>
      <label className="block text-sm font-medium">School needs or preferences (optional)<textarea name="schoolNeeds" maxLength={450} rows={2} placeholder="School type, curriculum or questions you are weighing" className={fieldClass} /></label>
    </div>}
    <div className="mt-5 space-y-5">
      <label className="block text-sm font-medium">Home requirements<textarea name="homeNeeds" required minLength={5} maxLength={450} rows={3} placeholder="Bedrooms, pets, accessibility or other essentials" className={fieldClass} /></label>
      <label className="block text-sm font-medium">What matters most to you?<textarea name="priorities" required minLength={5} maxLength={450} rows={3} placeholder="Commute, space, community, parks, school run" className={fieldClass} /></label>
      <label className="block text-sm font-medium">What is the single most important factor?
        <select key={household} name="topPriority" required defaultValue="" className={fieldClass}><option value="" disabled>Choose one</option><option value="commute">Commute or daily travel</option><option value="space">Space and home fit</option><option value="budget">Accommodation budget</option>{household === 'children' && <option value="schools">School fit</option>}<option value="lifestyle">Lifestyle and community</option></select>
      </label>
      <label className="block text-sm font-medium">What decision are you stuck on right now?<textarea name="decisionQuestion" required minLength={5} maxLength={450} rows={3} placeholder="Should we choose more space or a shorter commute?" className={fieldClass} /></label>
      <label className="block text-sm font-medium">Areas you are considering (optional)<input name="areasConsidered" maxLength={250} className={fieldClass} /></label>
    </div>
    <label className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-[#374151]"><input name="consent" type="checkbox" required className="mt-1" /><span>I agree to the <a href="#order-terms" className="underline">order terms</a> and the use of these details to prepare and deliver my consultation. <a href="/privacy" className="underline">Privacy notice</a>.</span></label>
    <label className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-[#374151]"><input name="startNow" type="checkbox" required className="mt-1" /><span>I expressly ask you to start during the 14-day cancellation period. If I cancel after work begins, a proportionate charge may apply. I understand my cancellation right ends once the whole service has been performed.</span></label>
    {error && <p role="alert" className="mt-5 text-sm text-red-700">{error}</p>}
    <button type="submit" disabled={busy} className="mt-7 w-full bg-[#C9A24A] px-6 py-4 font-semibold text-[#0B1B2B] disabled:opacity-60">{busy ? 'Opening secure checkout…' : 'Continue to secure payment · £249'}</button>
    <p className="mt-3 text-center text-xs text-[#6B7280]">One-time payment. No subscription.</p>
  </form>;
}
