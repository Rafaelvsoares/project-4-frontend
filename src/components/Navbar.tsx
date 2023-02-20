import React from 'react';
import { AppBar, Box, Toolbar, Container, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

function NavBar() {

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
              <Link to='/login' style={logSignStyle}>login</Link>
              <Link to='/register' style={logSignStyle}>signup</Link>
              <Link to='/basket' style={logSignStyle}>basket</Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default NavBar