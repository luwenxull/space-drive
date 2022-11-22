import { useEffect, useRef, useState, MouseEvent } from "react"
import { Backdrop, LinearProgress, Box, Stack, IconButton } from '@mui/material'
import ChevronLeft from "@mui/icons-material/ChevronLeftOutlined"
import ChevronRight from "@mui/icons-material/ChevronRightOutlined"
import { AxiosResponse } from "axios"
import { modules } from '@/api/index'
import File from "@/components/File"
import Entries from '@/components/Entries'
import Folder from "@/components/Folder"
import { LazyImageContext, BigImageContext, ImageChainRoot, removeNode, ImageChainNode } from "@/context/index"


export interface FileDesc {
  isDir: boolean,
  name: string,
}

function getPath(dirs: string[]) {
  return dirs.length > 1 ? dirs.slice(1).join('/') : '/'
}

export default function PathResolver() {
  const [dirs, setDirs] = useState<string[]>([])
  useEffect(() => {
    const path = location.hash.slice(1)
    if (path) {
      setDirs(['/'].concat(path.split('/').filter(p => p !== '')))
    } else {
      setDirs(['/'])
    }
  }, [])
  function _setDirs(dirs: string[]) {
    location.hash = getPath(dirs)
    setDirs(dirs)
  }
  return dirs.length ? <Driver dirs={dirs} setDirs={_setDirs} /> : null
}

function Driver(props: {
  dirs: string[],
  setDirs: (dirs: string[]) => void
}) {
  const { dirs, setDirs } = props
  const callbacks = useRef<{ [key: string]: () => void }>({})
  const imageChainRoot = useRef<ImageChainRoot>({})
  const [files, setFiles] = useState<{ list: FileDesc[], loading: boolean }>({ list: [], loading: false })
  const [bigImage, setBigImage] = useState<ImageChainNode | null>(null)
  // 懒加载
  const [lazyImageContext, setLazyImageContext] = useState<{
    io: IntersectionObserver,
    callbacks: { [p: string]: () => void }
  } | null>(null)
  // 大图
  const bigImageContext = useRef((src: string) => {
    if (imageChainRoot.current.end) {
      const end = {
        prev: imageChainRoot.current.end,
        url: src,
        root: imageChainRoot.current,
      }
      imageChainRoot.current.end.next = end
      imageChainRoot.current.end = end
    } else {
      imageChainRoot.current.start = {
        url: src,
        root: imageChainRoot.current,
      }
      imageChainRoot.current.end = imageChainRoot.current.start
    }
    const node = imageChainRoot.current.end
    return {
      node,
      remove: () => {
        removeNode(node)
      },
      display: () => setBigImage(node)
    }
  })
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
    modules.file.get({ query: { path: getPath(dirs) } })
      .then((res: AxiosResponse<FileDesc[]>) => {
        setFiles({ loading: false, list: res.data })
      })
  }, [dirs])

  function handleEnter(f: FileDesc) {
    debugger
    setDirs([...dirs, f.name])
    setFiles({ loading: true, list: [] })
  }

  function handleJump(index: number) {
    if (index >= 0) {
      setDirs(dirs.slice(0, index + 1))
      setFiles({ loading: true, list: [] })
    }
  }

  function next(direction: number, e: MouseEvent) {
    e.stopPropagation()
    if (bigImage) {
      if (direction > 0) {
        if (bigImage.next) {
          setBigImage(bigImage.next)
        }
      } else if (direction < 0) {
        if (bigImage.prev) {
          setBigImage(bigImage.prev)
        }
      }
    }
  }

  return (
    <>
      <Entries dirs={dirs} onJump={handleJump} />
      {files.loading ? <LinearProgress /> : null}
      <LazyImageContext.Provider value={lazyImageContext}>
        <BigImageContext.Provider value={bigImageContext.current}>
          <div className="grid" style={bigImage !== null ? { filter: 'blur(4px)' } : undefined}>
            {
              files.list.map((f, i) =>
                f.isDir ? <Folder file={f} onEnter={handleEnter} key={i} /> : <File file={f} pd={dirs} key={i} />
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
        {bigImage !== null ? <img src={bigImage.url} alt="" className="big-image" /> : null}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          // sx={{ position: 'absolute', bottom: '4px' }}
          sx={{ position: 'absolute', width: '100%' }}
        >
          <Stack sx={{ height: '100%', bgcolor: '#0002', borderRadius: '50%' }} justifyContent="center">
            <IconButton color="inherit" onClick={(e) => next(-1, e)} sx={{ opacity: 1 }}>
              <ChevronLeft />
            </IconButton>
          </Stack>
          <Stack sx={{ height: '100%', bgcolor: '#0002', borderRadius: '50%' }} justifyContent="center">
            <IconButton color="inherit" onClick={(e) => next(1, e)} sx={{ opacity: 1 }}>
              <ChevronRight />
            </IconButton>
          </Stack>
        </Stack>
      </Backdrop>
    </>
  )
}
