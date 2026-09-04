import ProjectCardHorizontal from '@/components/ProjectCardHorizontal'
import RepositoryCard from '@/components/RepositoryCard'
import ContentRenderer from '@/components/ContentRenderer'
import Reveal from '@/components/Reveal'
import Sep from '@/components/Sep'

const Layout = ({ projects, github }) => (
  <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
    <header className="mb-14 max-w-2xl md:mb-20">
      <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[.2em] text-ink-faint">
        <span className="text-term-green">02</span><span className="h-px w-12 bg-line" /><span>Open source &amp; selected work</span>
      </div>
      <div className="prose prose-invert"><ContentRenderer source={github} /></div>
    </header>

    {github?.repositories?.records?.length > 0 && (
      <section aria-labelledby="github-heading">
        <div className="mb-6 flex items-end justify-between border-b border-line pb-4">
          <h2 id="github-heading" className="m-0 text-2xl">On GitHub</h2>
          <a href="https://github.com/alinaqi2000" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-ink-faint no-underline hover:text-accent">github.com/alinaqi2000 -&gt;</a>
        </div>
        <div className="not-prose grid grid-cols-1 gap-4 md:grid-cols-2">
          {github.repositories.records.map((item, i) => (
            <Reveal animation="fade-in slide-in-top" delay={i * 70} key={item.name}><RepositoryCard {...item} /></Reveal>
          ))}
        </div>
      </section>
    )}

    <Sep line className="my-16 md:my-24" />

    <section aria-labelledby="projects-heading">
      <div className="mb-6 flex items-end justify-between border-b border-line pb-4">
        <div className="prose prose-invert"><ContentRenderer source={projects} /></div>
        <span className="hidden font-mono text-xs text-ink-faint md:block">{projects?.collection?.totalRecords || projects?.collection?.records?.length || 0} projects</span>
      </div>
      <div className="not-prose grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects?.collection?.records?.map((item, i) => (
          <ProjectCardHorizontal key={item.slug.join('/')} index={i} {...item} />
        ))}
      </div>
    </section>
  </div>
)

export default Layout
