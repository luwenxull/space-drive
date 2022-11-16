import type { File } from '@/pages/index'
import styles from './File.module.css'

function resolveFileUrl(file: File, pd: string[]) {
  return '/api/file?path=' + encodeURIComponent(pd.join('/') + '/' + file.name)
}

const exts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']

export default function (props: { file: File, pd: string[] }) {
  if (exts.includes(props.file.name.split('.').pop() || '')) {
    return <img className={styles.file} src={resolveFileUrl(props.file, props.pd)} alt={props.file.name} />
  }
}
