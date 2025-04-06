import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './pages/auth/Home'
import useAuthStore from './stores/auth-store'
import ProtectRoute from './components/auth/ProtectRoute'
import CustomerLayout from './layouts/CustomerLayout'
import PostReview from './pages/review/PostReview'
import { Button } from '@/components/ui/button'

function App() {
  const { checkAuthStatus } = useAuthStore();
  useEffect(() => {
    checkAuthStatus('customer');
  }, []);

  return (
    <>
      <Toaster
        expand
        position='bottom-right'
        richColors
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/' element={<CustomerLayout />}>
          <Route path='/write-a-review/:businessId' element={
            <ProtectRoute>
              <PostReview />
            </ProtectRoute>
          } />
        </Route>
      </Routes>
    </>
  )
}

export default App
