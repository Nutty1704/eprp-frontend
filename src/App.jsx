import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Dashboard from './components/auth/dashboard/Dashboard'
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
      </Routes>
    </>
  )
}

export default App
