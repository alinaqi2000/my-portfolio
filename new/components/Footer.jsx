import React from 'react'
import Link from 'next/link'
import { menu, social } from '../theme.config'

const Footer = () => (
  <footer className="border-line bg-night snap-start border-t">
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm font-bold text-white no-underline"
          >
            <span className="glass-border glass-subtle flex h-7 w-7 items-center justify-center rounded border text-accent">
              /_
            </span>
            alinaqi<span className="text-accent">.dev</span>
          </Link>
          <p className="text-ink-faint mt-3 font-mono text-xs">
            Software Engineer — building robust platforms &amp; seamless digital experiences.
          </p>
        </div>

        <nav className="flex flex-wrap gap-6" aria-label="Footer">
          {menu?.map((item) => (
            <Link
              key={item.slug}
              href={item.slug}
              className="text-ink-mute font-mono text-xs uppercase tracking-widest no-underline transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          {social?.map(({ name, url, Icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              title={name}
              className="text-ink-faint transition-colors hover:text-accent"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-line text-ink-faint mt-10 flex flex-col items-start justify-between gap-2 border-t px-6 pt-6 font-mono text-xs md:mx-[-25px] md:flex-row md:items-center">
        <span>© {new Date().getFullYear()} Ali Naqi. All rights reserved.</span>
        <span className="flex items-center gap-2">
          <span className="animate-pulse-dot bg-term-green inline-block h-2 w-2 rounded-full" />
          Available for full-time &amp; contract work
        </span>
      </div>
    </div>
  </footer>
)

export default Footer
