'use client';

const TAGS = ['Tagliando', 'Freni Ant.', 'Freni Post.', 'Gomme', 'Distribuzione', 'Diagnosi', 'Frizione'];

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function TagToggleGrid({ value, onChange }: Props) {
  const toggle = (tag: string) => {
    if (value.includes(tag)) onChange(value.filter((t) => t !== tag));
    else onChange([...value, tag]);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {TAGS.map((tag) => {
        const active = value.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className={`min-h-14 rounded-xl border-2 text-lg font-bold ${active ? 'border-blue-700 bg-blue-600 text-white' : 'border-slate-300 bg-white text-slate-900'}`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
