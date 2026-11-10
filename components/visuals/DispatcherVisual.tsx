'use client'

import { useReducedMotion } from 'framer-motion'

const QUEUE_SLOTS = [0, 1, 2, 3, 4]
const SLOT = { x: 168, y: 113, width: 26, height: 34, gap: 3 }
const QUEUE_END = SLOT.x + QUEUE_SLOTS.length * (SLOT.width + SLOT.gap)
const WORKERS = [
  { name: 'worker 1', y: 30 },
  { name: 'worker 2', y: 105 },
  { name: 'worker 3', y: 180 },
]
const WORKER = { x: 372, width: 92, height: 50 }
const MID_Y = 130
const TASK_SECONDS = 2.7

const workerPath = (y: number) =>
  `M${QUEUE_END} ${MID_Y} C ${QUEUE_END + 34} ${MID_Y}, ${WORKER.x - 34} ${y + WORKER.height / 2}, ${WORKER.x} ${y + WORKER.height / 2}`

const taskPath = (y: number) => `M118 ${MID_Y} L${QUEUE_END} ${MID_Y} ${workerPath(y).replace(/^M[\d.]+ [\d.]+/, '')}`

export default function DispatcherVisual({ label }: { label: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="flex h-full w-full items-center justify-center p-5 md:p-6">
      <svg viewBox="0 0 480 260" role="img" aria-label={label} className="h-auto w-full max-w-[30rem] font-mono">
        <g fill="none" stroke="var(--line-strong)" strokeWidth="1.5">
          <path d={`M118 ${MID_Y} L${SLOT.x} ${MID_Y}`} />
          {WORKERS.map(worker => (
            <path key={worker.name} d={workerPath(worker.y)} />
          ))}
        </g>

        <rect x="18" y="100" width="100" height="60" rx="8" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.5" />
        <text x="68" y="135" textAnchor="middle" fontSize="14" fill="var(--ink)">
          parent
        </text>

        {QUEUE_SLOTS.map(index => (
          <rect
            key={index}
            x={SLOT.x + index * (SLOT.width + SLOT.gap)}
            y={SLOT.y}
            width={SLOT.width}
            height={SLOT.height}
            rx="4"
            fill="var(--surface)"
            stroke="var(--line-strong)"
            strokeWidth="1.5"
          />
        ))}
        <text x={(SLOT.x + QUEUE_END) / 2} y={SLOT.y - 12} textAnchor="middle" fontSize="12" fill="var(--muted)">
          message queue
        </text>

        {WORKERS.map(worker => (
          <g key={worker.name}>
            <rect
              x={WORKER.x}
              y={worker.y}
              width={WORKER.width}
              height={WORKER.height}
              rx="8"
              fill="var(--surface)"
              stroke="var(--line-strong)"
              strokeWidth="1.5"
            />
            <text
              x={WORKER.x + WORKER.width / 2}
              y={worker.y + WORKER.height / 2 + 5}
              textAnchor="middle"
              fontSize="13"
              fill="var(--ink)"
            >
              {worker.name}
            </text>
          </g>
        ))}

        {reduceMotion
          ? [1, 3].map(index => (
              <circle
                key={index}
                cx={SLOT.x + index * (SLOT.width + SLOT.gap) + SLOT.width / 2}
                cy={MID_Y}
                r="5"
                fill="var(--accent)"
              />
            ))
          : WORKERS.map((worker, index) => (
              <circle key={worker.name} r="5" fill="var(--accent)" opacity="0">
                <animateMotion
                  dur={`${TASK_SECONDS}s`}
                  begin={`${(index * TASK_SECONDS) / WORKERS.length}s`}
                  repeatCount="indefinite"
                  path={taskPath(worker.y)}
                />
                <animate
                  attributeName="opacity"
                  dur={`${TASK_SECONDS}s`}
                  begin={`${(index * TASK_SECONDS) / WORKERS.length}s`}
                  repeatCount="indefinite"
                  values="0;1;1;0"
                  keyTimes="0;0.06;0.9;1"
                />
              </circle>
            ))}
      </svg>
    </div>
  )
}
