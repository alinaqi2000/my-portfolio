import ProjectCardHorizontal from '@/components/ProjectCardHorizontal'
import RepositoryCard from '@/components/RepositoryCard'
import ContentRenderer from '@/components/ContentRenderer'
import Reveal from '@/components/Reveal'
import PageTitle from '@/components/MDXPageTitle'

const Layout = ({ projects, github, onGH }) => (
  <div className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
    <header className="mb-14 max-w-2xl md:mb-20">
      <div className="prose prose-invert">
        <ContentRenderer source={github} />
      </div>
    </header>

    {github?.repositories?.records?.length > 0 && (
      <section aria-labelledby="github-heading">
        <div className="border-line mb-6 flex items-baseline justify-between border-b px-6 pb-4 md:mx-[-25px]">
          <div className="prose prose-invert">
            <ContentRenderer source={onGH} />
          </div>
          <a
            href="https://github.com/alinaqi2000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-faint font-mono text-xs no-underline hover:text-accent"
          >
            github.com/alinaqi2000 -&gt;
          </a>
        </div>
        <div className="glass-stage not-prose grid grid-cols-1 gap-4 md:grid-cols-2">
          {github.repositories.records.map((item, i) => (
            <Reveal animation="none" key={item.name}>
              <RepositoryCard {...item} />
            </Reveal>
          ))}
        </div>
      </section>
    )}

    <section aria-labelledby="projects-heading" className="mt-16 md:mt-24">
      <div className="border-line mb-6 flex items-end justify-between border-b px-6 pb-4 md:mx-[-25px]">
        <div className="prose prose-invert">
          <ContentRenderer source={projects} />
        </div>
        <span className="text-ink-faint hidden font-mono text-xs md:block">
          {projects?.collection?.totalRecords || projects?.collection?.records?.length || 0}{' '}
          projects
        </span>
      </div>
      <div className="glass-stage not-prose grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects?.collection?.records?.map((item, i) => (
          <ProjectCardHorizontal key={item.slug.join('/')} index={i} {...item} />
        ))}
      </div>
    </section>
  </div>
)

export default Layout
