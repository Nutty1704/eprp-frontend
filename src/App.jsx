import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Dashboard from './components/auth/user/Dashboard'
import ReviewsPage from './components/auth/user/ReviewsPage'
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
        <Route path="/" element={<Dashboard />} />
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>
    </>
  )
}

export default App
