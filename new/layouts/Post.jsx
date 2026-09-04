import React from 'react'
import dynamic from 'next/dynamic'
import { ArticleJsonLd } from 'next-seo'
import ContentRenderer from '@/components/ContentRenderer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import Date from '@/components/Date'
import ImageGallery from '@/components/ImageGallery'
import Sep from '@/components/Sep'
import Newsletter from '@/components/Newsletter'
import { siteMetaData } from '../theme.config'
import authorImage from '../public/author-profile-picture.jpg'

const SocialShare = dynamic(() => import('@/components/SocialShare'))

const Layout = ({
  content,
  title,
  description,
  date,
  seo = {},
  tags = [],
  images = [],
  attributes = [],
  pageUrl,
}) => {
  const { siteUrl, authorName } = siteMetaData || {}

  return (
    <>
      <ArticleJsonLd
        type="BlogPosting"
        url={pageUrl}
        title={title}
        images={images.map((img) => siteUrl + img.src)}
        datePublished={date}
        authorName={authorName}
        description={seo?.description || description}
      />
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <div className="prose prose-invert">
          <header className="mx-auto max-w-3xl space-y-8 text-center">
            <div className="flex flex-wrap justify-center gap-1.5">
              {tags?.map((tag) => (
                <Tag key={tag.title} slug={tag.slug}>
                  {tag.title}
                </Tag>
              ))}
            </div>
            <h1 className="mb-0">{title}</h1>
            <div className="not-prose mx-auto flex max-w-md items-center justify-center gap-4 rounded-lg border border-line bg-night-surface px-6 py-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-accent/50">
                <Image
                  src={authorImage}
                  alt="Picture of the author"
                  animation="fade-in"
                  className="rounded-full object-cover"
                  priority
                  fill
                />
              </div>
              <div className="text-left">
                <div className="font-mono text-sm text-white">By {authorName}</div>
                <Date date={date} />
              </div>
            </div>
          </header>

          {attributes.length > 0 && (
            <div className="not-prose mt-12 overflow-hidden rounded-lg border border-line bg-night-surface">
              <div className="terminal-titlebar">
                <span className="terminal-dot bg-term-red" />
                <span className="terminal-dot bg-term-yellow" />
                <span className="terminal-dot bg-term-green" />
                <span className="ml-3 font-mono text-xs text-ink-faint">metadata.json</span>
              </div>
              <dl className="grid grid-cols-fluid gap-4 p-6 [--tw-fluid-col-min:8rem] md:px-10">
                {attributes.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
                      {label}
                    </dt>
                    <dd className="m-0 text-ink-mute">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="not-prose mt-10">
            <ImageGallery images={images} />
          </div>

          <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-[auto_3fr_auto] md:gap-0">
            <div>
              <SocialShare url={pageUrl} className="sticky left-10 top-24 z-10" />
            </div>
            <div className="prose prose-invert mx-auto max-w-prose prose-pre:max-w-[90vw]">
              <ContentRenderer source={content} />
            </div>
          </div>

          <Sep line className="my-20" />

          <div className="mx-auto max-w-lg rounded-lg border border-line bg-night-surface p-8">
            <Newsletter className="text-center" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
