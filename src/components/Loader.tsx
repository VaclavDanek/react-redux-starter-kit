import { default as Loader } from 'react-loaders'

// types
import type { LoaderType } from 'react-loaders'

// styles
import 'loaders.css/src/animations/ball-pulse-sync.scss'
// import 'loaders.css/src/animations/ball-pulse.scss'
// import 'loaders.css/src/animations/ball-clip-rotate.scss'
// import 'loaders.css/src/animations/ball-scale-multiple.scss'
// import 'loaders.css/src/animations/line-scale.scss'
interface LoaderProps {
  className?: string;
  innerClassName?: string;
  active: boolean;
  type?: LoaderType;
  color?: string;
}

export default (props: Readonly<LoaderProps>): JSX.Element | null => {
  const { 
    className = 'vh-center', 
    type = 'ball-pulse-sync', 
    color = '#0d6efd', 
    active, 
    innerClassName, 
  } = props

  return !active ? null : (
    <Loader
      {...{
        className,
        innerClassName,
        active,
        type,
        color,
      }}
    />
  )
}
