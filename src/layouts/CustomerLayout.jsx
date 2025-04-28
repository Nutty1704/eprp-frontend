import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/ui/Header";

const CustomerLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      {/* <footer className="h-16 bg-gray-200"></footer> */}
    </div>
  );
};

export default CustomerLayout;