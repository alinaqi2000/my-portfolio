import React from 'react'
import Link from 'next/link'
import classNames from 'clsx'
import ContentRenderer from '@/components/ContentRenderer'
import Image from '@/components/Image'
import Reveal from '@/components/Reveal'
import Icon from '@/components/Icon'
import ProjectCardHorizontal from '@/components/ProjectCardHorizontal'
import Terminal, { TermLine, TermOk } from '@/components/Terminal'
import PinnedDeck from '@/components/PinnedDeck'

const Kicker = ({ label }) => (
  <div className="text-ink-faint mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[.2em]">
    <span className="bg-line h-px w-12" />
    {label && <span>{label}</span>}
  </div>
)

const SectionHeader = ({ title, lead, href, linkLabel }) => (
  <Reveal
    animation="fade-in slide-in-right"
    className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between md:gap-4"
  >
    <div className="max-w-2xl">
      <Kicker />
      <h2 className="m-0 text-xl md:text-3xl">{title}</h2>
      {lead && <p className="mt-2 text-sm md:text-base">{lead}</p>}
    </div>
    {href && (
      <Link
        href={href}
        className="text-ink-mute group inline-flex shrink-0 items-center gap-2 pb-1 font-mono text-[11px] uppercase tracking-widest no-underline transition-colors hover:text-white md:text-xs"
      >
        {linkLabel}
        <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
          -&gt;
        </span>
      </Link>
    )}
  </Reveal>
)

