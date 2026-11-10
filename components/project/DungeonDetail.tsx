'use client'

import { useLanguage } from '../LanguageProvider'
import CopyButton from '../CopyButton'
import DungeonGame from '../game/DungeonGame'
import { DUNGEON_RUN_COMMANDS, LEGEND, type Tone } from '@/lib/projects'

const TONE_CLASS: Record<Tone, string> = {
  player: 'text-accent',
  rival: 'text-rival',
  loot: 'text-loot',
  danger: 'text-danger',
}

const RUN_COMMANDS = DUNGEON_RUN_COMMANDS.join('\n')
const SUBHEADING = 'font-display text-xl font-semibold'

export default function DungeonDetail({ paragraphs }: { paragraphs: readonly string[] }) {
  const { t } = useLanguage()
  const text = t.detail.dungeon

  return (
    <>
      <section aria-labelledby="play-heading" className="mt-10 md:mt-14">
        <div className="mb-6 grid gap-x-16 gap-y-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-baseline">
          <h2 id="play-heading" className="font-display text-2xl font-semibold md:text-[1.75rem]">
            {text.playHeading}
          </h2>
          <p className="text-muted">{text.playIntro}</p>
        </div>
        <DungeonGame />
      </section>

      <div className="mt-16 grid gap-12 border-t border-line pt-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20 md:mt-20 md:pt-16">
        <div className="max-w-[72ch] space-y-5 text-lg">
          {paragraphs.map((paragraph, index) => (
            <p key={paragraph} className={index > 0 ? 'text-muted' : undefined}>
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="border-b border-line">
          {text.points.map(point => (
            <li key={point.title} className="border-t border-line py-5">
              <h3 className="font-semibold">{point.title}</h3>
              <p className="mt-1.5 text-muted">{point.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20 md:mt-20">
        <section aria-labelledby="legend-heading" className="min-w-0">
          <h2 id="legend-heading" className={SUBHEADING}>
            {text.legendTitle}
          </h2>
          <dl className="mt-4 grid gap-x-10 sm:grid-cols-2">
            {LEGEND.map(entry => (
              <div key={entry.key} className="flex items-baseline gap-4 border-t border-line py-3">
                <dt className={`w-5 shrink-0 text-center font-mono text-lg font-bold ${TONE_CLASS[entry.tone]}`}>
                  {entry.glyph}
                </dt>
                <dd>{text.legend[entry.key]}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="run-heading" className="min-w-0">
          <h2 id="run-heading" className={SUBHEADING}>
            {text.runTitle}
          </h2>
          <pre
            tabIndex={0}
            className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface px-5 py-4 font-mono text-[0.8125rem] leading-[1.9]"
          >
            <code>{RUN_COMMANDS}</code>
          </pre>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <p className="max-w-[40ch] text-[0.95rem] text-muted">{text.runNote}</p>
            <CopyButton value={RUN_COMMANDS} labels={{ copy: text.copy, copied: text.copied, failed: text.copyFailed }} />
          </div>
        </section>
      </div>
    </>
  )
}
