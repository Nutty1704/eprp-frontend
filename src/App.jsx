import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Dashboard from '@/src/pages/Dashboard'
import ReviewsPage from '@/src/pages/ReviewsPage'
import CustomerLayout from './layouts/CustomerLayout'
// import AppRoutes from './AppRouter'

function App() {
  return (
    <>
      <Toaster
        expand
        position='bottom-right'
        richColors
      />
      <Routes>
        <Route path="/" element={<CustomerLayout/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
