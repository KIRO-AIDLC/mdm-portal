import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import MenuIcon from '@mui/icons-material/Menu'
import StarIcon from '@mui/icons-material/Star'

export default function AppHeader() {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="body1" color="inherit" sx={{ flexGrow: 1 }}>
          Typography
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton color="inherit" aria-label="star">
            <StarIcon />
          </IconButton>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'warning.main', fontSize: 14 }}>
            OP
          </Avatar>
          <IconButton color="inherit" aria-label="star">
            <StarIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
