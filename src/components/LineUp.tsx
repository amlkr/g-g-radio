import type { ReactNode } from 'react'
import { ShaderBackground } from './Chaos'

type Show = {
  dates: string
  title: string
  lineup: string[]
  tags: string[]
  location: string
}

/** Demo board — same shape as the reference poster, house tokens, real drops pending. */
const BOARD: Show[] = [
  {
    dates: '01 DEC',
    title: 'Pilot Session 01',
    lineup: ['TBA'],
    tags: ['Live Set'],
    location: 'Studio — Chiang Mai',
  },
  {
    dates: '08 DEC',
    title: 'First Interview',
    lineup: ['Guest TBA'],
    tags: ['Talk', 'Audio'],
    location: 'TBA',
  },
  {
    dates: '15 DEC',
    title: 'Documentary Slot 01',
    lineup: ['Film TBA'],
    tags: ['Music Doc'],
    location: 'TBA',
  },
  {
    dates: '20 DEC',
    title: 'Year-End Mix',
    lineup: ['G_G Crew'],
    tags: ['DJ Set'],
    location: 'Studio — Chiang Mai',
  },
  {
    dates: '10 JAN',
    title: 'Podcast Premiere',
    lineup: ['Ep. 01'],
    tags: ['Audio'],
    location: 'TBA',
  },
  {
    dates: '17 JAN',
    title: 'Live Video Test',
    lineup: ['Session TBA'],
    tags: ['Video', 'Live'],
    location: 'TBA',
  },
  {
    dates: '24 JAN',
    title: 'Guest Residency 01',
    lineup: ['Artist TBA'],
    tags: ['Live Set'],
    location: 'TBA',
  },
  {
    dates: '31 JAN',
    title: 'Month-Close Broadcast',
    lineup: ['G_G Crew'],
    tags: ['Talk', 'Music'],
    location: 'Studio — Chiang Mai',
  },
]

function Pill({ children, tone = 'outline' }: { children: ReactNode; tone?: 'vermilion' | 'bone' | 'outline' }) {
  const cls =
    tone === 'vermilion'
      ? 'bg-vermilion text-void'
      : tone === 'bone'
        ? 'bg-bone text-void'
        : 'border border-bone/50 text-bone'
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wide ${cls}`}>
      {children}
    </span>
  )
}

/**
 * Line up on black, with the Chaos flow-field shader moving behind the
 * board (21st.dev id 44511, house palette). The shader pauses itself when
 * off-screen; reduced-motion visitors get the static black.
 */
export function LineUp() {
  const columns = [BOARD.slice(0, 2), BOARD.slice(2, 4), BOARD.slice(4, 6), BOARD.slice(6, 8)]
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="relative mt-4 overflow-hidden">
      {!reduced && (
        <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_82%)]">
          <ShaderBackground className="h-full w-full" />
        </div>
      )}

      {/* the board */}
      <div className="relative grid grid-cols-1 gap-x-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col">
            {col.map((show) => (
              <article key={show.title} className="border-b border-bone/20 py-6">
                <Pill tone="vermilion">{show.dates}</Pill>
                <h3 className="mt-4 font-mono text-sm font-bold uppercase text-bone">{show.title}</h3>
                <ul className="mt-3 space-y-1">
                  {show.lineup.map((name) => (
                    <li key={name} className="font-mono text-sm font-bold uppercase text-vermilion">
                      {name}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {show.tags.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
                <p className="mt-4">
                  <Pill tone="bone">Location : {show.location}</Pill>
                </p>
              </article>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
