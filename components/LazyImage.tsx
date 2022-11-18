import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BigImageContext, LazyImageContext } from '@/context/index'
import placeholderPic from '@/public/placeholder-pic.svg'
import styles from './css/File.module.css'

export default function File(props: { url: string }) {
  const [shouldRender, setShouldRender] = useState(false)
  const id = useRef(Math.random().toString(36).slice(2))
  const ref = useRef<HTMLImageElement>(null)
  const lazyImageContext = useContext(LazyImageContext)
  const bigImageContext = useContext(BigImageContext)
  useEffect(() => {
    if (lazyImageContext && ref.current) {
      const { io, callbacks } = lazyImageContext
      const { current } = ref
      io.observe(current)
      callbacks[id.current] = () => {
        setShouldRender(true)
        io.unobserve(current)
        delete callbacks[id.current]
      }
      return () => {
        io.unobserve(current)
        delete callbacks[id.current]
      }
    }
  }, [lazyImageContext])
  return <div
    data-id={id.current}
    ref={ref}
    onClick={() => bigImageContext(props.url)}
    className={`${styles.file} ${shouldRender ? '' : styles.empty}`}
    // src={shouldRender ? props.url : placeholderPic.src}
    style={{
      backgroundImage: shouldRender ? `url(${props.url})` : `url(${placeholderPic.src})`
    }}
  />
}