const ProfileCard = ({ main }) => (
  <Reveal animation="fade-in slide-in-left" className="relative">
    <Terminal title="alinaqi@dev: ~/whoami">
      <div className="grid grid-cols-[80px_1fr] items-center gap-4 sm:grid-cols-[110px_1fr] sm:gap-5">
        {main.images?.[0] && (
          <div className="bg-night h-20 w-20 overflow-hidden rounded-full border border-accent/60 sm:h-24 sm:w-24">
            <Image
              src={main.images[0].src}
              width={main.images[0].width}
              height={main.images[0].height}
              alt="Ali Naqi Al-Musawi"
              animation="fade-in"
              priority
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="font-mono text-xs leading-7">
          <TermLine>
            <span className="text-term-green">const</span> developer = {'{'}
          </TermLine>
          <TermLine>
            <span className="text-term-blue pl-4">name:</span>{' '}
            <span className="text-term-green">&apos;Ali Naqi&apos;</span>,
          </TermLine>
          <TermLine>
            <span className="text-term-blue pl-4">role:</span>{' '}
            <span className="text-term-green">&apos;Software Engineer&apos;</span>,
          </TermLine>
          <TermLine>
            <span className="text-term-blue pl-4">available:</span>{' '}
            <span className="text-term-orange">true</span>
          </TermLine>
          <TermLine>{'}'}</TermLine>
        </div>
      </div>
      <div className="border-line mt-4 flex items-center gap-2 border-t pt-3 font-mono text-xs">
        <TermOk>open to opportunities</TermOk>
      </div>
    </Terminal>
  </Reveal>
)

const STACK = [
  'Laravel',
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'Flutter',
  'PostgreSQL',
  'Tailwind CSS',
  'Docker',
  'GraphQL',
]

const StackMarquee = () => (
  <div
    className="border-line absolute inset-x-0 bottom-0 hidden overflow-hidden border-t py-4 sm:block"
    aria-hidden="true"
  >
    <div className="marquee-track">
      {[...STACK, ...STACK].map((tech, i) => (
        <span
          key={i}
          className="text-ink-faint mx-8 inline-flex items-center gap-3 whitespace-nowrap font-mono text-sm"
        >
          <span className="text-accent">◆</span>
          {tech}
        </span>
      ))}
    </div>
  </div>
)

/* Tech stack — mirrors the about page's skill rows (icon + name + level dots) */
const SkillRow = ({ title, icon, level = 0 }) => (
  <div className="group/row hover:bg-night-inset flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors duration-200">
    {icon && (
      <Icon
        {...icon}
        width={20}
        className="text-ink-faint h-5 w-5 shrink-0 fill-current transition-colors duration-200 group-hover/row:text-accent"
      />
    )}
    <small className="text-ink-mute font-mono text-xs transition-colors duration-200 group-hover/row:text-white md:text-sm">
      {title}
    </small>
    <div className="ml-auto flex shrink-0 gap-1" aria-label={`Proficiency ${level} of 5`}>
      {Array.from({ length: 5 }, (_, k) => (
        <span
          key={k}
          className={classNames(
            'h-2 w-2 rounded-[2px] transition-colors duration-200 md:h-2.5 md:w-2.5',
            k < level ? 'from-accent-dim bg-gradient-to-tr to-accent' : 'bg-line'
          )}
        />
      ))}
    </div>
  </div>
)

const StackGroupHeader = ({ group }) => (
  <div className="border-line mb-2 flex items-center justify-between gap-2 border-b pb-3">
    <div className="flex items-center gap-2">
      <span className="text-term-green font-mono text-xs">$</span>
      <h3 className="m-0 font-mono text-xs uppercase tracking-widest text-white">{group.title}</h3>
    </div>
    <span className="text-ink-faint font-mono text-[10px]">
      {String(group.skills?.length || 0).padStart(2, '0')} items
    </span>
  </div>
)

const StackSection = ({ stack }) => {
  const groups = stack?.groups || []
  const [active, setActive] = React.useState(0)
  const current = groups[active] || groups[0]

  return (
    <div className="mx-auto my-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <SectionHeader
        title="Tech stack"
        lead="The tools I reach for every day — and how well I know them."
        href="/about"
        linkLabel="About me"
      />

      {/* Mobile: tab per group, one panel at a time */}
      <div className="lg:hidden">
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {groups.map((g, i) => (
            <button
              key={g.title}
              type="button"
              onClick={() => setActive(i)}
              className={classNames(
                'shrink-0 rounded-md border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-200',
                i === active
                  ? 'border-accent/60 bg-accent/10 text-accent'
                  : 'border-line bg-night-surface text-ink-mute hover:text-white'
              )}
            >
              {g.title}
            </button>
          ))}
        </div>
        {current && (
          <div className="border-line bg-night-surface rounded-lg border p-3">
            <StackGroupHeader group={current} />
            <div className="flex flex-col">
              {current.skills?.map((skill) => (
                <SkillRow key={skill.title} {...skill} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop: all groups side by side */}
      <div className="hidden gap-4 lg:grid lg:grid-cols-2">
        {groups.map((group) => (
          <Reveal
            key={group.title}
            animation="fade-in slide-in-top"
            delay={groups.indexOf(group) * 90}
          >
            <div className="border-line bg-night-surface h-full rounded-lg border p-4 transition-colors duration-300 hover:border-accent/50 md:p-5">
              <StackGroupHeader group={group} />
              <div className="flex flex-col">
                {group.skills?.map((skill) => (
                  <SkillRow key={skill.title} {...skill} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

const Layout = ({
  main = {},
  cta = {},
  achievements = [],
  projects,
  stack = {},
  services = [],
  contact = {},
}) => {
  const projectRecords = projects?.collection?.records || []

  const sections = [
    {
      id: 'intro',
      label: 'Intro',
      content: (
        <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col px-6">
          <div className="relative my-auto flex w-full flex-col pb-16 pt-16 sm:pb-24 sm:pt-20">
            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
              <Reveal animation="fade-in slide-in-right">
                <Kicker label="Software Engineer" />
                <div className="hero-content prose prose-invert max-w-3xl">
                  <ContentRenderer source={main} />
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <ContentRenderer source={cta} />
                </div>
              </Reveal>
              <ProfileCard main={main} />
            </div>

            <Reveal
              animation="fade-in"
              delay={150}
              className="divide-line border-line mt-8 grid grid-cols-3 divide-x border-y md:mx-[-25px] md:mt-12"
            >
              {achievements?.map((item, i) => (
                <div key={i} className="px-2 py-4 text-center md:px-8 md:py-5">
                  <div
                    className={classNames(
                      'font-mono text-2xl font-bold md:text-3xl',
                      i === 0 ? 'text-accent' : 'text-white'
                    )}
                  >
                    {item.number}
                  </div>
                  <div className="text-ink-mute mt-1 text-xs">{item.text}</div>
                </div>
              ))}
            </Reveal>
          </div>
          <StackMarquee />
        </div>
      ),
    },
    {
      id: 'projects',
      label: 'Projects',
      content: (
        <div className="mx-auto my-auto w-full max-w-6xl px-6 py-16 md:py-24">
          <SectionHeader
            title="Top projects"
            lead="Ideas transformed into remarkable digital products."
            href="/projects"
            linkLabel="All projects"
          />
          {/* Mobile: horizontal snap carousel of every project */}
          <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {projectRecords.map((item, i) => (
              <Reveal
                key={item.slug.join('/')}
                animation="fade-in slide-in-top"
                delay={Math.min(i, 1) * 100}
                className={classNames(
                  'w-[86vw] shrink-0 snap-start sm:w-[64vw] md:w-auto',
                  i > 1 && 'md:hidden'
                )}
              >
                <ProjectCardHorizontal index={i} {...item} />
              </Reveal>
            ))}
          </div>
          <div className="mt-3 flex justify-end md:hidden">
            <Link
              href="/projects"
              className="text-ink-mute inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest no-underline transition-colors hover:text-white"
            >
              Swipe for more
              <span className="text-accent">-&gt;</span>
            </Link>
          </div>
        </div>
      ),
    },
    {
      id: 'stack',
      label: 'Stack',
      content: <StackSection stack={stack} />,
    },
    {
      id: 'services',
      label: 'Services',
      content: (
        <div className="mx-auto my-auto w-full max-w-6xl px-6 py-16 md:py-24">
          <SectionHeader
            title="What I do"
            lead="From concept to deployment — everything you need to ship a product."
            href="/services"
            linkLabel="All services"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {services?.map((item, i) => (
              <Reveal key={i} animation="fade-in slide-in-top" delay={i * 80}>
                <div className="border-line bg-night-surface h-full rounded-lg border p-4 transition-colors duration-300 hover:border-accent/50 md:p-5">
                  <div className="flex items-center gap-2.5">
                    {item.icon && (
                      <Icon
                        {...item.icon}
                        className="h-5 w-5 shrink-0 fill-accent md:h-6 md:w-6"
                        width={24}
                      />
                    )}
                    <h3 className="m-0 text-sm text-white md:text-lg">{item.title}</h3>
                  </div>
                  <div className="prose prose-invert mt-2 max-w-none md:mt-3 [&_small]:line-clamp-2 [&_small]:block [&_small]:text-xs [&_small]:leading-5 sm:[&_small]:line-clamp-3 md:[&_small]:line-clamp-none md:[&_small]:text-sm md:[&_small]:leading-6">
                    <ContentRenderer source={item} />
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal animation="fade-in slide-in-top" delay={(services?.length || 0) * 80}>
              <Link
                href="/contact"
                className="group flex h-full flex-col justify-between rounded-lg border border-accent/40 bg-gradient-to-br from-accent/10 to-transparent p-4 no-underline transition-colors duration-300 hover:border-accent md:p-5"
              >
                <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  $ start --project
                </span>
                <span className="mt-6 flex items-center justify-between md:mt-8">
                  <span className="text-base font-semibold text-white md:text-lg">Get a quote</span>
                  <span className="font-mono text-accent transition-transform duration-200 group-hover:translate-x-1">
                    -&gt;
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      content: (
        <div className="mx-auto my-auto flex w-full max-w-6xl flex-col items-center px-6 py-16 text-center md:py-24">
          <Reveal animation="fade-in zoom-in" className="flex flex-col items-center">
            <div className="text-ink-faint mb-5 font-mono text-xs uppercase tracking-[.2em] md:mb-6">
              contact
            </div>
            <div className="prose prose-invert flex max-w-2xl flex-col items-center [&_p]:m-0">
              <ContentRenderer source={contact} />
            </div>
          </Reveal>
        </div>
      ),
    },
  ]

  return <PinnedDeck sections={sections} />
}

export default Layout
