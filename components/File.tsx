import type { FileDesc } from '@/pages/index'
import LazyImage from './LazyImage'

function resolveFileUrl(file: FileDesc, pd: string[]) {
  return '/api/file?path=' + encodeURIComponent(pd.join('/') + '/' + file.name)
}

const ImgExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
const VideoExts = ['mp4', 'webm', 'ogg']

export default function File(props: { file: FileDesc, pd: string[] }) {
  const url = resolveFileUrl(props.file, props.pd), isImg = ImgExts.includes(props.file.name.split('.').pop() || '')
  if (isImg) {
    return <LazyImage url={url} />
  } else if (VideoExts.includes(props.file.name.split('.').pop() || '')) {
    return <a href={url}>{props.file.name}</a>
  }
}
