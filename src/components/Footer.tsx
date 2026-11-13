const SOCIALS = [
  { name: 'Instagram', slug: 'instagram', href: 'https://www.instagram.com/' },
  { name: 'TikTok', slug: 'tiktok', href: 'https://www.tiktok.com/' },
  { name: 'YouTube', slug: 'youtube', href: 'https://www.youtube.com/' },
  { name: 'SoundCloud', slug: 'soundcloud', href: 'https://soundcloud.com/' },
  { name: 'Bandcamp', slug: 'bandcamp', href: 'https://bandcamp.com/' },
] as const

type FooterProps = {
  formats: readonly string[]
  onSelectFormat: (f: string) => void
}

function ColHead({ children }: { children: string }) {
  return (
    <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-ash">
      <span className="inline-block size-1.5 bg-vermilion" aria-hidden="true" />
      {children}
    </p>
  )
}

/**
 * Footer, one coherent pass on the 21st "footer-with-suite" structure
 * (scrollxui, id 29773): three link columns + CTA above, an oversized
 * brand mark spanning the width, hairline bottom bar.
 * The giant face is always ON AIR — the hero sleeps, the footer broadcasts.
 */
export function Footer({ formats, onSelectFormat }: FooterProps) {
  return (
    <div className="border-t border-bone/20 px-4 pb-4 pt-12 sm:px-8 sm:pt-16">
      {/* columns */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* listen */}
        <nav aria-label="Listen">
          <ColHead>Listen</ColHead>
          <ul className="flex flex-col gap-2.5">
            {formats.map((f) => (
              <li key={f}>
                <button
                  type="button"
                  onClick={() => onSelectFormat(f)}
                  className="text-sm uppercase tracking-wide text-bone outline-none hover:text-vermilion focus-visible:ring-2 focus-visible:ring-vermilion"
                >
                  {f}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* connect */}
        <nav aria-label="Social">
          <ColHead>Connect</ColHead>
          <ul className="flex flex-col gap-2.5">
            {SOCIALS.map((s) => (
              <li key={s.slug}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-bone outline-none hover:text-vermilion focus-visible:ring-2 focus-visible:ring-vermilion"
                >
                  <span
                    className="block size-4 shrink-0 bg-current"
                    style={{
                      maskImage: `url(/brand/${s.slug}.svg)`,
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      maskSize: 'contain',
                      WebkitMaskImage: `url(/brand/${s.slug}.svg)`,
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      WebkitMaskSize: 'contain',
                    }}
                  />
                  <span className="text-sm uppercase tracking-wide">{s.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* house */}
        <nav aria-label="House">
          <ColHead>House</ColHead>
          <div className="flex flex-col gap-2.5">
            <a
              href="https://c-c.studio"
              className="text-sm uppercase tracking-wide text-bone outline-none hover:text-vermilion focus-visible:ring-2 focus-visible:ring-vermilion"
            >
              C_C® — c-c.studio
            </a>
            <a
              href="https://c-c.studio/work"
              className="text-sm uppercase tracking-wide text-bone outline-none hover:text-vermilion focus-visible:ring-2 focus-visible:ring-vermilion"
            >
              Work
            </a>
            <p className="mt-2 text-xs leading-relaxed text-ash">The studio builds the systems. The grid carries the sound.</p>
          </div>
        </nav>

        {/* cta */}
        <div className="flex flex-col items-start gap-4 sm:items-end sm:text-right">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-pixel text-sm uppercase tracking-wider text-bone outline-none hover:text-vermilion focus-visible:ring-2 focus-visible:ring-vermilion"
          >
            ↑ Press play
          </button>
          <p className="text-xs uppercase tracking-[0.24em] text-vermilion">radio.c-c.studio</p>
        </div>
      </div>

      {/* oversized brand mark — always on air */}
      <div className="mt-14 flex flex-col items-center sm:mt-20" aria-hidden="true">
        <span className="flex items-end gap-[0.15em] leading-none font-pixel text-[clamp(4rem,18vw,12rem)]">
          <span className="text-transparent" style={{ WebkitTextStroke: '2px color-mix(in srgb, var(--color-bone) 30%, transparent)' }}>
            G
          </span>
          <span className="text-transparent" style={{ WebkitTextStroke: '2px color-mix(in srgb, var(--color-bone) 30%, transparent)' }}>
            G
          </span>
        </span>
        <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-ash">Always on air</p>
      </div>

      {/* bottom bar */}
      <div className="mt-10 flex flex-col gap-2 border-t border-bone/20 pt-4 text-[10px] uppercase tracking-[0.24em] text-ash sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 Global Grid FM — the voice of{' '}
          <a
            href="https://c-c.studio"
            className="text-bone underline decoration-bone/40 underline-offset-2 outline-none hover:text-vermilion hover:decoration-vermilion focus-visible:ring-2 focus-visible:ring-vermilion"
          >
            C_C®
          </a>
        </p>
        <p>The sound of Creative Collective</p>
      </div>
    </div>
  )
}
