import { appointments, clients, vehicles } from '@/lib/mock-db';
import { GarageBoard } from '@/components/garage-board';
import { VehicleLookup } from '@/components/vehicle-lookup';
import { LicensePlate } from '@/components/license-plate';

export default function HomePage() {
  const nextTwoWeeks = appointments;

  return (
    <div className="grid gap-4 lg:grid-cols-[7fr_3fr]">
      <section className="space-y-4 rounded-3xl border bg-panel p-4">
        <h2 className="text-3xl font-black">In Officina Oggi</h2>
        <VehicleLookup />
        <GarageBoard />
      </section>
      <aside className="rounded-3xl border bg-slate-50 p-4">
        <h2 className="mb-4 text-3xl font-black">Agenda (2 settimane)</h2>
        <div className="space-y-3">
          {nextTwoWeeks.map((item) => {
            const vehicle = vehicles.find((v) => v.id === item.vehicleId)!;
            const client = clients.find((c) => c.id === vehicle.clientId)!;
            return (
              <div key={item.id} className="rounded-2xl border bg-white p-3">
                <p className="text-sm font-bold text-slate-500">{item.date} • {item.time}</p>
                <LicensePlate plate={vehicle.licensePlate} className="my-2 min-h-9 min-w-24 text-sm" />
                <p className="font-semibold">{client.fullName}</p>
                <p className="text-sm text-slate-600">{item.jobDescription}</p>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
