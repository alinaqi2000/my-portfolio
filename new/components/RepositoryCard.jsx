import React from 'react'
import classNames from 'clsx'
import { BiStar, BiGitRepoForked } from 'react-icons/bi'

const languageColor = (language) => {
  const colors = {
    JavaScript: 'bg-term-yellow',
    TypeScript: 'bg-term-blue',
    PHP: 'bg-indigo-400',
    Python: 'bg-term-blue',
    Dart: 'bg-teal-400',
    Java: 'bg-term-orange',
    HTML: 'bg-term-red',
    CSS: 'bg-term-blue',
    Shell: 'bg-term-green',
    Vue: 'bg-term-green',
  }
  return colors[language] || 'bg-ink-faint'
}

const RepositoryCard = (props) => {
  const { stars, forks, name, owner, description, url, language, className } = props

  if (!name) return null

  return (
    <a
      href={url}
      aria-label={name}
      target="_blank"
      rel="noreferrer noopener"
      className={classNames(
        'group flex h-full flex-col rounded-lg border border-line bg-night-surface no-underline',
        'transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.8)]',
        className
      )}
    >
      <div className="p-5 md:p-6">
        <h6 className="m-0 font-mono text-base">
          <span className="text-ink-faint">{owner}/</span>
          <span className="text-white transition-colors group-hover:text-accent">{name}</span>
        </h6>
        <p className="m-0 mt-2 text-sm text-ink-mute">{description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-line px-5 py-3 font-mono text-xs text-ink-mute md:px-6">
        <div className="flex items-center gap-2">
          {language && (
            <>
              <span className={classNames('h-2.5 w-2.5 rounded-full', languageColor(language))} />
              {language}
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <BiStar className="text-term-yellow" />
            {stars}
          </span>
          <span className="flex items-center gap-1">
            <BiGitRepoForked className="text-accent" />
            {forks}
          </span>
        </div>
      </div>
    </a>
  )
}

export default RepositoryCard
