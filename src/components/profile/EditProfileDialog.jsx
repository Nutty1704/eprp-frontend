import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Upload, Trash2, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { updateCustomer } from '@/src/lib/api/user';
import { toast } from 'sonner';

const EditProfileDialog = ({ children, userData, onProfileUpdate }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    bio: userData?.bio || '',
    email: userData?.email || '',
  });
  const [previewImage, setPreviewImage] = useState(userData?.profile_image || null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [removeProfileImage, setRemoveProfileImage] = useState(false);

  // Reset form data when dialog opens with the latest userData
  const handleOpenChange = (isOpen) => {
    if (isOpen) {
      setFormData({
        name: userData?.name || '',
        bio: userData?.bio || '',
        email: userData?.email || '',
      });
      setPreviewImage(userData?.profile_image || null);
      setSelectedImage(null);
      setRemoveProfileImage(false);
    }
    setOpen(isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setSelectedImage(file);
      setRemoveProfileImage(false);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setSelectedImage(null);
    // If user had a profile image before, mark it for removal
    if (userData?.profile_image) {
      setRemoveProfileImage(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create FormData object to send to backend
      const formDataToSend = new FormData();
      
      // Append all text fields (even if unchanged)
      // This matches the pattern in BusinessProfilePage
      formDataToSend.append('name', formData.name);
      formDataToSend.append('bio', formData.bio);
      
      // Handle profile image changes
      if (selectedImage instanceof File) {
        formDataToSend.append('profile_image', selectedImage);
      }
      
      // Handle profile image removal
      if (removeProfileImage) {
        formDataToSend.append('removeProfileImage', 'true');
      }
      
      console.log("Data to be submitted:", {
        name: formData.name,
        bio: formData.bio,
        profile_image: selectedImage ? selectedImage.name : null,
        removeProfileImage
      });
      
      // Send the update request
      const response = await updateCustomer(formDataToSend);
      console.log("Profile updated successfully:", response);
      
      toast.success("Profile updated successfully");

      // Call the callback function to update parent component if provided
      if (onProfileUpdate && response.data) {
        onProfileUpdate(response.data);
      }
      
      // Close the dialog
      setOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile. Please try again."
      );
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogTitle className="text-3xl font-bold text-center mt-6 rubik-bold">
          EDIT <span className='!text-primary'>PROFILE</span>
        </DialogTitle>
        <DialogDescription className="text-center text-gray-600 inter-regular mb-4">
          Update your profile information
        </DialogDescription>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Profile Image */}
            <div className="flex flex-col pt-3 items-center md:w-1/3">
              <div className="bg-white rounded-full overflow-hidden h-36 w-36 shadow-md mb-4">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-2 pt-7 w-full">
                <label className="flex gap-2 items-center justify-center px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-md text-sm cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Upload Photo</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden" 
                  />
                </label>
                
                {previewImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="flex items-center gap-2 justify-center px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md text-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Right Column - Form Fields */}
            <div className="md:w-2/3 space-y-4">
              {/* Form Fields with Check Icons */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-gray-500 text-sm uppercase">Name</label>
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pr-2"
                      placeholder="Enter your name"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="email" className="text-gray-500 text-sm uppercase">Email</label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      className="pr-10 truncate"
                      readOnly
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bio Field - Editable */}
              <div className="flex flex-col py-3">
                <div className="text-gray-500 text-sm uppercase mb-2">Bio</div>
                <div className="relative">
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    maxLength={300}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                    {formData.bio?.length || 0}/300
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <div className="mt-6 flex justify-center">
            <Button
              type="submit"
              className="bg-primary hover:brightness-90 text-white w-full max-w-xs py-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;