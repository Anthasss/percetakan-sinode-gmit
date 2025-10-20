import './App.css'
import Layout from './navigation/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
