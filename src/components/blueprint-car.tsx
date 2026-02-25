import { BlueprintShape } from '@/lib/types';

type Props = { shape: BlueprintShape; color: string };

const pathByShape: Record<BlueprintShape, string> = {
  compact: 'M10 50h20l10-14h38l12 14h18v20H10z',
  sedan: 'M8 52h26l14-16h40l14 16h18v18H8z',
  wagon: 'M8 52h22l12-17h48l15 17h15v18H8z',
  suv: 'M8 52h25l10-19h46l15 19h16v18H8z',
  van: 'M8 52h16v-20h66l20 20h10v18H8z',
  sport: 'M8 54h28l24-18h33l20 18h7v16H8z'
};

export function BlueprintCar({ shape, color }: Props) {
  return (
    <svg viewBox="0 0 128 88" className="h-24 w-full">
      <path d={pathByShape[shape]} fill={color} fillOpacity={0.2} stroke={color} strokeWidth="3" />
      <circle cx="34" cy="70" r="8" fill="white" stroke={color} strokeWidth="4" />
      <circle cx="92" cy="70" r="8" fill="white" stroke={color} strokeWidth="4" />
    </svg>
  );
}
