'use client';

import { useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MarkerType,
  Node,
  NodeProps,
  Position,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';

import type { CourseData, Phase, WeekGroup } from '@/lib/courseData';
import { checkpointGroupIds } from '@/lib/courseData';
import {
  computeOverallProgress,
  computePhaseProgress,
  exportPlan,
  type ProgressMap,
  type ProgressState
} from '@/lib/progressStore';
import DetailDrawer from './DetailDrawer';
import ProgressBar from './ProgressBar';
import SystemAttributesPanel from './SystemAttributesPanel';

interface FlowCanvasProps {
  data: CourseData;
  progress: ProgressMap;
  onProgressChange: (id: string, state: ProgressState) => void;
}

interface WeekNodeData {
  group: WeekGroup;
  phaseTitle: string;
  onSelect: (group: WeekGroup, phaseTitle: string) => void;
  progress: ProgressMap;
  onProgressChange: (id: string, state: ProgressState) => void;
}

const statusCycle: ProgressState[] = ['Not started', 'In progress', 'Done'];

const WeekNode = ({ data }: NodeProps<WeekNodeData>) => {
  const visibleTopics = data.group.topics.slice(0, 3);
  const hiddenCount = Math.max(0, data.group.topics.length - visibleTopics.length);
  const progressState = data.progress[data.group.id] ?? 'Not started';

  return (
    <div className="w-[300px] rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{data.group.weeksRange}</p>
          <p className="text-sm font-semibold text-slate-900">{data.group.title}</p>
        </div>
        {checkpointGroupIds.has(data.group.id) && (
          <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-700">
            Checkpoint
          </span>
        )}
      </div>

      <ul className="mb-2 list-disc space-y-1 pl-5 text-xs text-slate-600">
        {visibleTopics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
        {hiddenCount > 0 && <li>+ {hiddenCount} more</li>}
      </ul>

      <p className="text-xs text-slate-600">
        <span className="font-semibold">Exercise: </span>
        {data.group.exercise}
      </p>
      <p className="mt-1 text-xs text-slate-700">
        <span className="font-semibold">Output artifact: </span>
        {data.group.output}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={() => data.onSelect(data.group, data.phaseTitle)}
          className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-medium text-white"
        >
          Details
        </button>
        <button
          onClick={() => {
            const current = statusCycle.indexOf(progressState);
            const next = statusCycle[(current + 1) % statusCycle.length];
            data.onProgressChange(data.group.id, next);
          }}
          className="rounded-lg border border-slate-300 px-3 py-1 text-xs text-slate-700"
        >
          {progressState}
        </button>
      </div>
    </div>
  );
};



function WeekGroupCard({
  group,
  phaseTitle,
  progress,
  onProgressChange,
  onSelect
}: {
  group: WeekGroup;
  phaseTitle: string;
  progress: ProgressMap;
  onProgressChange: (id: string, state: ProgressState) => void;
  onSelect: (group: WeekGroup, phaseTitle: string) => void;
}) {
  const visibleTopics = group.topics.slice(0, 3);
  const hiddenCount = Math.max(0, group.topics.length - visibleTopics.length);
  const progressState = progress[group.id] ?? 'Not started';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{group.weeksRange}</p>
          <p className="text-sm font-semibold text-slate-900">{group.title}</p>
        </div>
        {checkpointGroupIds.has(group.id) && (
          <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-700">
            Checkpoint
          </span>
        )}
      </div>

      <ul className="mb-2 list-disc space-y-1 pl-5 text-xs text-slate-600">
        {visibleTopics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
        {hiddenCount > 0 && <li>+ {hiddenCount} more</li>}
      </ul>

      <p className="text-xs text-slate-600">
        <span className="font-semibold">Exercise: </span>
        {group.exercise}
      </p>
      <p className="mt-1 text-xs text-slate-700">
        <span className="font-semibold">Output artifact: </span>
        {group.output}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={() => onSelect(group, phaseTitle)}
          className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-medium text-white"
        >
          Details
        </button>
        <button
          onClick={() => {
            const current = statusCycle.indexOf(progressState);
            const next = statusCycle[(current + 1) % statusCycle.length];
            onProgressChange(group.id, next);
          }}
          className="rounded-lg border border-slate-300 px-3 py-1 text-xs text-slate-700"
        >
          {progressState}
        </button>
      </div>
    </div>
  );
}

const nodeTypes = { weekNode: WeekNode };

function buildFlow(phaseData: Phase[], expanded: Record<string, boolean>, weekNodeData: WeekNodeDataBase) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  phaseData.forEach((phase, phaseIndex) => {
    const phaseX = 80 + phaseIndex * 340;
    nodes.push({
      id: phase.id,
      position: { x: phaseX, y: 40 },
      data: { label: `${phase.title}\n${phase.weeksRange}\n${phase.goal}` },
      type: 'input',
      style: {
        width: 280,
        borderRadius: 18,
        border: '1px solid #cbd5e1',
        boxShadow: '0 8px 30px rgba(15,23,42,0.08)',
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: 'pre-line',
        padding: 12,
        background: '#f8fafc'
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Left
    });

    if (phaseIndex > 0) {
      edges.push({
        id: `${phaseData[phaseIndex - 1].id}-${phase.id}`,
        source: phaseData[phaseIndex - 1].id,
        target: phase.id,
        markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
        style: { stroke: '#64748b' }
      });
    }

    if (expanded[phase.id]) {
      phase.groups.forEach((group, groupIndex) => {
        const groupId = `${phase.id}-${group.id}`;
        const y = 190 + groupIndex * 250;

        nodes.push({
          id: groupId,
          type: 'weekNode',
          position: { x: phaseX - 10, y },
          data: {
            ...weekNodeData,
            group,
            phaseTitle: phase.title
          }
        });

        edges.push({
          id: `${phase.id}-${groupId}`,
          source: phase.id,
          target: groupId,
          markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 },
          style: { stroke: '#94a3b8' }
        });
      });
    }
  });

  return { nodes, edges };
}

interface WeekNodeDataBase {
  onSelect: (group: WeekGroup, phaseTitle: string) => void;
  progress: ProgressMap;
  onProgressChange: (id: string, state: ProgressState) => void;
}

export default function FlowCanvas({ data, progress, onProgressChange }: FlowCanvasProps) {
  const [selectedGroup, setSelectedGroup] = useState<WeekGroup | null>(null);
  const [selectedPhaseTitle, setSelectedPhaseTitle] = useState<string>('');
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>(
    Object.fromEntries(data.phases.map((phase, index) => [phase.id, index === 0]))
  );
  const [attributesPinned, setAttributesPinned] = useState(true);
  const [personalize, setPersonalize] = useState<{ weeklyHours: number; experience: 'Beginner' | 'Intermediate' }>({
    weeklyHours: 6,
    experience: 'Beginner'
  });

  const weekNodeData = useMemo<WeekNodeDataBase>(
    () => ({
      onSelect: (group, phaseTitle) => {
        setSelectedGroup(group);
        setSelectedPhaseTitle(phaseTitle);
      },
      progress,
      onProgressChange,
    }),
    [progress, onProgressChange]
  );

  const { nodes, edges } = useMemo(
    () => buildFlow(data.phases, expandedPhases, weekNodeData),
    [data.phases, expandedPhases, weekNodeData]
  );

  const downloadExport = () => {
    const payload = exportPlan(progress);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'foundation-analyst-plan.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const overallProgress = computeOverallProgress(progress);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {data.phases.map((phase) => (
          <button
            key={phase.id}
            onClick={() => setExpandedPhases((prev) => ({ ...prev, [phase.id]: !prev[phase.id] }))}
            className={`rounded-full border px-4 py-2 text-sm font-medium ${
              expandedPhases[phase.id]
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-slate-300 text-slate-700'
            }`}
          >
            {expandedPhases[phase.id] ? 'Collapse' : 'Expand'} {phase.title.split('—')[0].trim()}
          </button>
        ))}
        <button
          onClick={downloadExport}
          className="ml-auto rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Export Plan
        </button>
      </div>

      <ProgressBar label="Overall course progress" value={overallProgress} />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px_340px]">
        <section className="hidden min-h-[700px] rounded-2xl border border-slate-200 bg-white p-3 shadow-soft md:block">
          <ReactFlowProvider>
            <ReactFlow
              fitView
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              minZoom={0.2}
              maxZoom={1.2}
              proOptions={{ hideAttribution: true }}
            >
              <Background color="#e2e8f0" gap={24} />
              <Controls />
            </ReactFlow>
          </ReactFlowProvider>
        </section>

        <section className="space-y-3 md:hidden">
          {data.phases.map((phase) => {
            const groupIds = phase.groups.map((group) => group.id);
            const phaseProgress = computePhaseProgress(groupIds, progress);

            return (
              <article key={phase.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{phase.title}</h3>
                    <p className="text-sm text-slate-600">{phase.goal}</p>
                  </div>
                  <button
                    onClick={() => setExpandedPhases((prev) => ({ ...prev, [phase.id]: !prev[phase.id] }))}
                    className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700"
                  >
                    {expandedPhases[phase.id] ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="mt-3">
                  <ProgressBar label="Phase progress" value={phaseProgress} />
                </div>
                {expandedPhases[phase.id] && (
                  <div className="mt-3 space-y-3">
                    {phase.groups.map((group) => (
                      <WeekGroupCard
                        key={group.id}
                        group={group}
                        phaseTitle={phase.title}
                        progress={progress}
                        onProgressChange={onProgressChange}
                        onSelect={(selected, phaseTitle) => {
                          setSelectedGroup(selected);
                          setSelectedPhaseTitle(phaseTitle);
                        }}
                      />
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </section>

        <DetailDrawer
          selectedGroup={selectedGroup}
          selectedPhaseTitle={selectedPhaseTitle}
          progress={progress}
          onProgressChange={onProgressChange}
        />

        <section className={attributesPinned ? 'block' : 'hidden xl:block'}>
          <SystemAttributesPanel
            attributes={data.systemAttributes}
            personalize={personalize}
            setPersonalize={setPersonalize}
            pinned={attributesPinned}
            setPinned={setAttributesPinned}
          />
        </section>
      </div>
    </div>
  );
}
