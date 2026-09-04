import dynamic from 'next/dynamic'

const layouts = {
  About: dynamic(() => import(`@/layouts/About`)),
  Blog: dynamic(() => import(`@/layouts/Blog`)),
  Contact: dynamic(() => import(`@/layouts/Contact`)),
  Services: dynamic(() => import(`@/layouts/Services`)),
  Home: dynamic(() => import(`@/layouts/Home`)),
  Post: dynamic(() => import(`@/layouts/Post`)),
  Projects: dynamic(() => import(`@/layouts/Projects`)),
  Fallback: dynamic(() => import(`@/layouts/Fallback`)),
  Blank: dynamic(() => import(`@/layouts/Blank`)),
  BlankCenter: dynamic(() => import(`@/layouts/BlankCenter`)),
  BlankCentered: dynamic(() => import(`@/layouts/BlankCenter`)),
  'Home-2': dynamic(() => import(`@/layouts/Home`)),
  'Home-3': dynamic(() => import(`@/layouts/Home`)),
  'Home-4': dynamic(() => import(`@/layouts/Home`)),
}

export default layouts
