import React from 'react'
import Link from 'next/link'
import classNames from 'clsx'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import Date from '@/components/Date'

const BlogCardVertical = ({ className, title, images, slug, description, date, tags }) => (
  <div
    className={classNames(
      'group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-night-surface',
      'transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.8)]',
      className
    )}
  >
    {images?.[0] && (
      <Link
        href={slug.join('/')}
        aria-label={title}
        className="not-prose relative block aspect-w-16 aspect-h-9 w-full overflow-hidden border-b border-line"
      >
        <Image
          src={images[0].src}
          alt={images[0].alt || title}
          animation="fade-in zoom-out"
          wrapperClassName="transition-transform group-hover:scale-105 duration-300 ease-out"
          sizes="(min-width: 768px) 428px, 100vw"
          className="object-cover"
          fill
        />
      </Link>
    )}
    <div className="flex grow flex-col p-5 md:p-6">
      <div className="flex flex-wrap gap-1.5">
        {tags?.map((tag) => (
          <Tag key={tag.title} slug={tag.slug}>
            {tag.title}
          </Tag>
        ))}
      </div>
      <Link href={slug.join('/')} aria-label={title} className="no-underline">
        <h5 className="my-3 text-white transition-colors group-hover:text-accent">{title}</h5>
      </Link>
      <small className="mb-4 line-clamp-3 text-ink-mute">{description}</small>
      {date && (
        <div className="mt-auto flex items-center gap-2 border-t border-line pt-4">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-term-green" />
          <Date date={date} />
        </div>
      )}
    </div>
  </div>
)

export default BlogCardVertical
