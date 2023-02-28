import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/Navbar'
import Home from './pages/Home'
import Assets from './pages/Assets'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'
import Basket from './pages/Basket'
import axios from 'axios'
import { baseUrl } from './config'
import MyModels from './pages/MyModels'
import CreateProduct from './pages/CreateProduct'
import UploadImage from './components/UploadImage'

function App() {
  const [user, setUser] = React.useState(null)

  async function fetchUser(){
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${baseUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setUser(data)
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) fetchUser()
  }, [])
  
  console.log(user)

  return (
    <Router>
      <header>
        <NavBar user={user} setUser={setUser}/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Assets />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login  fetchUser={fetchUser}/>} />
          <Route path="/basket" element={<Basket />} />
          {user && <>
          <Route path="/mymodels" element={<MyModels />} />
          <Route path="/mymodels/create" element={<CreateProduct user={user}/>}/>
          </>}
        </Routes>
      </main>
      <footer style={{ marginTop: '10vh' }}>
        <Footer />
      </footer>
    </Router>
  )
}

export default App
