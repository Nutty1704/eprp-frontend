import { create } from 'zustand'
import { getAuthStatus } from '../lib/api/auth'

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,
    checkAuthStatus: async (role) => {
        const { error, isAuthenticated, user} = await getAuthStatus(role);
        if (!error) set({ isAuthenticated, user });
    }, // check if server has an active session for the user
    setAuthStatus: (status) => {
        set({ isAuthenticated: status });
    },
    setUser: (user) => {
        set({ user });
    }
}));

export default useAuthStore;