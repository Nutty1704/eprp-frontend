import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const ProfileImageSection = ({ imageUrl, imagePreview, onImageChange, onDeleteImage }) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-32 h-32 border rounded-md flex items-center justify-center overflow-hidden bg-gray-50">
            {(imageUrl || imagePreview) ? (
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
            
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <Button 
                variant="secondary" 
                className="bg-red-50 text-red-600 hover:bg-red-100"
                onClick={() => {
                  const fileInput = document.getElementById('profile-image-upload');
                  fileInput.click();
                }}
              >
                Upload new picture
              </Button>
              
              <Button 
                variant="destructive" 
                onClick={onDeleteImage}
                disabled={!imageUrl && !imagePreview}
              >
                Delete
              </Button>
              
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImageChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileImageSection;