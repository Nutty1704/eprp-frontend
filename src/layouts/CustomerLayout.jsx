import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header";

const CustomerLayout = () => {
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