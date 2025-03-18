import React from 'react'
import { logout } from '@/src/lib/api/auth'
import { toast } from 'sonner';
import useAuthStore from '@/src/stores/auth-store';

const Logout = ({ children, className }) => {
    const { setUser, setAuthStatus } = useAuthStore();
    const onLogout = async () => {
        const { success, error, message } = await logout();

        error && toast.error(message, { position: 'top-center' });

        if (success) {
            setAuthStatus(false);
            setUser(null);
            toast.success(message, { position: 'top-center' });
        }
    }

  return (
    <div className={className} onClick={onLogout}>
      { children }
    </div>
  )
}

export default Logout
