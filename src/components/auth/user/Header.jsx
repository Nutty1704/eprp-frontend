import React from 'react';
import { Link } from 'react-router-dom';
import AuthDialog from '../AuthDialog';
import Logout from '../Logout';
import { Button } from '@/components/ui/button';

const Header = ({ isAuthenticated }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className=" mx-auto px-4 sm:px-6 ">
        <div className="flex justify-between h-16 items-center">
          <div>
            <Link to="/" className="flex items-center">
                <div className="border border-black w-40 h-10 flex items-center justify-center m-6">
                    <span className="font-serif">T M</span>
                </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-900 hover:text-red-600 px-3 py-2 font-medium">
              Home
            </Link>
            <Link to="/review" className="text-gray-900 hover:text-red-600 px-3 py-2 font-medium">
              Make A Review
            </Link>
            
            {isAuthenticated ? (
              <Logout>
                <Button className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded">
                  Sign Out
                </Button>
              </Logout>
            ) : (
              <AuthDialog>
                <Button className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded">
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