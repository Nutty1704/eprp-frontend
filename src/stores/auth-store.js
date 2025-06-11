// import { create } from 'zustand'
// import { getAuthStatus } from '../lib/api/auth'

// const useAuthStore = create((set) => ({
//     isAuthenticated: false,
//     user: null,
//     checkAuthStatus: async (role) => {
//         const { error, isAuthenticated, user} = await getAuthStatus(role);
//         if (!error) set({ isAuthenticated, user });
//     }, // check if server has an active session for the user
//     setAuthStatus: (status) => {
//         set({ isAuthenticated: status });
//     },
//     setUser: (user) => {
//         set({ user });
//     }
// }));

// export default useAuthStore;



import { create } from 'zustand'
import { getAuthStatus } from '../lib/api/auth'

const useAuthStore = create((set, get) => ({
    // Authentication state
    isAuthenticated: false,
    user: null,
    userType: null,
    
    // Check auth status with the server
    checkAuthStatus: async (role) => {
        try {
            const { error, isAuthenticated, user } = await getAuthStatus(role);
            
            if (!error && isAuthenticated) {
                set({ 
                    isAuthenticated, 
                    user,
                    userType: role
                });
                return { isAuthenticated, userType: role };
            } else {
                // Not authenticated for this role
                if (role === get().userType) {
                    // Only clear if checking the current userType
                    set({ 
                        isAuthenticated: false, 
                        user: null,
                        userType: null
                    });
                }
                return { isAuthenticated: false, userType: null };
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            return { isAuthenticated: false, userType: null };
        }
    },
    
    // Check if user is authenticated as specific role
    isAuthenticatedAs: (role) => {
        return get().isAuthenticated && get().userType === role;
    },
    
    // Set authentication status after login/logout
    setAuth: (status, user = null, userType = null) => {
        set({ 
            isAuthenticated: status,
            user,
            userType
        });
    },
    
    // Login success handler - stores user and userType
    loginSuccess: (user, userType) => {
        set({
            isAuthenticated: true,
            user,
            userType
        });
    },
    
    // Logout handler
    logout: () => {
        set({
            isAuthenticated: false,
            user: null,
            userType: null
        });
    }
}));

export default useAuthStore;