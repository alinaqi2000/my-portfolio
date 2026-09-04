import classNames from 'clsx'
import Link from 'next/link'

const TagCard = (tag) => (
  <Link
    href={tag.slug.join('/')}
    className={classNames(
      'group flex items-stretch justify-between no-underline',
      'rounded-md border border-line bg-night-surface transition-colors hover:border-accent/60'
    )}
  >
    <div className="flex items-center p-4">
      <small className="font-mono text-sm text-ink-mute transition-colors group-hover:text-white">
        {tag.title}
      </small>
    </div>
    <div className="flex w-14 items-center justify-center border-l border-line text-center">
      <small className="font-mono text-sm font-bold text-accent">
        {tag.collection?.totalRecords}
      </small>
    </div>
  </Link>
)

export default TagCard
