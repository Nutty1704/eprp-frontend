import React from 'react';
import { Link } from 'react-router-dom';
import AuthDialog from '@/src/components/auth/AuthDialog';
import Logout from '@/src/components/auth/Logout';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/src/stores/auth-store';
import Logo from './Logo';

const Header = ({ isOwner = false }) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className=" mx-auto px-4 sm:px-6 ">
        <div className="flex justify-between h-16 xl:h-24 items-center">
          <div>
            <Link to="/" className="flex items-center">
              <Logo className="h-16 xl:h-24 w-auto" theme='light' />
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-900 hover:text-red-600 px-3 py-2 font-medium text-base xl:text-xl">
              Home
            </Link>
            

            {isAuthenticated ? (
              <Link to="/profile" className="text-gray-900 hover:text-red-600 px-3 py-2 font-medium text-base xl:text-xl">
                Profile
              </Link>
            ) : (
              <></>
            )}
            
            {isAuthenticated ? (
              <Logout redirect={isOwner ? '/owner' : '/'}>
                <Button className="bg-primary hover:brightness-90 text-primary-foreground px-4 py-2 xl:px-5 xl:py-6 rounded text-base xl:text-xl">
                  Logout
                </Button>
              </Logout>
            ) : (
              <AuthDialog isOwner={isOwner}>
                <Button className="bg-primary hover:brightness-90 text-primary-foreground px-4 py-2 xl:px-5 xl:py-6 rounded text-base xl:text-xl">
                  Sign In
                </Button>
              </AuthDialog>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;