import { courseData } from './courseData';

export type ProgressState = 'Not started' | 'In progress' | 'Done';

export type ProgressMap = Record<string, ProgressState>;

export const progressOptions: ProgressState[] = ['Not started', 'In progress', 'Done'];

export const getInitialProgress = (): ProgressMap => {
  const entries = courseData.phases.flatMap((phase) =>
    phase.groups.map((group) => [group.id, 'Not started' as ProgressState])
  );

  return Object.fromEntries(entries);
};

const progressWeight: Record<ProgressState, number> = {
  'Not started': 0,
  'In progress': 0.5,
  Done: 1
};

export const computePhaseProgress = (groupIds: string[], progress: ProgressMap): number => {
  if (!groupIds.length) return 0;

  const total = groupIds.reduce((sum, id) => {
    const state = progress[id] ?? 'Not started';
    return sum + progressWeight[state];
  }, 0);

  return Math.round((total / groupIds.length) * 100);
};

export const computeOverallProgress = (progress: ProgressMap): number => {
  const allGroups = courseData.phases.flatMap((phase) => phase.groups.map((group) => group.id));
  return computePhaseProgress(allGroups, progress);
};

export const exportPlan = (progress: ProgressMap): string => {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      course: courseData,
      progress
    },
    null,
    2
  );
};
