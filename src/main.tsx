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
import Header from '@/organisms/Header'
import MaintenanceHistoryId from '@/pages/management/maintenance-history/id'
import AccidentId from '@/pages/management/accident/id'
import EtcId from '@/pages/management/etc/id'
import FuelId from '@/pages/management/fuel/id'
import InstallmentId from '@/pages/management/installment/id'
import InsuranceDutyId from '@/pages/management/insurance-duty/id'
import ParkingFeeId from '@/pages/management/parking-fee/id'
// import { SidebarProvider } from '@/components/ui/sidebar'
// import Sidebar from './components/Sidebar'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <SidebarProvider> */}
        <Header />
        {/* <Sidebar /> */}
        <div className='mt-14'>
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
            <Route path="/management/maintenance-history/:id" element={<MaintenanceHistoryId />} />
            <Route path="/management/accident/:id" element={<AccidentId />} />
            <Route path="/management/etc/:id" element={<EtcId />} />
            <Route path="/management/fuel/:id" element={<FuelId />} />
            <Route path="/management/installment/:id" element={<InstallmentId />} />
            <Route path="/management/insurance-duty/:id" element={<InsuranceDutyId />} />
            <Route path="/management/parking-fee/:id" element={<ParkingFeeId />} />
          </Routes>
        </div>
      {/* </SidebarProvider> */}
    </BrowserRouter>
  </StrictMode>
)
