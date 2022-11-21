import { Breadcrumbs, Link, AppBar, Toolbar, IconButton } from '@mui/material'
import TurnLeftOutlined from '@mui/icons-material/TurnLeftOutlined'

export default function Entries(props: {
  dirs: string[],
  onJump: (index: number) => void,
}) {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar variant='dense'>
          <IconButton
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => props.onJump(props.dirs.length - 2)}
          >
            <TurnLeftOutlined />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb" separator="-" sx={{color: '#fff'}}>
            {props.dirs.map((dir, index) => {
              return (
                <Link
                  href={index === props.dirs.length - 1 ? undefined : "#"}
                  key={index}
                  color="inherit"
                  underline="hover"
                  onClick={() => props.onJump(index)}
                >
                  {/* <Chip label={dir} size="small"/> */}
                  {dir}
                </Link>
              )
            })}
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
    </>
  )
}
