import { useState } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FilterListIcon from '@mui/icons-material/FilterList'
import SettingsIcon from '@mui/icons-material/Settings'
import PlaceIcon from '@mui/icons-material/Place'
import Paper from '@mui/material/Paper'

interface User {
  id: number
  name: string
  initials: string
  email: string
  location: string
  status: 'Active' | 'Suspended'
  cellId: string
}

const users: User[] = [
  { id: 1, name: 'Prabodhan Fitzgerald', initials: 'OP', email: 'Cell', location: 'Izsahport', status: 'Active', cellId: 'Cell' },
  { id: 2, name: 'Hiro Joyce', initials: 'OP', email: 'Cell', location: 'Strackeside', status: 'Active', cellId: 'Cell' },
  { id: 3, name: 'Lloyd Jefferson', initials: 'OP', email: 'Cell', location: 'Texas City', status: 'Active', cellId: 'Cell' },
  { id: 4, name: 'Ceiran Mayo', initials: 'OP', email: 'Cell', location: 'Lake Esmeralda', status: 'Active', cellId: 'Cell' },
  { id: 5, name: 'Thumbiko James', initials: 'OP', email: 'Cell', location: 'East Paige', status: 'Suspended', cellId: 'Cell' },
]

export default function UserTable() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selected, setSelected] = useState<number[]>([])
  const [attribute, setAttribute] = useState('')

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(users.map((u) => u.id))
    } else {
      setSelected([])
    }
  }

  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  return (
    <Paper elevation={1} sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Toolbar */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          label="Search"
          placeholder="Name, email, etc..."
          variant="outlined"
          size="medium"
          sx={{ flex: 1, maxWidth: 400 }}
        />
        <FormControl variant="outlined" size="medium" sx={{ flex: 1, maxWidth: 360 }}>
          <InputLabel id="attribute-label">Attribute</InputLabel>
          <Select
            labelId="attribute-label"
            value={attribute}
            label="Attribute"
            onChange={(e) => setAttribute(e.target.value)}
          >
            <MenuItem value="">Property</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="location">Location</MenuItem>
          </Select>
        </FormControl>
        <IconButton aria-label="filter">
          <FilterListIcon />
        </IconButton>
        <Button variant="outlined" color="inherit" sx={{ textTransform: 'uppercase', fontWeight: 500 }}>
          Action
        </Button>
        <Button variant="contained" color="primary" sx={{ textTransform: 'uppercase', fontWeight: 500 }}>
          New
        </Button>
        <IconButton aria-label="settings">
          <SettingsIcon />
        </IconButton>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < users.length}
                  checked={users.length > 0 && selected.length === users.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Account status</TableCell>
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id} hover selected={selected.includes(user.id)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selected.includes(user.id)}
                    onChange={() => handleSelect(user.id)}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ width: 40, height: 40, bgcolor: '#ef6c00', fontSize: 14 }}>
                      {user.initials}
                    </Avatar>
                    <Typography variant="body2">{user.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.email}</Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PlaceIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2">{user.location}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    size="medium"
                    color={user.status === 'Active' ? 'success' : 'warning'}
                    variant="filled"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.cellId}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={13}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10))
          setPage(0)
        }}
        labelRowsPerPage="Rows per page:"
      />
    </Paper>
  )
}
