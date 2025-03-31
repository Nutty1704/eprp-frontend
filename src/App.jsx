import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import OwnerDashboard from './components/admin/OwnerDashboard.jsx'

function App() {
  return (
    <>
      <Toaster
        expand
        position='bottom-right'
        richColors
      />
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route path='/owner' element={<OwnerDashboard />} />
      </Routes>
    </>
  )
}

export default App
