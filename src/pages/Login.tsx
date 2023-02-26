import { TextField, Container, Grid, Typography, Box, ThemeProvider, CssBaseline, Button, createTheme } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import { baseUrl } from '../config'

const theme = createTheme({
  palette: {
    primary: {
      main: '#d216'
    },
  },
  typography: {
    fontFamily: 'Open Sans',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: '100vh'
        }
      }
    }
  }
})

function Login({ fetchUser } : { fetchUser: Function }) {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  })

  const [errorData, setErrorData] = React.useState({
    email: "",
    password: ""
  })

  async function handleSubmit(e: React.SyntheticEvent){
    e.preventDefault()
    try {
      const { data } =  await axios.post(`${baseUrl}/login`, formData)
      const token: string = data.token
      localStorage.setItem('token', token)
      fetchUser()
    } catch(err: any){
      console.log(err.response.data.errors)
      return
    }
    navigate('/')
  }

  function handleChange(e: any){
    const newFormData = structuredClone(formData)
    newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component='main' maxWidth='xs' sx={{ height: '60vh' }}>
        <Box component='div'
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5' fontFamily='Open Sans'>
            Login
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField required fullWidth label='Email Address' name='email' type='email' id='email' autoComplete='email' onChange={handleChange} autoFocus/>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label='Password' name='password' type='password' id='password' autoComplete='password' onChange={handleChange}/>
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 2, mb: 2 }}>
              Login
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link to='/register'>
                  No Account? Register now
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

  )
}

export default Login

