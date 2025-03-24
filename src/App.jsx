import React from 'react'
import { Toaster } from 'sonner'
import AppRoutes from './AppRouter'

function App() {
  return (
    <>
      <Toaster
        expand
        position='bottom-right'
        richColors
      />
      <AppRoutes/>
    </>
  )
}

export default App
