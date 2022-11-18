import { useEffect, useRef, useState } from "react"
import { Backdrop } from '@mui/material'
import { AxiosResponse } from "axios"
import { modules } from '@/api/index'
import File from "@/components/File"
import Entries from '@/components/Entries'
import Folder from "@/components/Folder"
import { LazyImageContext, BigImageContext } from "@/context/index"


export interface FileDesc {
  isDir: boolean,
  name: string,
}


export default function Home() {
  const [dirs, setDirs] = useState<string[]>(['/'])
  const [files, setFiles] = useState<FileDesc[]>([])
  const [bigImage, setBigImage] = useState<string | null>(null)
  const callbacks = useRef<{ [key: string]: () => void }>({})
  const [lazyImageContext, setLazyImageContext] = useState<{
    io: IntersectionObserver,
    callbacks: { [p: string]: () => void }
  } | null>(null)
  useEffect(() => {
    setLazyImageContext({
      io: new IntersectionObserver((entries, _self) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement,
              id = lazyImage.dataset.id
            if (id && callbacks.current[id]) {
              callbacks.current[id]()
            }
          }
        }
      }),
      callbacks: callbacks.current
    })
  }, [])
  useEffect(() => {
    modules.file.get({ query: dirs.length ? { path: dirs.join('/') } : {} })
      .then((res: AxiosResponse<FileDesc[]>) => {
        setFiles(res.data)
      })
  }, [dirs])

  function handleEnter(f: FileDesc) {
    setDirs([...dirs, f.name])
  }

  function handleJump(index: number) {
    if (index >= 0) {
      setDirs(dirs.slice(0, index + 1))
      setFiles([])
    }
  }

  return (
    <>
      <Entries dirs={dirs} onJump={handleJump} />
      <LazyImageContext.Provider value={lazyImageContext}>
        <BigImageContext.Provider value={setBigImage}>
          <div className="grid">
            {
              files.map(f =>
                f.isDir ? <Folder file={f} onEnter={handleEnter} /> : <File file={f} pd={dirs} />
              )
            }
          </div>
        </BigImageContext.Provider>
      </LazyImageContext.Provider>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={bigImage !== null}
        onClick={() => setBigImage(null)}
      >
        {bigImage !== null ? <img src={bigImage} alt="" className="big-image" /> : null}
      </Backdrop>
    </>
  )
}
