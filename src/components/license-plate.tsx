import { cn } from '@/lib/utils';

type Props = {
  plate: string;
  className?: string;
};

export function LicensePlate({ plate, className }: Props) {
  return (
    <div className={cn('inline-flex min-h-14 min-w-44 items-center justify-center rounded-md border-4 border-blue-600 bg-white px-4 py-2 text-2xl font-black tracking-[0.35em] text-slate-900', className)}>
      {plate}
    </div>
  );
}
