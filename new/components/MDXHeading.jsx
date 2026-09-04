import Link from 'next/link'
import { IoLink } from 'react-icons/io5'

const MDXHeading = ({ as = 'h1', ...props }) => {
  const Component = as

  return props.id ? (
    <Link href={`#${props.id}`} className="group no-underline">
      <Component {...props}>
        {props.children}
        <IoLink className="ml-3 inline-block h-6 w-6 text-accent opacity-20 transition-opacity group-hover:opacity-100" />
      </Component>
    </Link>
  ) : (
    <Component {...props}>{props.children}</Component>
  )
}

export default MDXHeading
