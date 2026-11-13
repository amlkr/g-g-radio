import { useState } from 'react'

export type ArchiveItem = {
  id: string
  title: string
  kind: 'Video' | 'Audio' | 'Photo'
  meta: string
  /** picsum seed for demo placeholders */
  seed?: string
  /** real content: YouTube id — opens the minimalist film player */
  videoId?: string
  /** short editorial story shown under the player — real text only */
  story?: string[]
}

type ArchiveProps = {
  format: string
  items: ArchiveItem[]
  onBack: () => void
}

function Thumb({ item, large = false }: { item: ArchiveItem; large?: boolean }) {
  const src = item.videoId
    ? `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`
    : `https://picsum.photos/seed/${item.seed ?? item.id}/600/600`
  return (
    <div className={`relative ${large ? 'aspect-video' : 'aspect-square'} w-full overflow-hidden bg-disc`}>
      <img
        src={src}
        alt={item.videoId ? `Poster for ${item.title}` : `Demo image for ${item.title}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 brightness-90"
      />
      <div className="halftone-strong absolute inset-0" />
      <span className="absolute right-2 top-2 bg-void px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone">
        [{item.kind}]
      </span>
    </div>
  )
}

/**
 * Archive view. Real items (videoId) are always visible and open the
 * minimalist player; demo slots stay hidden behind [ demo ].
 */
export function Archive({ format, items, onBack }: ArchiveProps) {
  const [demo, setDemo] = useState(false)
  const [playing, setPlaying] = useState<ArchiveItem | null>(null)

  const real = items.filter((i) => i.videoId)
  const demoItems = items.filter((i) => !i.videoId)

  // the minimalist player: title, one 16:9, one way back
  if (playing) {
    return (
      <section className="flex flex-1 flex-col px-4 pb-8 pt-2 sm:px-8" aria-label={playing.title}>
        <div className="flex items-baseline justify-between border-b border-bone/20 pb-3">
          <h2 className="font-pixel text-sm font-bold uppercase sm:text-base">{playing.title}</h2>
          <button
            type="button"
            onClick={() => setPlaying(null)}
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-ash outline-none hover:text-bone focus-visible:ring-2 focus-visible:ring-vermilion"
          >
            [ back ]
          </button>
        </div>
        <div className="mx-auto mt-6 w-full max-w-3xl">
          <div className="aspect-video w-full overflow-hidden border border-bone/20">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${playing.videoId}?autoplay=1&rel=0`}
              title={playing.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full"
            />
          </div>
          <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-ash">{playing.meta}</p>
          {playing.story && (
            <div className="mt-6 flex flex-col gap-4 border-t border-bone/10 pt-6">
              {playing.story.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-bone/80">
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-1 flex-col px-4 pb-8 pt-2 sm:px-8" aria-label={`${format} archive`}>
      <div className="flex items-baseline justify-between border-b border-bone/20 pb-3">
        <h2 className="font-pixel text-sm font-bold uppercase sm:text-base">{format}</h2>
        <div className="flex items-center gap-5">
          {demoItems.length > 0 && (
            <button
              type="button"
              onClick={() => setDemo((d) => !d)}
              aria-pressed={demo}
              className={`font-mono text-[11px] uppercase tracking-[0.24em] outline-none focus-visible:ring-2 focus-visible:ring-vermilion ${
                demo ? 'text-vermilion' : 'text-ash hover:text-bone'
              }`}
            >
              [ demo {demo ? 'on' : 'off'} ]
            </button>
          )}
          <button
            type="button"
            onClick={onBack}
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-ash outline-none hover:text-bone focus-visible:ring-2 focus-visible:ring-vermilion"
          >
            [ back ]
          </button>
        </div>
      </div>

      {real.length === 0 && !demo && (
        <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-ash">Empty — first drops pending.</p>
      )}

      {real.length > 0 && (
        <ul className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {real.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setPlaying(item)}
                className="group block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-vermilion"
              >
                <Thumb item={item} large />
                <h3 className="mt-2 font-mono text-sm uppercase tracking-wide text-bone group-hover:text-vermilion">
                  {item.title}
                </h3>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ash">{item.meta}</p>
              </button>
            </li>
          ))}
        </ul>
      )}

      {demo && (
        <>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-vermilion">
            Demo content — placeholder photos, real drops pending
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {demoItems.map((item) => (
              <li key={item.id}>
                <div className="group block w-full">
                  <Thumb item={item} />
                  <h3 className="mt-2 font-mono text-xs uppercase tracking-wide text-bone">{item.title}</h3>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ash">{item.meta}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
