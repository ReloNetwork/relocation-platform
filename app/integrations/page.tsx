'use client';
import { useEffect, useState } from 'react';

type Status = { configured: boolean; ok: boolean; detail: string };

export default function IntegrationsPage(){
  const [data, setData] = useState<Record<string, Status> | null>(null);
  useEffect(() => {
    fetch('/api/health').then(r => r.json()).then(setData).catch(()=>setData(null));
  }, []);
  if (!data) return <div className="p-8">Checking integrations…</div>;
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="font-serif text-2xl mb-6">Integration Status</h1>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(data).map(([name, s]) => (
          <div key={name} className="rounded-lg border p-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="font-medium capitalize">{name}</div>
              <span className={`text-sm ${s.ok ? 'text-green-600' : s.configured ? 'text-amber-600' : 'text-red-600'}`}>
                {s.ok ? 'OK' : s.configured ? 'Configured · failing' : 'Not configured'}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-500">{s.detail || ' - '}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-gray-500">Remove this page before production if you prefer.</p>
    </div>
  );
}