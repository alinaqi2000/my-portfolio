import React from 'react'
import ContentRenderer from '@/components/ContentRenderer'
import Reveal from '@/components/Reveal'
import Icon from '@/components/Icon'
import Terminal from '@/components/Terminal'

const ServiceRow = ({ item, index }) => {
  const number = String(index + 1).padStart(2, '0')

  return (
    <div className="grid grid-cols-1 gap-8 border-t border-line py-14 md:grid-cols-12 md:py-16">
      <div className="font-mono text-xl text-ink-faint md:col-span-1">{number}</div>
      <div className="md:col-span-5">
        <div className="flex items-center gap-4">
          {item.icon && <Icon {...item.icon} className="h-8 w-8 fill-accent" width={32} />}
          <h3 className="m-0 text-white">{item.title}</h3>
        </div>
      </div>
      <div className="md:col-span-6">
        <Reveal animation="fade-in slide-in-left">
          <Terminal title={`$ herdr service start "${item.title}"`}>
            <div className="terminal-doc">
              <ContentRenderer source={item} />
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-line pt-3 font-mono text-xs text-ink-faint">
              <span className="inline-block h-2 w-2 animate-pulse-dot rounded-full bg-term-green" />
              status: operational
            </div>
          </Terminal>
        </Reveal>
      </div>
    </div>
  )
}

const Layout = ({ main = {}, services = [] }) => (
  <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
    <Reveal animation="fade-in slide-in-right" className="prose prose-invert max-w-3xl">
      <ContentRenderer source={main} />
    </Reveal>

    <div className="mt-16 md:mt-24">
      {services?.map((item, i) => (
        <ServiceRow key={i} item={item} index={i} />
      ))}
    </div>
  </div>
)

export default Layout
