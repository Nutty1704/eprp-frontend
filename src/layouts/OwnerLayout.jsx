import React, { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import useAuthStore from "../stores/auth-store";
import { toast } from "sonner";
import AuthDialog from "../components/auth/AuthDialog";

const OwnerLayout = () => {
    const { pathname } = useLocation();
    const { isAuthenticated, userType, checkAuthStatus } = useAuthStore();
    const navigate = useNavigate();
    const authButtonRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Handle wrong user type
    useEffect(() => {
        if (isAuthenticated && userType !== "owner") {
            toast.error("Login in using owner account to access owner portal.", { position: 'top-center' });
            navigate("/");
        }
    }, [isAuthenticated, userType, navigate]);

    // Check authentication on mount
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                await checkAuthStatus('owner');
                
                // If not authenticated or wrong user type, click the auth button
                if (!isAuthenticated) {
                    authButtonRef.current?.click();
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                authButtonRef.current?.click();
            }
        };
        
        if (!isAuthenticated) {
            verifyAuth();
        }
    }, [checkAuthStatus, isAuthenticated]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header isOwner={true} />

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Hidden auth dialog trigger */}
            <div className="hidden">
                <AuthDialog
                    isOwner={true}
                    allowClose={false}
                    requiredRole="owner"
                >
                    <button ref={authButtonRef}>Hidden Auth Trigger</button>
                </AuthDialog>
            </div>
        </div>
    );
};

export default OwnerLayout;