import React from 'react'
import Link from 'next/link'
import { menu, social } from '../theme.config'

const Footer = () => (
  <footer className="snap-start border-t border-line bg-night">
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm font-bold text-white no-underline"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded border border-line bg-night-surface text-accent">
              /_
            </span>
            alinaqi<span className="text-accent">.dev</span>
          </Link>
          <p className="mt-3 font-mono text-xs text-ink-faint">
            Software Engineer — building robust platforms &amp; seamless digital experiences.
          </p>
        </div>

        <nav className="flex flex-wrap gap-6" aria-label="Footer">
          {menu?.map((item) => (
            <Link
              key={item.slug}
              href={item.slug}
              className="font-mono text-xs uppercase tracking-widest text-ink-mute no-underline transition-colors hover:text-white"
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

      <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 font-mono text-xs text-ink-faint md:flex-row md:items-center">
        <span>
          © {new Date().getFullYear()} Ali Naqi. All rights reserved.
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-pulse-dot rounded-full bg-term-green" />
          Available for full-time &amp; contract work
        </span>
      </div>
    </div>
  </footer>
)

export default Footer
