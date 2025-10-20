import './App.css'
import Layout from './navigation/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<div className="w-full h-screen grid place-items-center"><h1>Hello World</h1></div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
