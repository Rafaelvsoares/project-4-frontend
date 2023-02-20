import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/Navbar'
import Home from './pages/Home'
import Assets from './pages/Assets'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'
import Basket from './pages/Basket'

function App() {

  return (
    <Router>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Assets />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/basket" element={<Basket  />} />
        </Routes>
      </main>
      <footer style={{ marginTop: '10vh' }}>
        <Footer />
      </footer>
    </Router>
  )
}

export default App
