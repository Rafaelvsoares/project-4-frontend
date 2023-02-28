import React from 'react';
import { AppBar, Box, Toolbar, Container, CssBaseline, Button, Avatar, Tooltip, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';


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


  const basketStyle: any = {
    display: 'flex',
    margin: '1rem',
  };

  const linkStyle: any = {
    textAlign: 'center',
    marginLeft: '1rem',
    textDecoration: 'none',
    color: 'white',
    fontSize: '18px'
  };

  const navbarStyle = {
    backgroundColor: '#55A5AA'
  };

  const buttonStyle: any = {
    color: 'white',
    textDecoration: 'none',
    textTransform: 'none'
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#557BAA',
      },
    },
    typography: {
      fontFamily: 'Open Sans',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <div id='home'></div>
      <AppBar position='static' style={navbarStyle}>

        <Container fixed>
          <Toolbar disableGutters >
            <CssBaseline />
            <Box component='div' sx={{ display: { xs: 'none', md: 'flex' }, mr: 5 }}>
              <Link to='/'>
                <img style={{ height: '40px', paddingTop: '10px' }} src={'https://res.cloudinary.com/dzjjvjjk2/image/upload/v1677580449/phom-navbar-purple_ka0m3g.png'} alt='logoImage' />
              </Link>
            </Box>
            <Box component='div' sx={{ fontFamily: 'Open Sans', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to='/products' style={linkStyle}>3D MODELS</Link>
            </Box>
            <Box component='div' sx={{ fontFamily: 'Open Sans', flexGrow: 0.5, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center' }}>
              {!user && <>
                <Button variant="contained" sx={{ margin: "1rem" }}><Link to='/login' style={buttonStyle}>login</Link></Button>
                <Button variant="contained" sx={{ margin: "1rem" }}><Link to='/register' style={buttonStyle}>register</Link></Button> </>}
            </Box>
            <Box component='div' sx={{ fontFamily: 'Open Sans', flexGrow: 0, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center' }}>
              <IconButton style={basketStyle}><Link to="basket"><ShoppingCartIcon fontSize='large' /></Link></IconButton>
            </Box>

            {user && <Box onMouseEnter={handleOpenUserMenu} onMouseLeave={handleCloseUserMenu} sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }}>
                <Avatar>{getLetters()}</Avatar>
              </IconButton>

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