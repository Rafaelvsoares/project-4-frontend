import { TextField, Container, Grid, Typography, Box, ThemeProvider, CssBaseline, Button, createTheme, FormControl, InputLabel, OutlinedInput, InputAdornment, Select, MenuItem, SelectChangeEvent } from '@mui/material'
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


function MyModels() {

  const navigate = useNavigate()
  const [category, setCategory] = React.useState('')
  const [formData, setFormData] = React.useState({
    title: "",
    price: 0,
    polygons: "",
    description: "",
    category_id: "",
    images: []
  })

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/products`, formData)
    } catch (err: any) {
      console.log(err.response.data.errors)
      return
    }
    navigate('/')
  }

  function handleChange(e: any) {
    const newFormData = structuredClone(formData)
    newFormData[e.target.name] = e.target.value
    setFormData(newFormData)
  }

  function handleCategoryChange(event: SelectChangeEvent) {
    setCategory(event.target.value as string)
  }

  console.log(formData)
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
            Create your product
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={6} lg={6}>
                <TextField required fullWidth label='Title' name='title' type='name' id='name' autoComplete='title' onChange={handleChange} autoFocus />
              </Grid>
              <Grid item xs={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount" >Price</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    type="number"
                    startAdornment={<InputAdornment position="start">£</InputAdornment>}
                    label="Amount"
                    name="price"
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField required fullWidth label='3D file' name='3D file' type='name' id='name' autoComplete='3D file' onChange={handleChange} />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField required fullWidth label='Description' name='description' type='name' id='description' autoComplete='description' multiline rows={4} maxRows={6} />
              </Grid>
              <Grid item xs={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-select">Category</InputLabel>
                  <Select
                    labelId="category-select"
                    id="category-select"
                    value={category}
                    label="Category"
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value={1}>Characters</MenuItem>
                    <MenuItem value={2}>Vehicles</MenuItem>
                    <MenuItem value={3}>Furniture</MenuItem>
                    <MenuItem value={4}>Props</MenuItem>
                    <MenuItem value={5}>Environments</MenuItem>
                    <MenuItem value={6}>Buildings</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} lg={6}>
                <FormControl fullWidth>
                  <TextField required fullWidth label='Polygons' name='polygons' type='name' id='name' autoComplete='Polygons' onChange={handleChange}></TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 2, mb: 2 }}>
                  Post
                </Button>
              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )

}

export default MyModels