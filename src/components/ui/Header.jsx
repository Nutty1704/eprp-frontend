import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthDialog from '@/src/components/auth/AuthDialog';
import Logout from '@/src/components/auth/Logout';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/src/stores/auth-store';

// Placeholder for an icon library (e.g., Heroicons, react-icons)
// You would typically import these like: import { MenuIcon, XIcon } from '@heroicons/react/outline';
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const Header = ({ isOwner = false }) => {
  const { isAuthenticated } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Common link styles
  const linkStyles = "text-gray-900 hover:text-red-600 px-3 py-2 font-medium";
  const mobileLinkStyles = "block text-gray-900 hover:text-red-600 px-3 py-2 font-medium text-base";


  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center">
              <div className="border border-black w-40 h-10 flex items-center justify-center m-6">
                <span className="font-serif">T M</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!isOwner && (
              <>
                <Link to="/" className={linkStyles}>
                  Home
                </Link>
                {/* Note: Your original Profile link logic was duplicated. Simplified here. */}
                {/* Adjust as needed if /profile should always be visible or only if authenticated */}
                <Link to="/profile" className={linkStyles}>
                  Profile
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <Logout redirect={isOwner ? '/' : undefined}>
                <Button className="bg-primary hover:brightness-90 text-primary-foreground px-4 py-2 rounded">
                  Logout
                </Button>
              </Logout>
            ) : (
              <AuthDialog isOwner={isOwner}>
                <Button className="bg-primary hover:brightness-90 text-primary-foreground px-4 py-2 rounded">
                  Sign In
                </Button>
              </AuthDialog>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 p-2 transition transform origin-top-right z-40 bg-white shadow-lg ring-1 ring-black ring-opacity-5" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!isOwner && (
              <>
                <Link to="/" className={mobileLinkStyles} onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/profile" className={mobileLinkStyles} onClick={() => setIsMobileMenuOpen(false)}>
                  Profile
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-5">
              {isAuthenticated ? (
                <Logout redirect={isOwner ? '/' : undefined}>
                  <Button className="w-full bg-primary hover:brightness-90 text-primary-foreground px-4 py-2 rounded">
                    Logout
                  </Button>
                </Logout>
              ) : (
                <AuthDialog isOwner={isOwner}>
                   {/* We need a way to close the mobile menu when the dialog opens or after action */}
                   {/* For simplicity, the button itself will be full width */}
                  <Button className="w-full bg-primary hover:brightness-90 text-primary-foreground px-4 py-2 rounded" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Button>
                </AuthDialog>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;