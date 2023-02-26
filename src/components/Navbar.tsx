import React from 'react';
import { AppBar, Box, Toolbar, Container, CssBaseline, Button, Avatar, Tooltip, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';


const settings = ['my 3D models', 'logout']

function NavBar({ user, setUser }: any) {

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const navigate = useNavigate()
  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget)
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null)
  }

  function getLetters() {
    return user.username.slice(0, 2).toUpperCase()
  }

  const pageStyle = {
    margin: '1rem',
    textDecoration: 'none',
    color: 'black',
  };

  const logSignStyle = {
    margin: '1rem',
    padding: '0.1rem 1.5rem',
    border: '0.5px solid grey',
    borderRadius: 6,
    color: 'white',
    backgroundColor: '#426da2',
  }

  const theme = createTheme({
    typography: {
      fontFamily: 'Open Sans'
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div id='home'></div>
      <AppBar position='static' color='default'>

        <Container fixed>
          <Toolbar disableGutters >
            <CssBaseline />
            <Box component='div' sx={{ display: { xs: 'none', md: 'flex' }, mr: 5 }}>
              <Link to='/'>
                <h1>LOGO</h1>
              </Link>
            </Box>
            <Box component='div' sx={{ fontFamily: 'Open Sans', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to='/products' style={pageStyle}>assets</Link>
            </Box>
            <Box component='div' sx={{ fontFamily: 'Open Sans', flexGrow: 0.5, display: { xs: 'none', md: 'flex' } }}>
              {!user && <><Link to='/login' style={logSignStyle}>login</Link>
                <Link to='/register' style={logSignStyle}>register</Link></>}
              <Link to='/basket' style={logSignStyle}>basket</Link>
            </Box>


            {user && <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{getLetters()}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                <MenuItem key='my 3D models' onClick={handleCloseUserMenu}>
                  <Link to="/mymodels">
                    <Typography textAlign="center">my 3D models</Typography>
                  </Link>

                </MenuItem>
                <MenuItem key='logout' onClick={() => { handleCloseUserMenu(), logout() }}>
                  <Typography textAlign="center">logout</Typography>
                </MenuItem>

              </Menu>
            </Box>}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default NavBar