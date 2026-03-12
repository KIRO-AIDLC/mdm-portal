import { useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import StarIcon from '@mui/icons-material/Star'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

const DRAWER_WIDTH = 256
const COLLAPSED_WIDTH = 64

interface SidenavProps {
  collapsed?: boolean
}

const navItems = [
  { label: 'List Item', expandable: true, defaultOpen: true, children: ['List Item', 'List Item', 'List Item', 'List Item'] },
  { label: 'List Item', expandable: true, children: [] },
  { label: 'List Item', expandable: true, children: [] },
  { label: 'List Item' },
  { label: 'List Item' },
  { label: 'List Item' },
]

export default function Sidenav({ collapsed = false }: SidenavProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const width = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width, boxSizing: 'border-box', overflowX: 'hidden' },
      }}
    >
      <Toolbar />
      {!collapsed && (
        <>
          <Box sx={{ px: 2, pt: 2, pb: 1, display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src="https://img.logoipsum.com/243.svg"
              alt="Logoipsum"
              sx={{ height: 24, width: 120 }}
            />
          </Box>
          <Box sx={{ px: 2, py: 1 }}>
            <TextField label="Label" placeholder="Placeholder" variant="outlined" size="small" fullWidth />
          </Box>
        </>
      )}
      {collapsed && <Box sx={{ pt: 2 }} />}
      <List sx={{ px: 1 }}>
        {navItems.map((item, index) => {
          const hasChildren = item.expandable
          const isOpen = openIndex === index
          return (
            <Box key={index}>
              <ListItemButton onClick={() => hasChildren ? handleToggle(index) : undefined} sx={{ borderRadius: 1 }}>
                <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 56 }}>
                  <StarIcon />
                </ListItemIcon>
                {!collapsed && (
                  <>
                    <ListItemText primary={item.label} />
                    {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                  </>
                )}
              </ListItemButton>
              {hasChildren && !collapsed && item.children && item.children.length > 0 && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child, ci) => (
                      <ListItemButton key={ci} sx={{ pl: 9 }}>
                        <ListItemText primary={child} primaryTypographyProps={{ variant: 'body2' }} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          )
        })}
      </List>
    </Drawer>
  )
}

export { DRAWER_WIDTH, COLLAPSED_WIDTH }
