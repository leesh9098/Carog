import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@/pages'
import Login from '@/pages/login'
import My from '@/pages/my'
import Cars from '@/pages/my/cars'
import Car from '@/pages/my/cars/car'
import MaintenanceHistory from '@/pages/management/maintenance-history'
import Fuel from '@/pages/management/fuel'
import InsuranceDuty from '@/pages/management/insurance-duty'
import Accident from '@/pages/management/accident'
import Installment from '@/pages/management/installment'
import Etc from '@/pages/management/etc'
import ParkingFee from '@/pages/management/parking-fee'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my" element={<My />} />
        <Route path="/my/cars" element={<Cars />} />
        <Route path="/my/cars/:id" element={<Car />} />
        <Route path="/management/maintenance-history" element={<MaintenanceHistory />} />
        <Route path="/management/fuel" element={<Fuel />} />
        <Route path="/management/insurance-duty" element={<InsuranceDuty />} />
        <Route path="/management/accident" element={<Accident />} />
        <Route path="/management/installment" element={<Installment />} />
        <Route path="/management/etc" element={<Etc />} />
        <Route path="/management/parking-fee" element={<ParkingFee />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
