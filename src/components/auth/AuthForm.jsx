import React from 'react'
import Signup from './form/Signup'
import Login from './form/Login'
import { login, register } from '@/src/lib/api/auth'
import { toast } from 'sonner'
import useAuthStore from '@/src/stores/auth-store'

const AuthForm = ({ isSignUp, setIsSignUp, isOwner }) => {
    const { setAuth } = useAuthStore();

    const onSuccess = (user) => {
        if (!user) return;
        setAuth(true, user, isOwner ? 'owner' : 'customer');
        toast.success('Logged in successfully', { position: 'top-center' });
    }

    const onLogin = async (formData) => {
        const { success, error, message, user } = await login(isOwner, formData.email, formData.password);

        error && toast.error(message, { position: 'top-center' });

        if (success) onSuccess(user);
    }

    const onRegister = async (formData) => {
        const { success, error, message, user } = await register(isOwner, formData.email, formData.password,
            formData.fname, formData.lname);

        error && toast.error(message, { position: 'top-center' });

        if (success) onSuccess(user);
    }

    return (
        isSignUp
            ? <Signup onSignIn={() => setIsSignUp(false)} onSubmit={onRegister} isOwner={isOwner} />
            : <Login onSignUp={() => setIsSignUp(true)} onSubmit={onLogin} />
    )
}

export default AuthForm
