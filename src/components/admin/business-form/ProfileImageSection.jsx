import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { Loader2 } from "lucide-react";

const ProfileImageSection = ({ imageUrl, imagePreview, imageDeleted, onImageChange, onDeleteImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { formState: { errors } } = useFormContext();
  
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // File validation
    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Maximum size is 10MB.");
      return;
    }
    
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Only JPEG and PNG files are allowed.");
      return;
    }
    
    setIsUploading(true);
    try {
      await onImageChange(e);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="pt-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-32 h-32 border rounded-md flex items-center justify-center overflow-hidden bg-gray-50">
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            ) : !imageDeleted && (imagePreview || imageUrl) ? (
              <img
                src={imagePreview || imageUrl}
                alt="Business Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-sm text-center p-2">
                No image
              </div>
            )}
          </div>
          
          <div className="flex-1 mt-4 sm:mt-0 text-center sm:text-left">
            <h3 className="font-medium mb-1">Profile picture</h3>
            <p className="text-sm text-gray-500 mb-3">PNG, JPEG under 10MB</p>
            { errors.profileImage && (
              <p className="text-red-500 text-sm mb-2">{errors.profileImage.message}</p>
            )}
            
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <Button 
                type="button"
                variant="secondary" 
                className="bg-red-50 text-red-600 hover:bg-red-100"
                onClick={() => {
                  const fileInput = document.getElementById('profile-image-upload');
                  fileInput.click();
                }}
                disabled={isUploading}
                aria-label="Upload new profile picture"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload new picture"
                )}
              </Button>
              
              <Button 
                type="button"
                variant="destructive" 
                onClick={onDeleteImage}
                disabled={(!imageUrl && !imagePreview) || isUploading}
                aria-label="Delete profile picture"
              >
                Delete
              </Button>
              
              <input
                id="profile-image-upload"
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            {errors.images && (
              <p className="text-red-500 text-sm mt-2">{errors.images.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageSection;