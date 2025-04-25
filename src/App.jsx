import AppRoutes from './AppRouter'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import useAuthStore from './stores/auth-store'

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
      <AppRoutes/>
    </>
  )
}

export default App
