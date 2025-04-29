import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Import Carousel components
import { X } from "lucide-react";

/**
 * Component for uploading multiple business images using a horizontal carousel.
 */
const MultipleImageUploadSection = ({
  existingImages = [],
  onNewImagesChange,
  onDeleteExistingImage,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

  // Generate previews
  useEffect(() => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setPreviews([]);
      return;
    }
    const objectUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(objectUrls);
    return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
  }, [selectedFiles]);

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const updatedFiles = [...selectedFiles, ...files];
    setSelectedFiles(updatedFiles);
    onNewImagesChange(updatedFiles);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  // Remove a newly selected image preview
  const handleRemoveNewImage = (indexToRemove) => {
    URL.revokeObjectURL(previews[indexToRemove]);
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);
    onNewImagesChange(updatedFiles);
  };

  // Request deletion of an existing image
  const handleDeleteExistingImage = (imageUrl) => {
    onDeleteExistingImage(imageUrl);
  };

  // Helper function to render image items for the carousel
  const renderImageItem = (url, index, isExisting) => (
    <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-4">
      <div className="relative group aspect-video bg-muted rounded-md overflow-hidden"> 
        <img
          src={url}
          alt={`${isExisting ? 'Business Image' : 'New image preview'} ${index + 1}`}
          className="w-full h-full object-contain"
        />
        <Button
          type="button"
          variant={isExisting ? "destructive" : "secondary"}
          size="icon"
          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={() => isExisting ? handleDeleteExistingImage(url) : handleRemoveNewImage(index)}
          aria-label={isExisting ? "Delete existing image" : "Remove new image"}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </CarouselItem>
  );

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Business Images</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 pt-0">
        {/* Display Existing Images Carousel */}
        {existingImages.length > 0 && (
          <div>
            <Label className="mb-2 block">Current Images</Label>
            <Carousel
              opts={{
                align: "start",
                loop: false, // Don't loop existing images
              }}
              className="w-full" // Ensure carousel takes full width
            >
              <CarouselContent className="-ml-4"> {/* Negative margin to offset padding */}
                {existingImages.map((imageUrl, index) =>
                  renderImageItem(imageUrl, index, true) // true for existing
                )}
              </CarouselContent>
              {/* Show prev/next only if needed */}
              {existingImages.length > 5 && <CarouselPrevious type="button" className="absolute left-[-5px] top-1/2 -translate-y-1/2 z-10"/>}
              {existingImages.length > 5 && <CarouselNext type="button" className="absolute right-[-5px] top-1/2 -translate-y-1/2 z-10"/>}
            </Carousel>
          </div>
        )}

        {/* Display Previews of Newly Selected Images Carousel */}
        {previews.length > 0 && (
           <div>
             <Label className="mb-2 block">New Images to Upload</Label>
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {previews.map((previewUrl, index) =>
                    renderImageItem(previewUrl, index, false) // false for new
                  )}
                </CarouselContent>
                 {/* Show prev/next only if needed */}
                {previews.length > 5 && <CarouselPrevious type="button" className="absolute left-[-5px] top-1/2 -translate-y-1/2 z-10"/>}
                {previews.length > 5 && <CarouselNext type="button" className="absolute right-[-5px] top-1/2 -translate-y-1/2 z-10"/>}
              </Carousel>
           </div>
        )}

        {/* File Input */}
        <div className="grid gap-2 mt-4">
          <Label htmlFor="businessImages">Add More Images</Label>
          <Input
            id="businessImages"
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
           <p className="text-sm text-gray-500">You can select multiple images at once.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MultipleImageUploadSection;