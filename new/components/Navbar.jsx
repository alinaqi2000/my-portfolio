import React from 'react'
import Link from 'next/link'
import classNames from 'clsx'
import ActiveLink from '@/components/ActiveLink'
import Button from '@/components/Button'
import { menu, social } from '../theme.config'
import { IoMenu, IoClose } from 'react-icons/io5'

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <header
      className={classNames(
        'border-line fixed left-1/2 top-0 z-50 w-full max-w-7xl -translate-x-1/2 border-b border-l border-r transition-colors duration-300',
        scrolled || isOpen ? 'bg-night' : 'bg-transparent'
      )}
    >
      <div className="flex h-16 items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-sm font-bold text-white no-underline"
          aria-label="Home"
          onClick={closeMenu}
        >
          <span className="glass-border glass-subtle flex h-7 w-7 items-center justify-center rounded border text-accent transition-colors group-hover:border-accent/60">
            /_
          </span>
          <span>
            alinaqi<span className="text-accent">.dev</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {menu?.map((item) => (
            <ActiveLink
              key={item.slug}
              href={item.slug}
              activeClassName="text-white"
              inActiveClassName="text-ink-mute hover:text-white"
              className="font-mono text-xs uppercase tracking-widest no-underline transition-colors"
            >
              {item.name}
            </ActiveLink>
          ))}
          <Button
            as={Link}
            href="/contact"
            size="xs"
            showArrow={false}
            className="px-4"
            variant="accent"
          >
            Hire Me
          </Button>
        </nav>

        <button
          className="mobile-menu-toggle text-ink-mute flex h-11 w-11 items-center justify-center hover:text-white md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <IoClose className="h-6 w-6" /> : <IoMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={classNames(
          'mobile-menu border-line bg-night overflow-hidden border-t transition-[max-height] duration-300 md:hidden',
          isOpen ? 'max-h-96' : 'max-h-0 border-t-0'
        )}
      >
        <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
          {menu?.map((item) => (
            <ActiveLink
              key={item.slug}
              href={item.slug}
              activeClassName="text-accent"
              inActiveClassName="text-ink-mute"
              className="border-line/50 border-b py-3 font-mono text-sm uppercase tracking-widest no-underline"
              onClick={closeMenu}
            >
              {item.name}
            </ActiveLink>
          ))}
          <Button
            as={Link}
            href="/contact"
            size="md"
            showArrow={false}
            className="mt-4 w-full"
            onClick={closeMenu}
          >
            Hire Me
          </Button>
          <div className="mt-6 flex items-center justify-center gap-6 pb-2">
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
        </nav>
      </div>
    </header>
  )
}

export default Navbar
