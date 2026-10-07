import Sep from '@/components/Sep'

const PageTitle = ({ children, className = null }) => (
  <div className="mb-2">
    {/** <div className="text-ink-faint mb-1 flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
<span className="bg-line h-px flex-1" />
    </div>
**/}
    <div className={'flex items-baseline'}>
      <span className="mr-2 font-bold text-accent">##</span> {children}
    </div>
    {/** <Sep className="mt-6" line /> **/}
  </div>
)

export default PageTitle
