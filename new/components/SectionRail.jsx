import React from 'react'
import Link from 'next/link'
import classNames from 'clsx'

/**
 * SectionRail — fixed right-side timeline navigation for the PinnedDeck.
 * Each item is a long dash; the section name appears on hover, and the
 * active section's name is always displayed. Present on mobile too
 * (compact dashes, active label visible — tap to jump).
 */
const SectionRail = ({ labels = [], active, onJump, links, className }) => (
  <nav className={classNames('section-rail', className)} aria-label={links ? 'Pages' : 'Sections'}>
    {(links || labels).map((item, i) => {
      const label = links ? item.name : item
      const content = (
        <>
          <span className="rail-label">{label}</span>
          <span className="rail-dash" aria-hidden="true" />
        </>
      )

      if (links) {
        return (
          <Link key={item.slug} href={item.slug} className="rail-item" aria-label={`Go to ${label}`}>
            {content}
          </Link>
        )
      }

      return (
        <button
          key={label}
          type="button"
          className={classNames('rail-item', i === active && 'is-active')}
          onClick={() => onJump(i)}
          aria-label={`Go to ${label} section`}
          aria-current={i === active || undefined}
        >
          {content}
        </button>
      )
    })}
  </nav>
)

export default SectionRail
