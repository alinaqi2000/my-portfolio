import React from 'react'
import Reveal from '@/components/Reveal'
import Icon from '@/components/Icon'

const Companies = ({ title, list }) => (
  <div className="flex flex-wrap items-center justify-between gap-6">
    {title && (
      <h4 className="m-0 w-full font-mono text-xs uppercase tracking-widest text-ink-faint lg:w-auto">
        {title}
      </h4>
    )}
    {list &&
      list.map(({ icon, name }, i) => (
        <Reveal key={i} animation="fade-in zoom-in" delay={i * 250}>
          {icon ? (
            <Icon {...icon} className="h-10 w-32 fill-current text-ink-faint transition-colors hover:text-ink-mute" />
          ) : (
            <span className="font-mono text-sm text-ink-faint">{name}</span>
          )}
        </Reveal>
      ))}
  </div>
)

export default Companies
