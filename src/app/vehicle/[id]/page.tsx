'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { clients, jobs, vehicles } from '@/lib/mock-db';
import { LicensePlate } from '@/components/license-plate';
import { TagToggleGrid } from '@/components/tag-toggle-grid';

export default function VehicleProfilePage() {
  const { id } = useParams<{ id: string }>();
  const vehicle = vehicles.find((v) => v.id === id)!;
  const client = clients.find((c) => c.id === vehicle.clientId)!;
  const history = jobs.filter((j) => j.vehicleId === vehicle.id).sort((a, b) => b.kilometers - a.kilometers);
  const last = history[0];
  const lastTagliando = history.find((j) => j.tags.includes('Tagliando'));

  const [km, setKm] = React.useState(last?.kilometers ?? 0);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [notes, setNotes] = React.useState('');
  const [price, setPrice] = React.useState<number>(0);
  const [bill, setBill] = React.useState(true);

  const kmInvalid = last && km < last.kilometers;
  const tagliandoOld = lastTagliando
    ? (new Date().getTime() - new Date(lastTagliando.date).getTime()) / (1000 * 60 * 60 * 24) > 365 || (last?.kilometers ?? 0) - lastTagliando.kilometers > 15000
    : false;

  return (
    <div className="space-y-4">
      <header className="rounded-3xl border bg-slate-50 p-4">
        <LicensePlate plate={vehicle.licensePlate} />
        <h2 className="mt-2 text-3xl font-black">{vehicle.make} {vehicle.model} ({vehicle.year})</h2>
        <p className="text-lg">Cliente: {client.fullName}</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-3xl border p-4">
          <h3 className="mb-3 text-2xl font-black">Nuovo Intervento · 3 Step</h3>
          <label className="text-sm font-bold">1) Chilometri</label>
          <input
            type="number"
            value={km}
            onChange={(e) => setKm(Number(e.target.value))}
            className={`mb-3 mt-1 min-h-16 w-full rounded-xl border-4 px-4 text-4xl font-black ${kmInvalid ? 'border-red-500' : 'border-slate-200'}`}
          />
          {kmInvalid && <p className="mb-2 font-bold text-red-600">Attenzione: KM inferiore all'ultimo intervento.</p>}

          <label className="text-sm font-bold">2) Tag intervento</label>
          <div className="my-2"><TagToggleGrid value={selectedTags} onChange={setSelectedTags} /></div>

          <label className="text-sm font-bold">3) Billing & Save</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Note lavoro" className="mt-1 min-h-28 w-full rounded-xl border-2 p-3 text-lg" />
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Prezzo Finale €" className="mt-2 min-h-14 w-full rounded-xl border-2 px-4 text-2xl font-bold" />
          <label className="mt-3 flex items-center gap-3 text-xl font-bold">
            <input type="checkbox" checked={bill} onChange={(e) => setBill(e.target.checked)} className="h-7 w-7" /> Da Fatturare
          </label>
          <button className="mt-4 min-h-16 w-full rounded-2xl bg-blue-700 text-3xl font-black text-white">SALVA</button>
        </section>

        <section className="rounded-3xl border bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-2xl font-black">Timeline Interventi</h3>
            {tagliandoOld && <span className="rounded-full bg-amber-200 px-3 py-1 text-sm font-bold">⚠ Tagliando oltre soglia</span>}
          </div>
          <div className="space-y-3">
            {history.map((job) => (
              <article key={job.id} className="rounded-2xl border bg-white p-3">
                <p className="font-bold">{job.date} · {job.kilometers.toLocaleString()} km</p>
                <div className="my-2 flex flex-wrap gap-2">
                  {job.tags.map((tag) => <span key={tag} className="rounded-full bg-blue-600 px-3 py-1 text-sm font-bold text-white">{tag}</span>)}
                </div>
                <p className="text-sm text-slate-700">{job.notes}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
