'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import Link from 'next/link';
import { appointments, clients, vehicles } from '@/lib/mock-db';
import { BlueprintCar } from './blueprint-car';
import { LicensePlate } from './license-plate';

type Column = 'In Attesa' | 'Sui Ponti' | 'Pronti';

const mapStatus: Record<string, Column> = {
  Pending: 'In Attesa',
  In_Workshop: 'Sui Ponti'
};

function Card({ id, vehicleId }: { id: string; vehicleId: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const vehicle = vehicles.find((v) => v.id === vehicleId)!;
  const client = clients.find((c) => c.id === vehicle.clientId)!;

  return (
    <Link href={`/vehicle/${vehicle.id}`}>
      <div
        ref={setNodeRef}
        style={transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined}
        {...listeners}
        {...attributes}
        className="rounded-2xl border bg-white p-3 shadow-sm"
      >
        <div className="mb-2 flex items-start justify-between gap-2">
          <LicensePlate plate={vehicle.licensePlate} className="min-h-10 min-w-32 text-sm" />
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">{vehicle.make}</span>
        </div>
        <BlueprintCar shape={vehicle.blueprintShape} color={vehicle.color} />
        <p className="mt-1 text-sm font-semibold">{client.fullName}</p>
        <p className="text-sm text-slate-600">{vehicle.model}</p>
      </div>
    </Link>
  );
}

function Lane({ title, ids }: { title: Column; ids: string[] }) {
  const { setNodeRef } = useDroppable({ id: title });
  return (
    <div ref={setNodeRef} className="min-h-72 rounded-2xl border bg-slate-100 p-3">
      <h3 className="mb-3 text-lg font-black">{title}</h3>
      <div className="space-y-3">
        {ids.map((id) => {
          const appt = appointments.find((a) => a.id === id)!;
          return <Card key={id} id={id} vehicleId={appt.vehicleId} />;
        })}
      </div>
    </div>
  );
}

export function GarageBoard() {
  const initial = {
    'In Attesa': appointments.filter((a) => mapStatus[a.status] === 'In Attesa').map((a) => a.id),
    'Sui Ponti': appointments.filter((a) => mapStatus[a.status] === 'Sui Ponti').map((a) => a.id),
    Pronti: [] as string[]
  };

  const [columns, setColumns] = useState<Record<Column, string[]>>(initial);

  const onDragEnd = (event: DragEndEvent) => {
    const to = event.over?.id as Column | undefined;
    const active = event.active.id as string;
    if (!to) return;
    setColumns((state) => {
      const from = (Object.keys(state) as Column[]).find((k) => state[k].includes(active));
      if (!from) return state;
      return {
        ...state,
        [from]: state[from].filter((id) => id !== active),
        [to]: [...state[to], active]
      };
    });
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Lane title="In Attesa" ids={columns['In Attesa']} />
        <Lane title="Sui Ponti" ids={columns['Sui Ponti']} />
        <Lane title="Pronti" ids={columns.Pronti} />
      </div>
    </DndContext>
  );
}
