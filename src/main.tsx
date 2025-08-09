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
import { SidebarProvider } from '@/components/ui/sidebar'
import Sidebar from '@/components/Sidebar'
import KakaoLogin from './pages/auth/login/kakao'
import AccidentAdd from './pages/management/accident/add'
import EtcAdd from './pages/management/etc/add'
import FuelAdd from './pages/management/fuel/add'
import InstallmentAdd from './pages/management/installment/add'
import InsuranceDutyAdd from './pages/management/insurance-duty/add'
import MaintenanceHistoryAdd from './pages/management/maintenance-history/add'
import ParkingFeeAdd from './pages/management/parking-fee/add'
import { SessionProvider } from './contexts/SessionContext'
import ManagementLayout from './pages/management/layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SelectedCarProvider } from './contexts/SelectedCarContext'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <SidebarProvider>
            <SelectedCarProvider>
              <Header />
              <Sidebar />
              <div className='w-full mt-14'>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/auth/login/kakao" element={<KakaoLogin />} />
                  <Route path="/my" element={<My />} />
                  <Route path="/my/cars" element={<Cars />} />
                  <Route path="/my/cars/:id" element={<Car />} />
                  <Route path="management" element={<ManagementLayout />}>
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
                    <Route path="/management/accident/add" element={<AccidentAdd />} />
                    <Route path="/management/etc/add" element={<EtcAdd />} />
                    <Route path="/management/fuel/add" element={<FuelAdd />} />
                    <Route path="/management/installment/add" element={<InstallmentAdd />} />
                    <Route path="/management/insurance-duty/add" element={<InsuranceDutyAdd />} />
                    <Route path="/management/maintenance-history/add" element={<MaintenanceHistoryAdd />} />
                    <Route path="/management/parking-fee/add" element={<ParkingFeeAdd />} />
                  </Route>
                </Routes>
              </div>
            </SelectedCarProvider>
          </SidebarProvider>
        </SessionProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
