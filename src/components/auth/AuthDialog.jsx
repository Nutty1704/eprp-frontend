import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState, useEffect } from 'react'
import Auth from './Auth'
import useAuthStore from '@/src/stores/auth-store';
import { DialogDescription } from '@radix-ui/react-dialog';

const AuthDialog = ({ children, allowClose = true, requiredRole, ...props }) => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, userType, isAuthenticatedAs } = useAuthStore();
  
  useEffect(() => {
    if (open) {
      let shouldClose = false
      
      if (allowClose) {
        return;
      } else {
        if (requiredRole) {
          shouldClose = isAuthenticatedAs(requiredRole)
        } else {
          shouldClose = isAuthenticated
        }
      }
      
      if (shouldClose) {
        setOpen(false)
      }
    }
  }, [isAuthenticated, userType, open, allowClose, requiredRole, isAuthenticatedAs])
  
  // Handle the forced dialog state
  const handleOpenChange = (newOpenState) => {
    if (!newOpenState && !allowClose) {
      if (requiredRole) {
        if (!isAuthenticatedAs(requiredRole)) {
          return
        }
      } else if (!isAuthenticated) {
        return
      }
    }
    
    setOpen(newOpenState)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>

      <DialogContent
        className="max-w-[90vw] fixed lg:max-w-4xl md:min-w-[70vw] max-h-[80vh] lg:max-h-[95vh] my-auto bg-white shadow-lg rounded-2xl overflow-hidden flex p-0"
        closeIconClass={`lg:text-white ${!allowClose && !isAuthenticated ? 'hidden' : ''}`}
      >
        <DialogDescription className="sr-only">
          {allowClose ? 'Click outside to close' : 'You must be logged in to access this page'}
        </DialogDescription>
        <DialogTitle className="sr-only">Authentication form</DialogTitle>
        <Auth 
          {...props} 
          requiredRole={requiredRole}
          disableCloseButton={!allowClose && !isAuthenticated}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog