import { useFormContext } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import UploadImages from "@/src/components/form/UploadImages";
import { Info } from "lucide-react";
import { MAX_IMAGES } from "@/src/lib/business/schema";
import { useEffect, useState } from "react";

const ImageSection = ({ defaultImages = [] }) => {
  const { setValue, watch, getValues, formState: { errors } } = useFormContext();

  const newImages = watch("businessImages") || [];
  const existingImageUrls = watch("existingImageUrls") || [];

  const [displayImages, setDisplayImages] = useState([]);

  useEffect(() => {
    if (!existingImageUrls && defaultImages.length > 0) {
      setValue("existingImageUrls", defaultImages);
    }
  }, [existingImageUrls, defaultImages, setValue]);

  useEffect(() => {
    const existing = existingImageUrls ?? defaultImages;
    setDisplayImages([...existing, ...newImages]);
  }, [existingImageUrls, newImages, defaultImages]);

  const handleImagesChange = (updatedList) => {
    const currentExisting = getValues("existingImageUrls") || [];
  
    // Partition the updatedList into URLs and Files
    const updatedUrls = updatedList.filter((img) => typeof img === "string");
    const updatedFiles = updatedList.filter((img) => img instanceof File);
    const removedUrls = currentExisting.filter(url => !updatedUrls.includes(url));
  
    // Save updated values
    setValue("existingImageUrls", updatedUrls);
    setValue("businessImages", updatedFiles);
    setValue("removedImageUrls", removedUrls); 
  };

  return (
    <div className="space-y-4">
      <Alert className="mb-4 bg-blue-50 border-blue-200">
        <AlertDescription>
          Upload up to {MAX_IMAGES} high-quality images that showcase your business. Images should be less than 10MB each.
        </AlertDescription>
      </Alert>
      
      <div className="mt-2">
        <p className="text-sm text-gray-500 mb-4">
          These images will be displayed to customers browsing your business profile.
        </p>
        
        <UploadImages 
          maxImages={MAX_IMAGES}
          onChange={handleImagesChange}
          disabled={false}
          displayImages={displayImages}
        />
        
        {errors.images && (
          <div className="flex items-center mt-2 gap-2 text-red-500">
            <Info className="h-4 w-4" />
            <span className="text-xs font-medium">
              {errors.images.message || "Please upload valid images"}
            </span>
          </div>
        )}
        
        <div className="mt-4 text-xs text-gray-500">
          <p>• Images should be in JPEG or PNG format</p>
          <p>• Maximum file size: 10MB per image</p>
          <p>• Recommended resolution: at least 1000x750 pixels</p>
        </div>
      </div>
    </div>
  );
};

export default ImageSection;