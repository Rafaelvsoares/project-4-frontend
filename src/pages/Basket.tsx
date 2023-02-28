import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import axios from "axios";
import React from "react"
import { baseUrl } from "../config";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function Basket() {
  const [open, setOpen] = React.useState(false)
  const [basket, setBasket] = React.useState(null)
  const token = localStorage.getItem('token')


  async function getBasket() {
    const req = await fetch(`${baseUrl}/basket/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await req.json()
    setBasket(data)
  }

  React.useEffect(() => {
    getBasket()
  }, [])

  function handleOpen() {
    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
  }

  console.log(basket)

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Shopping Cart
          </Typography>
          <Grid container>
            <Grid item>

            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default Basket