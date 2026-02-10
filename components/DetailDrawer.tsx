import { checkpointGroupIds, type WeekGroup } from '@/lib/courseData';
import type { ProgressMap, ProgressState } from '@/lib/progressStore';

interface DetailDrawerProps {
  selectedGroup: WeekGroup | null;
  selectedPhaseTitle?: string;
  progress: ProgressMap;
  onProgressChange: (id: string, value: ProgressState) => void;
}

const progressStates: ProgressState[] = ['Not started', 'In progress', 'Done'];

export default function DetailDrawer({
  selectedGroup,
  selectedPhaseTitle,
  progress,
  onProgressChange
}: DetailDrawerProps) {
  if (!selectedGroup) {
    return (
      <aside className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-sm text-slate-500">Select a week group to inspect the full learning plan.</p>
      </aside>
    );
  }

  return (
    <aside className="h-full space-y-5 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{selectedPhaseTitle}</p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">{selectedGroup.title}</h2>
        <p className="text-sm text-slate-600">{selectedGroup.weeksRange}</p>
      </div>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-800">Learning topics</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          {selectedGroup.topics.map((topic) => (
            <li key={topic} className="rounded-lg bg-slate-50 px-3 py-2">
              {topic}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-semibold text-slate-800">Exercise instructions</h3>
        <p className="text-sm text-slate-700">{selectedGroup.exercise}</p>
      </section>

      <section className="space-y-2 rounded-xl border border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-slate-800">Output artifact</h3>
        <p className="text-sm text-slate-700">{selectedGroup.output}</p>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Output template placeholder ↗
        </button>
      </section>

      {checkpointGroupIds.has(selectedGroup.id) && (
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Checkpoint signal</p>
          <p className="mt-2 text-sm text-amber-800">
            Run a pivot review now: validate traction, assess fit, and decide to deepen, pivot, or transition.
          </p>
        </section>
      )}

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-800">Progress</h3>
        <div className="flex flex-wrap gap-2">
          {progressStates.map((state) => (
            <button
              key={state}
              onClick={() => onProgressChange(selectedGroup.id, state)}
              className={`rounded-full border px-3 py-1 text-sm transition ${
                progress[selectedGroup.id] === state
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-300 text-slate-600 hover:border-slate-400'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
