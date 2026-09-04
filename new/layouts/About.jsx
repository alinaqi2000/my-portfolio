import React from 'react'
import classNames from 'clsx'
import ContentRenderer from '@/components/ContentRenderer'
import Typewriter from '@/components/Typewriter'
import Reveal from '@/components/Reveal'
import Image from '@/components/Image'
import Icon from '@/components/Icon'
import Terminal from '@/components/Terminal'

const History = ({ title, list }) => (
  <>
    <div className="flex items-center gap-3">
      <span className="font-mono text-sm text-term-green">$</span>
      <h3 className="m-0">{title}</h3>
    </div>
    <div className="mt-6 flex flex-col md:mt-8">
      {list?.map((item, i) => (
        <div key={`item-${i}`} className="relative flex flex-col gap-1 border-l border-line pb-8 pl-8 last:pb-0">
          <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-term-green shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline">
            <h6 className="m-0 pr-1 font-medium text-white">{item.name}</h6>
            <small className="ml-auto shrink-0 font-mono text-xs text-ink-faint md:ml-4">
              {item.date}
            </small>
          </div>
          <div className="text-ink-mute">{item.description}</div>
        </div>
      ))}
    </div>
  </>
)

const Skill = ({ title, icon, level }) => (
  <div className="flex items-center">
    {icon && (
      <Icon width={24} height={24} {...icon} className="mr-3 h-6 w-6 fill-current text-ink-faint" />
    )}
    <small className="font-mono text-sm text-ink-mute">{title}</small>
    <div className="ml-auto flex gap-1">
      {Array(5)
        .fill(null)
        .map((_, k) => (
          <span
            key={`${title}${k}-f`}
            className={classNames(
              'inline-block h-3 w-3 rounded-[2px] transition-colors',
              k + 1 <= level ? 'bg-gradient-to-tr from-accent-dim to-accent' : 'bg-line'
            )}
          />
        ))}
    </div>
  </div>
)

const SkillSet = ({ title, list }) => (
  <div className="p-6 md:px-10 md:py-8">
    <p className="col-span-3 mb-6 mt-0 flex items-center gap-3 self-center font-mono text-sm uppercase tracking-widest text-white">
      <span className="text-accent">##</span>
      {title}
    </p>
    <div className="grid grid-cols-fluid gap-y-4 gap-x-8 [--tw-fluid-col-min:12rem]">
      {list?.map((props, j) => (
        <Reveal key={j} animation="fade-in" delay={j * 100}>
          <Skill {...props} />
        </Reveal>
      ))}
    </div>
  </div>
)

const Layout = ({ personal_info = {}, cta = {}, skills_header, skills, history }) => {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid gap-12 px-6 py-16 md:py-20 lg:grid-cols-[2fr_3fr] lg:gap-16">
        {/* Profile panel */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Terminal title="alinaqi@dev: ~/profile" sidebar={
            <>
              <div className="rounded bg-night-inset px-3 py-2 font-mono text-xs text-term-green">✔ available</div>
              <div className="rounded bg-night-inset px-3 py-2 font-mono text-xs text-ink-faint">full-time</div>
              <div className="rounded bg-night-inset px-3 py-2 font-mono text-xs text-ink-faint">contract</div>
            </>
          }>
            {personal_info.images?.[0] && (
              <div className="relative aspect-square w-full overflow-hidden rounded">
                <Image
                  src={personal_info.images[0].src}
                  alt={personal_info.images[0].alt}
                  animation="fade-in"
                  priority
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="mt-4 border-t border-line pt-4">
              <h3 className="m-0 font-mono text-lg text-white">{personal_info.name}</h3>
              <div className="mt-1 font-mono text-xs text-term-green">Software Engineer</div>
            </div>
          </Terminal>
          <div className="prose prose-invert mt-8">
            <ContentRenderer source={cta} />
          </div>
        </div>

        {/* Bio + skills */}
        <div>
          {skills_header && (
            <div className="mb-10">
              <h3 className="mb-3">{skills_header.title}</h3>
              {skills_header.list && (
                <h3 className="m-0 inline">
                  <Typewriter lines={skills_header.list} lineClassName="text-accent" />
                </h3>
              )}
            </div>
          )}

          <Reveal animation="fade-in" className="prose prose-invert">
            <ContentRenderer source={personal_info} />
          </Reveal>

          {skills && (
            <div className="mt-12 grid grid-cols-1 items-start divide-y divide-line overflow-hidden rounded-lg border border-line bg-night-surface">
              {skills.map((props, i) => (
                <SkillSet key={i} {...props} />
              ))}
            </div>
          )}
        </div>
      </div>

      {history && (
        <div className="border-t border-line">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 md:py-20">
            {history.map((props, i) => (
              <div key={i}>
                <History {...props} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Layout
