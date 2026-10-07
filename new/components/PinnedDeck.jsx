import React from 'react'
import SectionRail from '@/components/SectionRail'

/**
 * PinnedDeck — full-screen section deck over one still background.
 *
 * Pattern (sticky-stack + scroll snap, per research):
 *  - A fixed backdrop (grid + the `{}` watermark) sits behind everything and
 *    never moves; sections are transparent and slide over it — the background
 *    stays still while sections come and go.
 *  - Each section is `position: sticky; top: 0; height: 100dvh` and pins at
 *    the viewport top; the next section slides over it. Native scrolling.
 *  - Snap points live on dedicated in-flow `.pin-sentinel` elements (zero
 *    height, one before each section) — NOT on the sticky sections themselves.
 *    Sticky snap areas move with the stuck box, which breaks programmatic
 *    scrolling; sentinels keep snap positions stable and make the rail's
 *    jumps land exactly.
 *  - One passive scroll listener + rAF computes, per section, how far the
 *    next one has covered it (--p 0→1). CSS turns --p into a recede effect
 *    (scale + fade + drift) on the outgoing section.
 *  - The right-side rail tracks the active section (viewport-center test) and
 *    jumps on click. Works on mobile too.
 *  - Reduced motion: recede disabled, jumps become instant.
 */
const PinnedDeck = ({ sections }) => {
  const deckRef = React.useRef(null)
  const topsRef = React.useRef([])
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    const deck = deckRef.current
    if (!deck) return
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    root.classList.add('has-pin-deck')

    const sectionEls = Array.from(deck.querySelectorAll('.pin-section'))
    const sentinels = Array.from(deck.querySelectorAll('.pin-sentinel'))

    const measure = () => {
      topsRef.current = sentinels.map((s) => s.getBoundingClientRect().top + window.scrollY)
    }

    let ticking = false
    let lastActive = -1

    const update = () => {
      ticking = false
      const vh = window.innerHeight
      const y = window.scrollY
      const tops = topsRef.current
      if (tops.length === 0) return

      if (!reduced) {
        for (let i = 0; i < sectionEls.length; i++) {
          const p = Math.min(Math.max((y - tops[i]) / vh, 0), 1)
          sectionEls[i].style.setProperty('--p', p.toFixed(4))
        }
      }

      // Section covering the viewport center is the active one
      const center = y + vh / 2
      let idx = 0
      for (let i = 0; i < tops.length; i++) {
        if (tops[i] <= center) idx = i
      }
      if (idx !== lastActive) {
        lastActive = idx
        setActive(idx)
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    // Re-measure once fonts/images have settled
    const settleTimer = setTimeout(onResize, 800)
    window.addEventListener('load', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    onScroll()

    return () => {
      clearTimeout(settleTimer)
      window.removeEventListener('load', onResize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      root.classList.remove('has-pin-deck')
    }
  }, [])

  const jump = (i) => {
    const tops = topsRef.current
    if (!tops || tops.length === 0) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: tops[i], behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <>
      {/* Background glows + grid now live in Layout (visible on all pages) */}

      <div ref={deckRef} className="pin-deck">
        {sections.map((s) => (
          <React.Fragment key={s.id}>
            <div className="pin-sentinel" aria-hidden="true" />
            <section id={s.id} className="pin-section" aria-label={s.label}>
              <div className="pin-inner">{s.content}</div>
            </section>
          </React.Fragment>
        ))}
      </div>

      <SectionRail labels={sections.map((s) => s.label)} active={active} onJump={jump} />
    </>
  )
}

export default PinnedDeck
