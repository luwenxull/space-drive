import Image from "next/image"
import { useEffect, useState } from "react"
import { AxiosResponse } from "axios"
import { modules } from 'api/index'
import FileC from "components/File"
import Dirs from 'components/Dirs'

function Dir(props: { file: File, onEnter: (file: File) => void }) {
  return <div onClick={() => props.onEnter(props.file)}>{props.file.name}</div>
}

export interface File {
  isDir: boolean,
  name: string,
}

export default function Home() {
  const [dirs, setDirs] = useState<string[]>(['/'])
  const [files, setFiles] = useState<File[]>([])
  useEffect(() => {
    modules.file.get({ query: dirs.length ? { path: dirs.join('/') } : {} })
      .then((res: AxiosResponse<File[]>) => {
        setFiles(res.data)
      })
  }, [dirs.length])

  function handleEnter(f: File) {
    setDirs([...dirs, f.name])
  }

  function handleJump(index: number) {
    if (index > 0) {
      setDirs(dirs.slice(0, dirs.length - index))
    }
  }

  return <>
    <Dirs dirs={dirs} onJump={handleJump}/>
    <div className="grid">
      {
        files.map(f =>
          f.isDir ? <Dir file={f} onEnter={handleEnter} /> : <FileC file={f} pd={dirs} />
        )
      }
    </div>
  </>
}
