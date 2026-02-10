import { useMemo } from 'react';

import type { SystemAttribute } from '@/lib/courseData';

interface PersonalizeState {
  weeklyHours: number;
  experience: 'Beginner' | 'Intermediate';
}

interface SystemAttributesPanelProps {
  attributes: SystemAttribute[];
  personalize: PersonalizeState;
  setPersonalize: (state: PersonalizeState) => void;
  pinned: boolean;
  setPinned: (value: boolean) => void;
}

const statusStyles: Record<string, string> = {
  Low: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-rose-100 text-rose-700',
  Short: 'bg-emerald-100 text-emerald-700',
  Long: 'bg-violet-100 text-violet-700'
};

const getPersonalizedStatus = (
  key: string,
  { weeklyHours, experience }: PersonalizeState,
  defaultValue: string
): string => {
  if (key === 'effortRequired') {
    if (weeklyHours <= 3) return 'Low';
    if (weeklyHours <= 7) return 'Medium';
    return 'High';
  }

  if (key === 'timeToFirstRupee') {
    if (experience === 'Intermediate' && weeklyHours >= 6) return 'Short';
    if (weeklyHours <= 3) return 'Long';
    return 'Medium';
  }

  if (key === 'failureProbability') {
    if (experience === 'Intermediate' && weeklyHours >= 6) return 'Low';
    if (weeklyHours <= 3) return 'High';
    return 'Medium';
  }

  return defaultValue;
};

export default function SystemAttributesPanel({
  attributes,
  personalize,
  setPersonalize,
  pinned,
  setPinned
}: SystemAttributesPanelProps) {
  const renderedAttributes = useMemo(
    () =>
      attributes.map((attribute) => ({
        ...attribute,
        displayValue: getPersonalizedStatus(attribute.key, personalize, attribute.defaultValue)
      })),
    [attributes, personalize]
  );

  return (
    <aside className="h-full space-y-4 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">System Attributes</h2>
        <button
          onClick={() => setPinned(!pinned)}
          className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600"
        >
          {pinned ? 'Always visible' : 'Auto-hide'}
        </button>
      </div>

      <section className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-semibold text-slate-800">Personalize</h3>
        <div>
          <div className="mb-1 flex justify-between text-sm text-slate-600">
            <span>Weekly hours</span>
            <span>{personalize.weeklyHours} hrs</span>
          </div>
          <input
            className="w-full"
            type="range"
            min={1}
            max={12}
            value={personalize.weeklyHours}
            onChange={(event) =>
              setPersonalize({ ...personalize, weeklyHours: Number(event.target.value) })
            }
          />
        </div>
        <div className="flex gap-2">
          {(['Beginner', 'Intermediate'] as const).map((experience) => (
            <button
              key={experience}
              onClick={() => setPersonalize({ ...personalize, experience })}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                personalize.experience === experience
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-300 text-slate-600'
              }`}
            >
              {experience}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        {renderedAttributes.map((attribute) => (
          <article key={attribute.key} className="rounded-xl border border-slate-200 p-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-800">{attribute.label}</h3>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  statusStyles[attribute.displayValue] ?? 'bg-slate-100 text-slate-700'
                }`}
              >
                {attribute.displayValue}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">{attribute.description}</p>
          </article>
        ))}
      </section>
    </aside>
  );
}
