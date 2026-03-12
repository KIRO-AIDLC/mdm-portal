import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import AppHeader from '../components/AppHeader'
import Sidenav from '../components/Sidenav'
import UserTable from '../components/UserTable'
import { useState } from 'react'

export default function UserManagement() {
  const theme = useTheme()
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMediumOrSmall = useMediaQuery(theme.breakpoints.down('lg'))
  const [bottomNavValue, setBottomNavValue] = useState(0)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppHeader />
      {!isExtraSmall && <Sidenav collapsed={isMediumOrSmall} />}
      <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <Toolbar />
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ py: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              User management
            </Typography>
          </Box>
          <UserTable />
        </Box>
      </Box>
      {isExtraSmall && (
        <BottomNavigation
          value={bottomNavValue}
          onChange={(_, v) => setBottomNavValue(v)}
          showLabels
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: 1, borderColor: 'divider' }}
        >
          <BottomNavigationAction label="Label" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Label" icon={<ShoppingCartIcon />} />
          <BottomNavigationAction label="Label" icon={<PersonIcon />} />
        </BottomNavigation>
      )}
    </Box>
  )
}
