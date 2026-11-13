import { useState } from 'react'
import { Ticker } from './components/Ticker'
import { Archive, type ArchiveItem } from './components/Archive'
import { Footer } from './components/Footer'
import { LineUp } from './components/LineUp'

const FORMATS = ['Podcasts', 'Live Video', 'Interviews', 'Music Films'] as const

const FORMAT_DESC: Record<string, string> = {
  Podcasts: 'Recorded talks and sets.',
  'Live Video': 'Broadcasts with the lights on.',
  Interviews: 'Long conversations with people who make things.',
  'Music Films': 'Documentaries and clips from the grid.',
}

/** First track of the station — later replaced by the real stream URL. */
const TRACK = { id: '1t7W6NtTKAw', title: 'Lebanese Blonde', artist: 'Thievery Corporation' } as const

/** Placeholder content for the [ demo ] toggle only — never the production state. */
const DEMO: Record<string, ArchiveItem[]> = {
  Podcasts: [
    { id: 'p01', title: 'Set 01', kind: 'Audio', meta: '42 MIN · DEMO', seed: 'sr-p01' },
    { id: 'p02', title: 'Set 02', kind: 'Audio', meta: '38 MIN · DEMO', seed: 'sr-p02' },
    { id: 'p03', title: 'Set 03', kind: 'Audio', meta: '51 MIN · DEMO', seed: 'sr-p03' },
    { id: 'p04', title: 'Set 04', kind: 'Audio', meta: '29 MIN · DEMO', seed: 'sr-p04' },
    { id: 'p05', title: 'Set 05', kind: 'Audio', meta: '47 MIN · DEMO', seed: 'sr-p05' },
    { id: 'p06', title: 'Set 06', kind: 'Audio', meta: '33 MIN · DEMO', seed: 'sr-p06' },
    { id: 'p07', title: 'Set 07', kind: 'Audio', meta: '55 MIN · DEMO', seed: 'sr-p07' },
    { id: 'p08', title: 'Set 08', kind: 'Audio', meta: '26 MIN · DEMO', seed: 'sr-p08' },
  ],
  'Live Video': [
    { id: 'v01', title: 'Session 01', kind: 'Video', meta: 'LIVE RECAP · DEMO', seed: 'sr-v01' },
    { id: 'v02', title: 'Session 02', kind: 'Video', meta: 'LIVE RECAP · DEMO', seed: 'sr-v02' },
    { id: 'v03', title: 'Session 03', kind: 'Photo', meta: 'STILLS · DEMO', seed: 'sr-v03' },
    { id: 'v04', title: 'Session 04', kind: 'Video', meta: 'LIVE RECAP · DEMO', seed: 'sr-v04' },
    { id: 'v05', title: 'Session 05', kind: 'Photo', meta: 'STILLS · DEMO', seed: 'sr-v05' },
    { id: 'v06', title: 'Session 06', kind: 'Video', meta: 'LIVE RECAP · DEMO', seed: 'sr-v06' },
  ],
  Interviews: [
    { id: 'i01', title: 'Guest 01', kind: 'Video', meta: '24 MIN · DEMO', seed: 'sr-i01' },
    { id: 'i02', title: 'Guest 02', kind: 'Audio', meta: '31 MIN · DEMO', seed: 'sr-i02' },
    { id: 'i03', title: 'Guest 03', kind: 'Photo', meta: 'CONTACT SHEET · DEMO', seed: 'sr-i03' },
    { id: 'i04', title: 'Guest 04', kind: 'Video', meta: '18 MIN · DEMO', seed: 'sr-i04' },
    { id: 'i05', title: 'Guest 05', kind: 'Audio', meta: '41 MIN · DEMO', seed: 'sr-i05' },
    { id: 'i06', title: 'Guest 06', kind: 'Photo', meta: 'CONTACT SHEET · DEMO', seed: 'sr-i06' },
    { id: 'i07', title: 'Guest 07', kind: 'Video', meta: '27 MIN · DEMO', seed: 'sr-i07' },
    { id: 'i08', title: 'Guest 08', kind: 'Video', meta: '35 MIN · DEMO', seed: 'sr-i08' },
  ],
  'Music Films': [
    {
      id: 'mf-weyba',
      title: 'Weyba Experience',
      kind: 'Video',
      meta: 'Noosa Beach, Australia · Edited with Python + FFmpeg',
      videoId: 'PdUfZjKg9RQ',
      story: [
        'Not a documentary about something — proof that a stylistic awareness can act before it knows itself. Filmed at Noosa Beach, Australia, it follows Lucca, a scholarship-winning musician, building a record that crosses instruments from different cultural traditions: one improvised studio facing the sea, sounds that rarely share a history or a continent.',
        'The edit is part of the experiment. Real editorial decisions executed by Python and FFmpeg over real footage — not automation replacing the eye, but an analytical mirror of a visual DNA that had no language of its own yet.',
        'The first test act of th3lab, the augmented creative studio, under one thesis: colonialism now ships pre-trained. Models default to the generic, the Eurocentric, the already-seen — unless forced otherwise. Weyba is the forcing. Dissolve, decolonize, authorize.',
      ],
    },
    { id: 'd01', title: 'Film 01', kind: 'Video', meta: '58 MIN · DEMO', seed: 'sr-d01' },
    { id: 'd02', title: 'Film 02', kind: 'Video', meta: '44 MIN · DEMO', seed: 'sr-d02' },
    { id: 'd03', title: 'Film 03', kind: 'Photo', meta: 'STILLS · DEMO', seed: 'sr-d03' },
    { id: 'd04', title: 'Film 04', kind: 'Video', meta: '62 MIN · DEMO', seed: 'sr-d04' },
    { id: 'd05', title: 'Film 05', kind: 'Video', meta: '39 MIN · DEMO', seed: 'sr-d05' },
    { id: 'd06', title: 'Film 06', kind: 'Photo', meta: 'STILLS · DEMO', seed: 'sr-d06' },
  ],
}

