import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import EditProfileForm from './EditProfileForm';

const EditProfileDialog = ({ children, userData, onProfileUpdate }) => {
  const [open, setOpen] = useState(false);
  
  const handleSuccess = (updatedData) => {
    if (onProfileUpdate) {
      onProfileUpdate(updatedData);
    }
    
    setOpen(false);
  };
  
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogTitle className="text-3xl font-bold text-center mt-6 rubik-bold">
          EDIT <span className='!text-primary'>PROFILE</span>
        </DialogTitle>
        <DialogDescription className="text-center text-gray-600 inter-regular mb-4">
          Update your profile information
        </DialogDescription>
        
        <EditProfileForm 
          userData={userData} 
          onSuccess={handleSuccess} 
          onCancel={handleCancel} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;