import React from 'react';
import { Button, CssBaseline, TextField, Grid, Box, Typography, Container, createTheme, ThemeProvider } from '@mui/material'
import { Link, Navigate, useNavigate } from "react-router-dom"
import axios from 'axios';
import { baseUrl } from '../config';


const theme = createTheme({
  palette: {
    primary: {
      main: '#d216'
    },
  },
  typography: {
    fontFamily: 'Open Sans'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
        }
      }
    }
  }
})

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: ""
  })

  const [errorData, setErrorData] = React.useState({
    username: "",
    email: "",
    password: ""
  })

  async function handleSubmit(e: React.SyntheticEvent){
    e.preventDefault()
    try {
      await axios.post(`${baseUrl}/signup`, formData)
    } catch(err: any){
      console.log(err.response.data.errors)
      return
    }
    navigate('/login')
  }

  function handleChange(e: any){
    const newFormData = structuredClone(formData)
    newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs' sx={{ height: '60vh' }}>
        <CssBaseline />
        <Box component='div'
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField label='Username' name='username' type='username' id='username' autoComplete='username' onChange={handleChange} required fullWidth autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label='Email Address' name='email' type='email' id='email' autoComplete='email' onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label='Password' name='password' type='password' id='password' autoComplete='password' onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 2, mb: 2 }} >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link to="/login">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Register