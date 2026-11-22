'use client'

import { useReducedMotion } from 'framer-motion'

type Tone = 'keyword' | 'type' | 'plain'

const TONE_FILL: Record<Tone, string> = {
  keyword: 'var(--accent)',
  type: 'var(--loot)',
  plain: 'var(--ink)',
}

// Each line: indent level and coloured tokens.
const CODE: readonly { indent: number; tokens: readonly [Tone, string][] }[] = [
  { indent: 0, tokens: [['keyword', 'public class '], ['type', 'Program']] },
  { indent: 0, tokens: [['plain', '{']] },
  { indent: 1, tokens: [['keyword', 'static void '], ['plain', 'Main()']] },
  { indent: 1, tokens: [['plain', '{']] },
  { indent: 2, tokens: [['type', 'Console'], ['plain', '.Wr']] },
]

const LEFT = 52
const TOP = 62
const LINE = 21
const CHAR = 7.8
const INDENT = 4
const CARET_LINE = CODE.length - 1
const CARET_X = LEFT + (CODE[CARET_LINE].indent * INDENT + 'Console.Wr'.length) * CHAR + 1
const POPUP = { x: LEFT + CODE[CARET_LINE].indent * INDENT * CHAR + 8 * CHAR, y: TOP + CARET_LINE * LINE + 10, width: 232 }
const SUGGESTIONS = ['WriteLine', 'Write']

export default function VsLikeVisual({ label }: { label: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="flex h-full w-full items-center justify-center p-5 md:p-6">
      <svg viewBox="0 0 480 260" role="img" aria-label={label} className="h-auto w-full max-w-[30rem] font-mono">
        <rect x="12" y="10" width="456" height="240" rx="10" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.5" />
        <line x1="12" y1="38" x2="468" y2="38" stroke="var(--line)" strokeWidth="1.5" />
        {[0, 1, 2].map(index => (
          <circle key={index} cx={30 + index * 13} cy="24" r="4" fill="var(--line-strong)" />
        ))}
        <text x="84" y="28" fontSize="12" fill="var(--muted)">
          Program.cs
        </text>

        {CODE.map((line, index) => (
          <g key={index}>
            <text x="34" y={TOP + index * LINE} fontSize="11" textAnchor="end" fill="var(--faint)">
              {index + 1}
            </text>
            <text x={LEFT + line.indent * INDENT * CHAR} y={TOP + index * LINE} fontSize="13" xmlSpace="preserve">
              {line.tokens.map(([tone, text]) => (
                <tspan key={text} fill={TONE_FILL[tone]}>
                  {text}
                </tspan>
              ))}
            </text>
          </g>
        ))}

        <rect x={CARET_X} y={TOP + CARET_LINE * LINE - 12} width="1.6" height="16" fill="var(--ink)">
          {!reduceMotion && (
            <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.5;1" dur="1.1s" repeatCount="indefinite" />
          )}
        </rect>

        <g>
          <rect
            x={POPUP.x}
            y={POPUP.y}
            width={POPUP.width}
            height="80"
            rx="7"
            fill="var(--surface)"
            stroke="var(--line-strong)"
            strokeWidth="1.5"
          />
          {SUGGESTIONS.map((name, index) => (
            <g key={name}>
              {index === 0 && (
                <rect x={POPUP.x + 4} y={POPUP.y + 5} width={POPUP.width - 8} height="22" rx="4" fill="var(--accent-soft)" />
              )}
              <rect x={POPUP.x + 12} y={POPUP.y + 11 + index * 24} width="10" height="10" rx="2" fill="var(--accent)" />
              <text x={POPUP.x + 30} y={POPUP.y + 20 + index * 24} fontSize="12.5" fill="var(--ink)">
                {name}
              </text>
            </g>
          ))}
          <line x1={POPUP.x} y1={POPUP.y + 54} x2={POPUP.x + POPUP.width} y2={POPUP.y + 54} stroke="var(--line)" />
          <text x={POPUP.x + 12} y={POPUP.y + 71} fontSize="10.5" fill="var(--muted)">
            void Console.WriteLine(string?)
          </text>
        </g>
      </svg>
    </div>
  )
}
