import { Paper, Stack } from '@mui/material'
import FolderOutlined from '@mui/icons-material/FolderOutlined'
import type { FileDesc } from "@/pages/index";

export default function Folder(props: { file: FileDesc, onEnter: (file: FileDesc) => void }) {
  return (
    <Paper onClick={() => props.onEnter(props.file)} sx={{ m: 1, cursor: 'pointer' }}>
      <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>

        <FolderOutlined sx={{ mb: 2 }} />
        {props.file.name}
      </Stack>
    </Paper>
  )
}
