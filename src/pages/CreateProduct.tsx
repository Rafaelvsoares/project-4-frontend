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


function CreateProduct({user} : any) {
  console.log(user)
  const navigate = useNavigate()
  const [price, setPrice] = React.useState('')
  const [polygons, setPolygons] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [formData, setFormData] = React.useState({
    title: "",
    price: 0,
    polygons: "",
    description: "",
    category_id: "",
    images: []
  })
  console.log(formData)
  console.log(category)
  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.post(`${baseUrl}/products`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data)
    } catch (err: any) {
      console.log(err.response.data.errors)
      return
    }
    navigate('/')
  }

  function handleData(e: any) {
    const newFormData = structuredClone(formData)
    newFormData[e.target.name] = e.target.value
    newFormData["price"] = parseFloat(newFormData["price"])
    newFormData["polygons"] = parseFloat(newFormData["polygons"])
    newFormData["images"] = ["image1test", "image2test"]
    setFormData(newFormData)
  }

  function handleChange(e: any) {
    if(e.target.name === 'price'){
      validateInput(e)
    } else if(e.target.name === 'category_id'){
      setCategory(e.target.value as string)
    }
    handleData(e)
  }

  function validateInput(e: any){
    const inputValue = e.target.value
    const numericValue = inputValue.replace(/[^0-9]/g, '')
    console.log(numericValue)
    setPrice(numericValue)
    setPolygons(numericValue)
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
            Create your product
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={6} lg={6}>
                <TextField required fullWidth label='Title' name='title' type='name' id='name' autoComplete='title' onChange={handleData} autoFocus />
              </Grid>
              <Grid item xs={6} lg={6}>
                <FormControl fullWidth>
                  <TextField required fullWidth label='Price' name='price' type='name' id='name' autoComplete='Price' value={price} onChange={handleChange} />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField required fullWidth label='3D file' name='3D file' type='name' id='name' autoComplete='3D file' onChange={handleData} />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField required fullWidth label='Description' name='description' type='name' id='description' autoComplete='description' multiline rows={4} onChange={handleData} />
              </Grid>
              <Grid item xs={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-select">Category</InputLabel>
                  <Select
                    labelId="category-select"
                    id="category-select"
                    value={category}
                    name="category_id"
                    label="Category"
                    onChange={handleChange}
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
                  <TextField required fullWidth label='Polygons' name='polygons' type='name' id='name' autoComplete='Polygons' value={polygons} onChange={handleChange}></TextField>
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

export default CreateProduct