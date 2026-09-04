import React from 'react'
import Link from 'next/link'
import Image from '@/components/Image'
import Icon from '@/components/Icon'
import Tag from '@/components/Tag'

const ProjectCardHorizontal = ({ title, logo, images, slug, tags, description, attributes, index }) => (
  <article className="group overflow-hidden rounded-lg border border-line bg-night-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.8)]">
    <Link href={slug.join('/')} aria-label={`View ${title}`} className="not-prose relative block aspect-[16/9] overflow-hidden border-b border-line bg-night-inset">
      {images?.[0] && (
        <Image
          src={images[0].src}
          alt={images[0].alt || title}
          animation="fade-in zoom-out"
          wrapperClassName="h-full w-full transition-transform duration-500 group-hover:scale-105"
          className="object-cover"
          sizes="(min-width: 1024px) 540px, 100vw"
          priority={index === 0}
          fill
        />
      )}
      {images?.[0]?.overlay && (
        <div className="absolute inset-0 p-4">
          <Image
            src={images[0].overlay.src}
            alt={images[0].overlay.alt || title}
            animation="fade-in"
            wrapperClassName="h-full w-full drop-shadow-2xl"
            className="object-contain object-right"
            sizes="(min-width: 1024px) 540px, 100vw"
            fill
          />
        </div>
      )}
      <span className="absolute bottom-3 left-3 rounded bg-night/90 px-2 py-1 font-mono text-xs text-term-green opacity-0 transition-opacity group-hover:opacity-100">
        view project -&gt;
      </span>
    </Link>
    <div className="p-5 md:p-7">
      <div className="mb-3 flex items-center justify-between gap-4">
        {logo?.src ? (
          <Icon {...logo} className="h-7 w-28 fill-current text-ink-mute" />
        ) : (
          <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">project</span>
        )}
        <span className="font-mono text-xs text-ink-faint">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <Link href={slug.join('/')} aria-label={`View ${title}`} className="no-underline">
        <h4 className="m-0 text-white transition-colors group-hover:text-accent">{title}</h4>
      </Link>
      <p className="mt-3 text-sm text-ink-mute">{description}</p>
      {tags && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {tags.map((tag) => <Tag key={tag.title} slug={tag.slug}>{tag.title}</Tag>)}
        </div>
      )}
      {attributes && Array.isArray(attributes) && (
        <dl className="mt-5 flex flex-wrap gap-x-8 border-t border-line pt-4">
          {attributes.map(({ label, value }) => (
            <div key={label}>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">{label}</dt>
              <dd className="m-0 mt-1 text-sm text-white">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  </article>
)

export default ProjectCardHorizontal
