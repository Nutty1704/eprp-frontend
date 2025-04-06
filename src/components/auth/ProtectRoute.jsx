import useAuthStore from '@/src/stores/auth-store';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProtectRoute = ({ children, role='customer' }) => {
    const { isAuthenticated, user } = useAuthStore();
    const navigate = useNavigate();

    if (!isAuthenticated || !user || !user.roles[role]) {
        toast.error("You are not authorized to access this page.", { position: 'top-center' });
        navigate('/');
    }


  return (
    <>
        { children }
    </>
  )
}

export default ProtectRoute
