import React from 'react'
import Link from 'next/link'
import { ArticleJsonLd } from 'next-seo'
import ContentRenderer from '@/components/ContentRenderer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import Date from '@/components/Date'
import ImageGallery from '@/components/ImageGallery'
import Reveal from '@/components/Reveal'
import Button from '@/components/Button'
import { siteMetaData } from '../theme.config'
import authorImage from '../public/dp.jpeg'

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
      <div className="glass-stage mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16 md:px-12 md:py-24">
        {/* Header */}
        <header className="mx-auto max-w-3xl pt-2 md:pt-0">
          <Reveal animation="fade-in slide-in-bottom">
            <div className="mb-6 flex flex-wrap gap-1.5">
              {tags?.map((tag) => (
                <Tag key={tag.title} slug={tag.slug}>
                  {tag.title}
                </Tag>
              ))}
            </div>
            <h1 className="m-0 text-3xl md:text-5xl">{title}</h1>
            {description && (
              <p className="text-ink-mute mt-4 text-base md:text-lg">{description}</p>
            )}
            <div className="glass-border glass mt-8 flex items-center gap-4 rounded-lg border px-5 py-4">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-accent/50">
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
          </Reveal>
        </header>

        {/* Metadata terminal */}
        {attributes.length > 0 && (
          <Reveal animation="fade-in" delay={100}>
            <div className="glass-border glass mt-10 overflow-hidden rounded-lg border">
              <div className="terminal-titlebar">
                <span className="terminal-dot bg-term-red" />
                <span className="terminal-dot bg-term-yellow" />
                <span className="terminal-dot bg-term-green" />
                <span className="text-ink-faint ml-3 font-mono text-xs">metadata.json</span>
              </div>
              <dl className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-4 md:px-8">
                {attributes.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                      {label}
                    </dt>
                    <dd className="text-ink-mute m-0 text-sm">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        )}

        {/* Gallery */}
        {images?.length > 0 && (
          <div className="mt-10">
            <ImageGallery images={images} />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert mt-10 max-w-none break-words md:mt-16">
          <ContentRenderer source={content} />
        </div>

        {/* CTA — Hire me / Contact */}
        <Reveal animation="fade-in slide-in-bottom" className="mt-16 md:mt-24">
          <div className="glass-border glass relative overflow-hidden rounded-lg border p-6 text-center md:p-12">
            <div className="text-term-green mb-3 font-mono text-xs uppercase tracking-[.2em]">
              $ let&apos;s collaborate
            </div>
            <h3 className="m-0 text-xl md:text-2xl">Have a project in mind?</h3>
            <p className="text-ink-mute mx-auto mt-3 max-w-md">
              I&apos;m available for full-time positions and contract work. Let&apos;s turn your
              ideas into impactful digital products.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Button as={Link} href="/contact" size="md" variant="accent">
                Start a conversation
              </Button>
              <Button as={Link} href="/projects" size="md" variant="ghost" showArrow>
                View more work
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  )
}

export default Layout
