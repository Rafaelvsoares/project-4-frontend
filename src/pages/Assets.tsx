import { Container, CssBaseline, Grid } from "@mui/material"
import React from "react"
import ProductCard from "../components/ProductCard"
import { baseUrl } from "../config"


function Assets() {
  const [assets, setAssets] = React.useState<any>()

  React.useEffect(() => {
    async function getProducts() {
      const req = await fetch(`${baseUrl}/products`)
      const data = await req.json()
      setAssets(data)
    }
    getProducts()
  },[])

  if(!assets){
    return <h1>Loading</h1>
  }
  console.log(assets)
  return (
    <>
      <CssBaseline />
      <Container fixed sx={{mt: '10px'}}>
        <Grid container spacing={4} direction='row'>
          {assets.map((product: any) => {
            return (
            <Grid item xs={12} lg={3} md={4} key={product.id}>
              <ProductCard 
              {...product}
              />
            </Grid>
          )})}
        </Grid>
      </Container>
    </>
  )
}

export default Assets

