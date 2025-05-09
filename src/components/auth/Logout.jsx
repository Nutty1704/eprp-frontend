import React from 'react'
import { logout } from '@/src/lib/api/auth'
import { toast } from 'sonner';
import useAuthStore from '@/src/stores/auth-store';
import { useNavigate } from 'react-router-dom';

const Logout = ({ children, className, redirect }) => {
    const { logout: localLogout } = useAuthStore();
    const navigate = useNavigate();
    const onLogout = async () => {
        const { success, error, message } = await logout();

        error && toast.error(message, { position: 'top-center' });

        if (success) {
            localLogout();
            toast.success(message, { position: 'top-center' });

            if (redirect) navigate(redirect);
        }
    }

  return (
    <div className={className} onClick={onLogout}>
      { children }
    </div>
  )
}

export default Logout
