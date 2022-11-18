import type { FileDesc } from "@/pages/index";
import FolderOutlined from "@mui/icons-material/FolderOutlined";

import Thumbnail from './Thumbnail'

export default function Folder(props: { file: FileDesc, onEnter: (file: FileDesc) => void }) {
  return (
    <Thumbnail file={props.file} onClick={props.onEnter} >
      <FolderOutlined sx={{ mb: 2 }} fontSize="large"/>
    </Thumbnail>
  )
}

