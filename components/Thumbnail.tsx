import { Paper, Stack, Tooltip, Typography } from '@mui/material'
import type { FileDesc } from "@/pages/index";
import styles from './css/File.module.css'
import { PropsWithChildren } from 'react';

export default function Folder(props: PropsWithChildren<{ file: FileDesc, onClick: (file: FileDesc) => void }>) {
  return (
    <Paper onClick={() => props.onClick(props.file)} sx={{ m: 1, cursor: 'pointer' }} elevation={0}>
      <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
        {props.children}
        <Tooltip title={props.file.name}>
          <Typography className={styles.name} sx={{ px: 1, fontFamily: 'serif' }}>
            {props.file.name}
          </Typography>
        </Tooltip>
      </Stack>
    </Paper>
  )
}