function SectionHead({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-bone/20 pb-3">
      <h2 className="font-pixel text-sm font-bold uppercase sm:text-base">{title}</h2>
      <p className="text-[10px] uppercase tracking-[0.24em] text-ash">{caption}</p>
    </div>
  )
}

function App() {
  const [mode, setMode] = useState<'standby' | 'onair' | 'chill'>('standby')
  const [format, setFormat] = useState<string | null>(null)

  // abrir/cerrar un archivo siempre lleva la vista arriba, donde cambia el contenido
  const openFormat = (f: string | null) => {
    setFormat(f)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-void font-mono text-bone">
      {/* dither over everything, never interactive */}
      <div className="halftone pointer-events-none fixed inset-0 z-10" />

      {/* header: serif logo + on-air state */}
      <header className="flex items-center justify-between px-6 py-8 sm:px-10 sm:py-10">
        <a
          href="/"
          className="font-pixel text-sm font-bold uppercase tracking-wide text-vermilion outline-none hover:text-bone focus-visible:ring-2 focus-visible:ring-vermilion sm:text-base"
          onClick={(e) => {
            e.preventDefault()
            setFormat(null)
          }}
        >
          GLOBAL GRID FM
        </a>
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-ash">
          <span
            className={`inline-block size-2 bg-vermilion ${
              mode === 'onair' ? 'blink' : mode === 'chill' ? 'opacity-70' : 'opacity-30'
            }`}
            aria-hidden="true"
          />
          {mode === 'onair' ? 'On Air' : mode === 'chill' ? 'Chill' : 'Standby'}
        </p>
      </header>

      {format ? (
        <Archive format={format} items={DEMO[format]} onBack={() => openFormat(null)} />
      ) : (
        <>
          {/* hero: the face in three states — standby, on air, chill */}
          <main className="flex flex-col items-center justify-center gap-12 px-4 py-24 sm:py-32">
            <h1 className="flex items-end leading-none" aria-label="Global Grid FM">
              <span
                className={`inline-block font-arcade text-vermilion text-[clamp(4.5rem,20vw,11rem)] ${
                  mode === 'onair' ? 'g-spin-cw g-fast-cw' : mode === 'chill' ? 'g-spin-cw' : ''
                }`}
                aria-hidden="true"
              >
                G
              </span>
              {mode === 'onair' ? (
                <span
                  aria-hidden="true"
                  className="mx-[0.06em] inline-block translate-y-[0.12em] bg-vermilion text-[clamp(4.5rem,20vw,11rem)]"
                  style={{ width: '0.28em', height: '0.28em' }}
                />
              ) : mode === 'chill' ? (
                <span
                  aria-hidden="true"
                  className="mx-[0.05em] inline-block h-[0.16em] w-[0.34em] translate-y-[0.04em] rounded-b-full border-b-[0.05em] border-bone text-[clamp(4.5rem,20vw,11rem)]"
                />
              ) : (
                <span className="blink inline-block font-arcade text-bone text-[clamp(4.5rem,20vw,11rem)]" aria-hidden="true">
                  _
                </span>
              )}
              <span
                className={`inline-block font-arcade text-vermilion text-[clamp(4.5rem,20vw,11rem)] ${
                  mode === 'onair' ? 'g-spin-ccw g-fast-ccw' : mode === 'chill' ? 'g-spin-ccw' : ''
                }`}
                aria-hidden="true"
              >
                G
              </span>
            </h1>

            <button
              type="button"
              onClick={() => setMode((m) => (m === 'onair' ? 'chill' : 'onair'))}
              className="mr-[-0.05em] font-pixel text-sm uppercase tracking-wider text-bone outline-none hover:text-vermilion focus-visible:ring-2 focus-visible:ring-vermilion sm:text-base"
              aria-pressed={mode === 'onair'}
            >
              {mode === 'onair' ? '[ stop ]' : '[ play ]'}
            </button>

            <p className="mr-[-0.24em] text-[11px] uppercase tracking-[0.24em] text-ash">
              {mode === 'onair'
                ? `On air — ${TRACK.artist}`
                : mode === 'chill'
                  ? 'Chill mode — press play.'
                  : 'Press play.'}
            </p>

            {/* the sound: mounted on play, killed on stop — the video stays
                hidden; only the track card is visible */}
            {mode === 'onair' && (
              <div className="relative w-full max-w-sm border border-bone/20 px-5 py-6">
                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-ash">
                  <span className="inline-block size-2 bg-vermilion blink" aria-hidden="true" />
                  Now playing
                </p>
                <p className="mt-3 font-pixel text-base uppercase text-bone">{TRACK.title}</p>
                <p className="mt-1.5 text-xs uppercase tracking-[0.24em] text-vermilion">{TRACK.artist}</p>

                {/* audio carrier: rendered but visually hidden so playback continues */}
                <div className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0" aria-hidden="true">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${TRACK.id}?autoplay=1&playsinline=1&rel=0`}
                    title={`${TRACK.artist} — ${TRACK.title}`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="h-px w-px"
                  />
                </div>
              </div>
            )}
          </main>

          {/* listen: the friendly door to the archives */}
          <section aria-label="Listen" className="px-4 pb-16 sm:px-8">
            <SectionHead title="Listen" caption="Four doors" />
            <div className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {FORMATS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => openFormat(f)}
                  className="group flex items-baseline justify-between gap-4 border-b border-bone/10 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-vermilion"
                >
                  <span>
                    <span className="font-pixel text-base uppercase text-bone group-hover:text-vermilion sm:text-lg">
                      {f}
                    </span>
                    <span className="mt-1 block text-xs text-ash">{FORMAT_DESC[f]}</span>
                  </span>
                  <span className="text-ash group-hover:text-bone" aria-hidden="true">
                    →
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* the scrolling band: between the face and the board */}
          <Ticker>
            {FORMATS.map((f) => (
              <span key={f}>{f}</span>
            ))}
            <span>24/7 Stream</span>
            <span>The Sound of Creative Collective</span>
            <span className="text-vermilion">radio.c-c.studio</span>
          </Ticker>

          {/* line up: the future board — first thing you meet when scrolling */}
          <section aria-label="Line up" className="px-4 pb-24 pt-16 sm:px-8">
            <SectionHead title="Line Up" caption="Demo board — real drops pending" />
            <LineUp />
          </section>

          {/* manifesto: who is speaking */}
          <section aria-label="About" className="px-4 pb-24 sm:px-8">
            <SectionHead title="The Station" caption="Who is speaking" />
            <div className="flex flex-col gap-6 py-10 sm:gap-8 sm:py-14">
              <p className="font-pixel text-xl font-bold uppercase leading-snug text-bone sm:text-2xl">
                The sound of<br />
                <span className="text-vermilion">Creative Collective.</span>
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-ash sm:text-base">
                One studio. Many hands. One voice. C_C builds brands, systems and images — G_G is how all of it sounds.
                Multicultural frequencies, recorded in Chiang Mai, broadcast to the grid.
              </p>
              <p className="text-sm uppercase tracking-[0.24em] text-bone">Turn it on.</p>
            </div>
          </section>
        </>
      )}

      {/* footer */}
      <footer>
        <Footer formats={FORMATS} onSelectFormat={openFormat} />
      </footer>
    </div>
  )
}

export default App
