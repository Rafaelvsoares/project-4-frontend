import { TextField, Container, Grid, Typography, Box, ThemeProvider, CssBaseline, Button, createTheme, FormControl, InputLabel, OutlinedInput, InputAdornment, Select, MenuItem, SelectChangeEvent, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Chip } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import { baseUrl } from '../config'
import DeleteIcon from '@mui/icons-material/Delete'

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

const createButtonStyle = {
  margin: '1rem',
  padding: '0.1rem 1.5rem',
  border: '0.5px solid grey',
  borderRadius: 6,
  color: 'white',
  backgroundColor: '#426da2',
  textDecoration: 'none'
}

function MyModels() {

  const [myProducts, setMyProducts] = React.useState<any>(null)
  const [checked, setChecked] = React.useState<any>(false)
  const [selectedProducts, setSelectedProducts] = React.useState<any>([])
  const token = localStorage.getItem('token')

  async function getProducts() {
    const req = await fetch(`${baseUrl}/products/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await req.json()
    setMyProducts(data)
  }

  React.useEffect(() => {
    getProducts()
  }, [])


  async function handleDelete() {
    await Promise.all(
      selectedProducts.map(async (product: any) => {
        const { req }: any = await axios.delete(`${baseUrl}/products/${product.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      })
    )
    console.log(selectedProducts)
    setSelectedProducts([])
    await getProducts()
  }

function handleSelectAll() {
  if (checked) {
    setSelectedProducts([]);
  } else {
    setSelectedProducts(myProducts);
  }
  setChecked(!checked);
}

function handleSelectRow(product: any) {
  const index = selectedProducts.findIndex((p: any) => p.id === product.id);
  if (index !== -1) {
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts.splice(index, 1);
    setSelectedProducts(newSelectedProducts);
  } else {
    setSelectedProducts([...selectedProducts, product]);
  }
}


if (!myProducts) {
  return <h1>Loading</h1>
}

return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container fixed>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Link to='/mymodels/create' style={createButtonStyle}>create product</Link>
        </Grid>
        {myProducts.length !== 0 && <Grid item>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                {selectedProducts.length !== 0 && <TableRow>
                  <TableCell align="right">
                    <Chip label="delete" color="warning" onDelete={handleDelete} deleteIcon={<DeleteIcon />} variant="outlined" />
                  </TableCell>
                </TableRow>}
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={selectedProducts.length === myProducts.length} onClick={handleSelectAll} />
                  </TableCell>
                  <TableCell align="right">Id</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Images</TableCell>
                  <TableCell align="right">Polygons</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myProducts.map((row: any) => (
                  <TableRow
                    key={row.title}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={selectedProducts.some((p: any) => p.id === row.id)}
                        onClick={() => handleSelectRow(row)}
                      />
                    </TableCell>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.images.length}</TableCell>
                    <TableCell align="right">{row.polygons}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>}
      </Grid>

    </Container>
  </ThemeProvider>
)

}

export default MyModels