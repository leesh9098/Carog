import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@/pages'
import Login from '@/pages/login'
import My from '@/pages/my'
import Cars from '@/pages/my/cars'
import Car from '@/pages/my/cars/car'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my" element={<My />} />
        <Route path="/my/cars" element={<Cars />} />
        <Route path="/my/cars/:id" element={<Car />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
