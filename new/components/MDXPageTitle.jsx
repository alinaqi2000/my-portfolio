import Sep from '@/components/Sep'

const PageTitle = ({ children }) => (
  <div className="mb-2">
    <div className="mb-1 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-ink-faint">
      <span className="text-accent">##</span>
      <span className="h-px flex-1 bg-line" />
    </div>
    {children}
    <Sep className="mt-6" line />
  </div>
)

export default PageTitle
