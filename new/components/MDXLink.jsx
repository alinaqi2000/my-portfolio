import classNames from 'clsx'
import Link from '@/components/Link'

const MDXLink = ({ className, children, ...props }) => (
  <Link className={classNames('text-accent hover:underline', className)} {...props}>
    {children}
  </Link>
)

export default MDXLink
