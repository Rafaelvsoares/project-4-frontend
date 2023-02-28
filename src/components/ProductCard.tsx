import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom';

function ProductCard({ title, price, images }: any) {
  console.log('here', images[0])
  return (
    <>
      <Card sx={{ maxWidth: 400, display: 'flex', flexDirection: 'column' }}>
        <Link to={``}>
          <CardMedia
            sx={{ height: 300 }}
            image={images[0].image_url}
          />
        </Link>
        <Box component='div' sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box component='div'>
            <CardContent>
              <Typography gutterBottom variant='h6' sx={{ height: 40 }}>
                {title}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                Price: £{String(price)}
              </Typography>
            </CardContent>
          </Box>
          <Box component='div' sx={{ flex: '1 0 auto' }}>
            <CardContent>
              <Button variant='outlined' size='small' onClick={() => { console.log('click') }} >add to cart</Button>
            </CardContent>
          </Box>
        </Box>

      </Card>
    </>
  )
}

export default ProductCard
