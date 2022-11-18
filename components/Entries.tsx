import { Stack, Breadcrumbs, Link, Chip, Button, Box, AppBar, Toolbar, IconButton } from '@mui/material'
import TurnLeftOutlined from '@mui/icons-material/TurnLeftOutlined'

export default function Entries(props: {
  dirs: string[],
  onJump: (index: number) => void,
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <TurnLeftOutlined sx={{ mx: 1 }} onClick={() => props.onJump(props.dirs.length - 2)} />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb" separator="-">
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
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
