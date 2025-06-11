import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import useAuthStore from "../stores/auth-store";

const CustomerLayout = () => {
  const { pathname } = useLocation();
  const { isAuthenticated, userType } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (isAuthenticated && userType == "owner") {
      navigate('/owner');
    }
  }, [isAuthenticated, userType]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;