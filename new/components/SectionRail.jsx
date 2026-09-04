import React from 'react'
import classNames from 'clsx'

/**
 * SectionRail — fixed right-side timeline navigation for the PinnedDeck.
 * Each item is a long dash; the section name appears on hover, and the
 * active section's name is always displayed. Present on mobile too
 * (compact dashes, active label visible — tap to jump).
 */
const SectionRail = ({ labels, active, onJump }) => (
  <nav className="section-rail" aria-label="Sections">
    {labels.map((label, i) => (
      <button
        key={label}
        type="button"
        className={classNames('rail-item', i === active && 'is-active')}
        onClick={() => onJump(i)}
        aria-label={`Go to ${label} section`}
        aria-current={i === active || undefined}
      >
        <span className="rail-label">{label}</span>
        <span className="rail-dash" aria-hidden="true" />
      </button>
    ))}
  </nav>
)

export default SectionRail
