export type StatusTag = 'Low' | 'Medium' | 'High' | 'Short' | 'Long';

export interface WeekGroup {
  id: string;
  weeksRange: string;
  title: string;
  topics: string[];
  exercise: string;
  output: string;
}

export interface Phase {
  id: string;
  title: string;
  weeksRange: string;
  goal: string;
  groups: WeekGroup[];
}

export interface SystemAttribute {
  key: string;
  label: string;
  description: string;
  scaleType: 'level' | 'time';
  defaultValue: StatusTag;
}

export interface CourseData {
  phases: Phase[];
  systemAttributes: SystemAttribute[];
  checkpoints: number[];
}

export const courseData: CourseData = {
  checkpoints: [12, 24, 36, 52],
  phases: [
    {
      id: 'phase-1',
      title: 'PHASE 1 — Thinking Like an Analyst',
      weeksRange: 'Weeks 1–8',
      goal: 'Learn how analysts think before touching tools',
      groups: [
        {
          id: 'w1-2',
          weeksRange: 'Weeks 1–2',
          title: 'Analyst Mindset & Problem Framing',
          topics: [
            'What analysts actually do (vs what textbooks say)',
            'Difference between information vs insight',
            'How to frame a business question properly'
          ],
          exercise: 'Convert vague problems into clear research questions',
          output: '1-page problem framing note'
        },
        {
          id: 'w3-4',
          weeksRange: 'Weeks 3–4',
          title: 'Asking the Right Questions',
          topics: [
            'Hypothesis-driven thinking',
            'MECE principle (without jargon overload)',
            'Demand-side vs supply-side questions'
          ],
          exercise: 'Build 5 hypotheses for one industry',
          output: 'Hypothesis tree (1 slide)'
        },
        {
          id: 'w5-6',
          weeksRange: 'Weeks 5–6',
          title: 'Structuring Information',
          topics: [
            'How to structure messy data',
            'Pyramid principle for writing',
            'Insight > evidence > implication'
          ],
          exercise: 'Rewrite a messy article into a clean structure',
          output: '1–2 page structured insight memo'
        },
        {
          id: 'w7-8',
          weeksRange: 'Weeks 7–8',
          title: 'Decision-Oriented Thinking',
          topics: [
            'What makes analysis useful',
            'Biases analysts must avoid',
            'Writing for decision-makers'
          ],
          exercise: 'Rewrite analysis for a CEO vs a student',
          output: 'Decision-ready summary (1 page)'
        }
      ]
    },
    {
      id: 'phase-2',
      title: 'PHASE 2 — Market Sizing & Industry Basics',
      weeksRange: 'Weeks 9–20',
      goal: 'Quantify markets and understand industries',
      groups: [
        {
          id: 'w9-10',
          weeksRange: 'Weeks 9–10',
          title: 'Market Sizing Fundamentals',
          topics: [
            'What TAM / SAM / SOM really mean',
            'Top-down vs bottom-up sizing',
            'Common sizing mistakes'
          ],
          exercise: 'Size a familiar market (e.g., food delivery)',
          output: 'Market sizing worksheet'
        },
        {
          id: 'w11-12',
          weeksRange: 'Weeks 11–12',
          title: 'Bottom-Up Market Sizing',
          topics: [
            'Unit economics logic',
            'Population × penetration × price',
            'Sensitivity analysis (simple)'
          ],
          exercise: 'Re-size the same market differently',
          output: 'Market sizing model (Excel/Sheets)'
        },
        {
          id: 'w13-14',
          weeksRange: 'Weeks 13–14',
          title: 'Industry Structure',
          topics: [
            'Industry value chains',
            'Cost drivers & revenue drivers',
            'Entry barriers & power dynamics'
          ],
          exercise: 'Map an industry value chain',
          output: 'Industry map (1 slide)'
        },
        {
          id: 'w15-16',
          weeksRange: 'Weeks 15–16',
          title: 'Competitor Analysis',
          topics: [
            'Direct vs indirect competitors',
            'Feature vs strategy comparison',
            'Positioning maps'
          ],
          exercise: 'Compare 5 competitors objectively',
          output: 'Competitor comparison deck (5–7 slides)'
        },
        {
          id: 'w17-18',
          weeksRange: 'Weeks 17–18',
          title: 'Trends & Market Evolution',
          topics: [
            'Identifying real vs fake trends',
            'Demand, tech, regulation drivers',
            'First-order vs second-order effects'
          ],
          exercise: 'Trend impact analysis',
          output: 'Trend impact brief (2 pages)'
        },
        {
          id: 'w19-20',
          weeksRange: 'Weeks 19–20',
          title: 'Market Snapshot Report',
          topics: [
            'Combining sizing + industry + competition',
            'Writing executive summaries'
          ],
          exercise: 'Full market snapshot',
          output: 'Market Snapshot Report (10–12 pages)'
        }
      ]
    },
    {
      id: 'phase-3',
      title: 'PHASE 3 — Consumer & Survey Research',
      weeksRange: 'Weeks 21–32',
      goal: 'Understand people, not just numbers',
      groups: [
        {
          id: 'w21-22',
          weeksRange: 'Weeks 21–22',
          title: 'Consumer Thinking Basics',
          topics: [
            'Jobs-to-be-Done (practical version)',
            'Behavior vs stated preference',
            'Segmentation logic'
          ],
          exercise: 'Define 3 consumer personas',
          output: 'Persona sheet'
        },
        {
          id: 'w23-24',
          weeksRange: 'Weeks 23–24',
          title: 'Survey Design',
          topics: [
            'Good vs bad questions',
            'Scales, bias, wording',
            'When NOT to use surveys'
          ],
          exercise: 'Design a 15-question survey',
          output: 'Survey questionnaire'
        },
        {
          id: 'w25-26',
          weeksRange: 'Weeks 25–26',
          title: 'Data Collection & Cleaning',
          topics: ['Sampling basics', 'Cleaning responses', 'Simple descriptive stats'],
          exercise: 'Run a small real survey (30–50 responses)',
          output: 'Cleaned dataset'
        },
        {
          id: 'w27-28',
          weeksRange: 'Weeks 27–28',
          title: 'Basic Data Analysis',
          topics: [
            'Frequencies, cross-tabs',
            'Simple charts that tell stories',
            'Insight extraction'
          ],
          exercise: 'Analyze your survey',
          output: 'Consumer insight deck (5 slides)'
        },
        {
          id: 'w29-30',
          weeksRange: 'Weeks 29–30',
          title: 'Insight Writing',
          topics: [
            'Turning charts into insights',
            'Avoiding “data dumping”',
            'Writing insight summaries'
          ],
          exercise: 'Write a consumer insight memo',
          output: '2-page consumer insight summary'
        },
        {
          id: 'w31-32',
          weeksRange: 'Weeks 31–32',
          title: 'Consumer Research Project',
          topics: ['Combine survey + desk research', 'Answer a real business question'],
          exercise: 'Deliver an end-to-end consumer research recommendation',
          output: 'Consumer Research Report'
        }
      ]
    },
    {
      id: 'phase-4',
      title: 'PHASE 4 — Desk Research & Public Data',
      weeksRange: 'Weeks 33–44',
      goal: 'Become dangerous with free data',
      groups: [
        {
          id: 'w33-34',
          weeksRange: 'Weeks 33–34',
          title: 'Desk Research Mastery',
          topics: [
            'Where analysts actually look for data',
            'Credibility checks',
            'Cross-verification'
          ],
          exercise: 'Build a source map',
          output: 'Source credibility matrix'
        },
        {
          id: 'w35-36',
          weeksRange: 'Weeks 35–36',
          title: 'Using Public Datasets',
          topics: [
            'Government data',
            'Industry reports',
            'Cleaning & interpreting secondary data'
          ],
          exercise: 'Analyze one public dataset',
          output: 'Data insight brief'
        },
        {
          id: 'w37-38',
          weeksRange: 'Weeks 37–38',
          title: 'Comparative Market Analysis',
          topics: ['Comparing regions / countries', 'Normalization logic'],
          exercise: 'Compare two markets',
          output: 'Comparative analysis slides'
        },
        {
          id: 'w39-40',
          weeksRange: 'Weeks 39–40',
          title: 'Writing for Speed & Clarity',
          topics: [
            'Writing under time pressure',
            'Executive summaries',
            'Slide logic'
          ],
          exercise: '24-hour analysis challenge',
          output: 'Rapid insight memo'
        },
        {
          id: 'w41-42',
          weeksRange: 'Weeks 41–42',
          title: 'Analyst Storytelling',
          topics: ['Narrative flow', 'Insight sequencing', 'Visual hierarchy'],
          exercise: 'Rebuild an old deck cleanly',
          output: 'Refined strategy deck'
        },
        {
          id: 'w43-44',
          weeksRange: 'Weeks 43–44',
          title: 'Portfolio Assembly',
          topics: [
            'Selecting best work',
            'Cleaning outputs',
            'Positioning yourself as an analyst'
          ],
          exercise: 'Curate and polish your strongest assets',
          output: 'Analyst Portfolio (PDF/Drive)'
        }
      ]
    },
    {
      id: 'phase-5',
      title: 'PHASE 5 — Real-World Validation & Monetization',
      weeksRange: 'Weeks 45–52',
      goal: 'Prove usefulness in the real world',
      groups: [
        {
          id: 'w45-46',
          weeksRange: 'Weeks 45–46',
          title: 'Applying to Real Problems',
          topics: [
            'Picking real startups/problems',
            'Outreach basics',
            'Offering value without desperation'
          ],
          exercise: 'Craft outreach and pitch one scoped analysis engagement',
          output: 'Outreach message + proposal'
        },
        {
          id: 'w47-48',
          weeksRange: 'Weeks 47–48',
          title: 'Live Project Execution',
          topics: ['Working with feedback', 'Iteration', 'Managing ambiguity'],
          exercise: 'Deliver a live project with two revision cycles',
          output: 'Client-style deliverable'
        },
        {
          id: 'w49-50',
          weeksRange: 'Weeks 49–50',
          title: 'Monetization & Roles',
          topics: [
            'Freelance vs internships vs analyst roles',
            'Pricing research work',
            'Role mapping'
          ],
          exercise: 'Map 3 monetization scenarios with trade-offs',
          output: 'Personal monetization plan'
        },
        {
          id: 'w51-52',
          weeksRange: 'Weeks 51–52',
          title: 'Review & Transition',
          topics: [
            'Skill audit',
            'Blind spot identification',
            'Choosing next module (Strategy Builder / Growth / Product)'
          ],
          exercise: 'Complete transition planning and next-step commitments',
          output: 'Readiness & Transition Report'
        }
      ]
    }
  ],
  systemAttributes: [
    {
      key: 'effortRequired',
      label: 'Effort required',
      description:
        'Low–Medium (~5–7 hrs/week). Effort is front-loaded early and reduces as templates and pattern memory build.',
      scaleType: 'level',
      defaultValue: 'Medium'
    },
    {
      key: 'timeToFirstRupee',
      label: 'Time-to-first-₹',
      description: 'Short–Medium. First paid gigs are realistic around Weeks 8–12 with usable deliverables.',
      scaleType: 'time',
      defaultValue: 'Medium'
    },
    {
      key: 'failureProbability',
      label: 'Failure probability',
      description: 'Low when learners stay consistent, seek feedback, and ship weekly outputs.',
      scaleType: 'level',
      defaultValue: 'Low'
    },
    {
      key: 'skillMatch',
      label: 'Skill match score',
      description: 'High for analytical and systems thinkers who enjoy structured reasoning.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'monetizableBehaviors',
      label: 'Monetizable behaviors',
      description:
        'Structuring, synthesis, insight writing, market sizing, and competitor scans become immediately sellable behaviors.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'transferableStrengths',
      label: 'Transferable strengths',
      description:
        'Builds critical thinking, data interpretation, structured writing, and decision framing across domains.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'validateSignals',
      label: 'Validate through small real-world signals',
      description:
        'Track whether slides are reused, follow-up questions increase, and decisions are influenced.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'worstCaseLoss',
      label: 'Worst-case loss',
      description: 'Low downside: mostly time investment with compounding learning assets retained.',
      scaleType: 'level',
      defaultValue: 'Low'
    },
    {
      key: 'bestCaseUpside',
      label: 'Best-case upside',
      description: 'High upside: leverage, reputation, and trajectory toward trusted advisor roles.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'timeHorizon',
      label: 'Time horizon',
      description: '1 year standalone program with compounding benefits far beyond completion.',
      scaleType: 'time',
      defaultValue: 'Long'
    },
    {
      key: 'clearExitPaths',
      label: 'Clear exit paths',
      description: 'Transitions cleanly into growth, product, consulting, and policy research tracks.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'modularPaths',
      label: 'Modular paths',
      description: 'Each phase and week-group can stand alone as a reusable learning and portfolio module.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'customStartingPoint',
      label: 'Custom starting point',
      description: 'Learners can begin from writing, data, survey, or desk research based on readiness.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'depthLevels',
      label: 'Optional depth levels',
      description: 'Topics support surface, applied, and deep dives without breaking progression.',
      scaleType: 'level',
      defaultValue: 'Medium'
    },
    {
      key: 'transferableSkills',
      label: 'Transferable skills',
      description: 'Methods transfer into strategy, product decisions, investing, and operations contexts.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'multipleMonetizationPaths',
      label: 'Multiple monetization paths',
      description: 'Supports freelance, internships, retainers, and pitch-support opportunities.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'pivotLogic',
      label: 'Pivot logic built-in',
      description: 'Week 12/24/36/52 checkpoints trigger review and pivot decisions intentionally.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'coreStable',
      label: 'Core stays stable',
      description: 'Sense-making and decision support remain the stable core across market shifts.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'expressionAdapts',
      label: 'Expression adapts',
      description: 'Insights can be delivered as memos, decks, dashboards, or briefings.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'transitionPaths',
      label: 'Clear transition paths',
      description: 'Progression supports analyst → strategist → advisor career evolution.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'removeBlindSpots',
      label: 'Remove blind spots',
      description: 'Bias checks and assumption tracking reduce blind spots over time.',
      scaleType: 'level',
      defaultValue: 'High'
    },
    {
      key: 'compressTime',
      label: 'Compress time',
      description: 'Pattern learning across industries speeds up high-quality decision-making.',
      scaleType: 'time',
      defaultValue: 'Medium'
    },
    {
      key: 'preserveAutonomy',
      label: 'Preserve autonomy',
      description: 'Choose projects, pace, and depth while retaining clear optional exits.',
      scaleType: 'level',
      defaultValue: 'High'
    }
  ]
};

export const checkpointGroupIds = new Set(['w11-12', 'w23-24', 'w35-36', 'w51-52']);
