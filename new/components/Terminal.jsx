import React from 'react'
import classNames from 'clsx'

/**
 * Herdr-style mock terminal window.
 * The centerpiece visual of the design system: dark panel, traffic-light
 * dots, mono output with colored status lines.
 */
const Terminal = ({ title = 'alinaqi@dev: ~', sidebar, children, className, bodyClassName }) => (
  <div
    className={classNames(
      'terminal-window glass-border glass rounded-lg border',
      className
    )}
  >
    <div className="terminal-titlebar">
      <span className="terminal-dot bg-term-red" />
      <span className="terminal-dot bg-term-yellow" />
      <span className="terminal-dot bg-term-green" />
      <span className="text-ink-faint ml-3 truncate font-mono text-xs">{title}</span>
    </div>
    <div className={classNames('flex', bodyClassName)}>
      {sidebar && (
        <div className="glass-border glass-subtle hidden w-44 shrink-0 flex-col gap-1 border-r p-3 md:flex">
          {sidebar}
        </div>
      )}
      <div className="min-w-0 flex-1 p-4 font-mono text-sm leading-relaxed md:p-5">{children}</div>
    </div>
  </div>
)

export const TermLine = ({ children, className }) => (
  <div className={classNames('whitespace-pre-wrap break-words', className)}>{children}</div>
)

export const TermPrompt = ({ path = '~' }) => (
  <span>
    <span className="text-term-green">➜</span> <span className="text-term-blue">{path}</span>{' '}
  </span>
)

export const TermOk = ({ children }) => (
  <span className="text-term-green">
    <span className="mr-2">✔</span>
    {children}
  </span>
)

export default Terminal
