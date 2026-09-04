import React from 'react'
import classNames from 'clsx'

/**
 * BracesMark — the signature `{}` watermark, flat (as the original hero had),
 * with an accent gradient fill and a proper 1px text-stroke border.
 * Absolutely positioned inside a section, cropped by its overflow.
 * Parallax: drifts up as its section gets covered (driven by --p, set by
 * PinnedDeck's scroll loop). Static elsewhere.
 */
const BracesMark = ({ className }) => (
  <div className={classNames('braces-mark', className)} aria-hidden="true">
    <span>{'{ }'}</span>
  </div>
)

export default BracesMark
