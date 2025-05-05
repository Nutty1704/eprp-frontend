import AppRoutes from './AppRouter'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import useAuthStore from './stores/auth-store'
import { useNavigate } from 'react-router-dom';

function App() {
  const { checkAuthStatus, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuthStatus();
        if (!isAuthenticated) {
          await checkAuthStatus('owner');

          if (isAuthenticated) {
            navigate('/owner');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    verifyAuth();
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
