import React from 'react'
import classNames from 'clsx'

/**
 * Herdr-style mock terminal window.
 * The centerpiece visual of the design system: dark panel, traffic-light
 * dots, mono output with colored status lines.
 */
const Terminal = ({
  title = 'alinaqi@dev: ~',
  sidebar,
  children,
  className,
  bodyClassName,
}) => (
  <div className={classNames('terminal-window rounded-lg border border-line bg-night-surface', className)}>
    <div className="terminal-titlebar">
      <span className="terminal-dot bg-term-red" />
      <span className="terminal-dot bg-term-yellow" />
      <span className="terminal-dot bg-term-green" />
      <span className="ml-3 truncate font-mono text-xs text-ink-faint">{title}</span>
    </div>
    <div className={classNames('flex', bodyClassName)}>
      {sidebar && (
        <div className="hidden w-44 shrink-0 flex-col gap-1 border-r border-line bg-night p-3 md:flex">
          {sidebar}
        </div>
      )}
      <div className="min-w-0 flex-1 p-4 font-mono text-sm leading-relaxed md:p-5">
        {children}
      </div>
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
