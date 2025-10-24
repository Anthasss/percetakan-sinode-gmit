import './App.css'
import Layout from './navigation/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
