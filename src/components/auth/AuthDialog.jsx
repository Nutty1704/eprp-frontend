import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import Auth from './Auth'

const AuthDialog = ({ children, ...props }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent
        className="max-w-[90vw] fixed lg:max-w-4xl md:min-w-[70vw] max-h-[80vh] lg:max-h-[95vh] my-auto bg-white shadow-lg rounded-2xl overflow-hidden flex p-0"
        closeIconClass='lg:text-white'
      >
        <DialogTitle className="sr-only">Authentication form</DialogTitle>
        <Auth {...props} />
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog
