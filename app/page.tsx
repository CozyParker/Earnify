'use client';

import { useState } from 'react';

import FlowCanvas from '@/components/FlowCanvas';
import { courseData } from '@/lib/courseData';
import { getInitialProgress, type ProgressState } from '@/lib/progressStore';

export default function HomePage() {
  const [progress, setProgress] = useState(getInitialProgress);

  const handleProgressChange = (groupId: string, state: ProgressState) => {
    setProgress((prev) => ({ ...prev, [groupId]: state }));
  };

  return (
    <main className="min-h-screen px-4 py-6 md:px-8">
      <header className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Course flow planner</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
          Foundation Analyst (52 Weeks)
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
          Responsive flow UI to navigate 5 phases, inspect weekly outputs, track momentum, and personalize
          effort/timeline expectations.
        </p>
      </header>

      <FlowCanvas data={courseData} progress={progress} onProgressChange={handleProgressChange} />
    </main>
  );
}
