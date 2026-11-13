import type { ReactNode } from 'react'

type TickerProps = {
  children: ReactNode
  /** seconds for one full loop */
  speed?: number
}

/**
 * Infinite horizontal ticker — pattern adapted from 21st.dev `lukacho/marquee`
 * (id 1198), stripped to our tokens and without dependencies.
 */
export function Ticker({ children, speed = 32 }: TickerProps) {
  return (
    <div className="w-full overflow-hidden border-t border-bone/20" aria-hidden="true">
      <div className="ticker-track flex w-max" style={{ animationDuration: `${speed}s` }}>
        <div className="flex shrink-0 items-center gap-12 pr-12 py-2 font-mono text-sm uppercase tracking-[0.24em] text-ash">
          {children}
        </div>
        <div className="flex shrink-0 items-center gap-12 pr-12 py-2 font-mono text-sm uppercase tracking-[0.24em] text-ash">
          {children}
        </div>
      </div>
    </div>
  )
}
