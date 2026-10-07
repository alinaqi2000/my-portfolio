import TagCard from '@/components/TagCard'
import BlogCardVertical from '@/components/BlogCardVertical'
import ContentRenderer from '@/components/ContentRenderer'
import Paging from '@/components/Paging'
import useInfinitePaging from '@/components/useInfinitePaging'
import Newsletter from '@/components/Newsletter'
import Reveal from '@/components/Reveal'
import Sep from '@/components/Sep'

const Layout = ({ pagination, collection, slug, content, categories }) => {
  const { records, infinitePaging } = collection
  const { currentPage, totalPages } = pagination
  const [infiniteRecords] = useInfinitePaging({ currentPage, records, enabled: infinitePaging })

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
      <header className="mb-14 max-w-2xl md:mb-20">
        <div className="text-ink-faint mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[.2em]">
          <span className="text-term-green">03</span>
          <span className="bg-line h-px w-12" />
          <span>Notes from the workbench</span>
        </div>
        <div className="prose prose-invert">
          <ContentRenderer source={content} />
        </div>
      </header>

      {categories && (
        <section
          className="glass-border glass mb-14 grid overflow-hidden rounded-lg border md:grid-cols-[1fr_1.4fr]"
          aria-label="Article categories"
        >
          <div className="border-line border-b p-6 md:border-b-0 md:border-r md:p-8">
            <div className="mb-5 font-mono text-xs uppercase tracking-widest text-accent">
              Index / topics
            </div>
            <div className="prose prose-invert">
              <ContentRenderer source={categories} />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {categories?.collection?.records?.map((tag) => (
                <TagCard key={tag.title} {...tag} />
              ))}
            </div>
          </div>
          <Reveal animation="fade-in slide-in-left" className="glass-subtle p-6 md:p-8">
            <div className="text-term-green mb-5 font-mono text-xs uppercase tracking-widest">
              / subscribe
            </div>
            <Newsletter />
          </Reveal>
        </section>
      )}

      <Sep line />
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <div className="text-ink-faint font-mono text-xs uppercase tracking-widest">
            Latest entries
          </div>
          {currentPage && (
            <div className="text-ink-faint font-mono text-xs">
              page {currentPage} / {totalPages}
            </div>
          )}
        </div>
        {Array.from({ length: currentPage }, (_, i) => {
          const page = i + 1
          const isStaticPage = page === currentPage
          const pageRecords = isStaticPage
            ? records
            : infinitePaging && infiniteRecords[page]?.records
          if (!pageRecords) return null
          return (
            <div
              key={`page-${page}`}
              className="glass-stage mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {pageRecords.map((record) => (
                <BlogCardVertical key={record.slug.join('/')} {...record} />
              ))}
            </div>
          )
        })}
        <Paging
          infinite={infinitePaging}
          currentPage={currentPage}
          totalPages={totalPages}
          slug={slug}
        />
      </div>
    </div>
  )
}

export default Layout
