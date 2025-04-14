import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useGetMyBusiness, useUpdateMyBusiness, useCreateMyBusiness } from "../lib/api/MyBusinessApi";
import ProfileImageSection from "../components/ProfileImageSection";
import BusinessDetailsForm from "../components/business/BusinessDetailsForm";
import OpeningHoursSection from "../components/business/OpeningHoursSection";
import CuisineSelector from "../components/business/CuisineSelector";
import MenuPage from "../components/business/MenuPage";
import MultipleImageUploadSection from "../components/business/MultiImageUpload";

/**
 * Business Profile Management Page
 * Allows business owners to manage their profile information,
 * including basic details, logo, and operating hours.
 */
const BusinessProfilePage = () => {
  
  // Initialize with default opening hours structure
  const defaultOpeningHours = {
    mon: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
    tue: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
    wed: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
    thu: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
    fri: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
    sat: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
    sun: { isOpen: false, timeSlots: [] }
  };
  
  // State for business data
  const [business, setBusiness] = useState({
    businessName: "",
    description: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    imageUrl: "",
    images: [],
    openingHours: defaultOpeningHours,
    cuisines: []
  });
  
  // Get profile data
  const { business: businessData, isLoading: isLoadingBusiness, refetch } = useGetMyBusiness();
  const { updateBusiness, isLoading: isUpdating } = useUpdateMyBusiness();
  const { createBusiness, isLoading: isCreating } = useCreateMyBusiness();
  
  // State for profile image
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");

  // State for multiple business images
  const [newSelectedImages, setNewSelectedImages] = useState([]); // Files selected via MultipleImageUploadSection
  const [imagesToDelete, setImagesToDelete] = useState([]);
  
  // Load business data when available
  useEffect(() => {
    if (businessData) {
      const formattedData = {
        businessName: businessData.businessName || businessData.name || "",
        description: businessData.description || "",
        email: businessData.email || "",
        phone: businessData.phone || "",
        website: businessData.website || "",
        address: businessData.address || "",
        imageUrl: businessData.imageUrl || "",
        images: businessData.images || [],
        // Format opening hours properly, ensuring the structure matches our component
        openingHours: businessData.openingHours 
          ? Object.keys(defaultOpeningHours).reduce((acc, day) => {
              // Format existing data or use defaults
              acc[day] = {
                isOpen: businessData.openingHours[day]?.isOpen ?? defaultOpeningHours[day].isOpen,
                timeSlots: businessData.openingHours[day]?.timeSlots?.length 
                  ? businessData.openingHours[day].timeSlots
                  : defaultOpeningHours[day].timeSlots
              };
              return acc;
            }, {})
          : defaultOpeningHours,
        // Get cuisines array or default to empty array
        cuisines: businessData.cuisines || []
      };
      
      setBusiness(formattedData);
      setNewSelectedImages([]);
      setImagesToDelete([]);
      setSelectedProfileImage(null);
      setProfileImagePreview("");
    }
  }, [businessData]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusiness(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle opening hours changes - updated for nested timeSlots structure
  const handleHoursChange = (day, newDayData) => {
    setBusiness(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: newDayData
      }
    }));
  };
  
  // Handle cuisines change
  const handleCuisinesChange = (selectedCuisines) => {
    setBusiness(prev => ({
      ...prev,
      cuisines: selectedCuisines
    }));
  };
  
  // Handle profile image selection
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };;
  
  // Handle profile image deletion
  const handleDeleteProfileImage = () => {
    setBusiness(prev => ({
      ...prev,
      imageUrl: "" // Clear URL in state
    }));
    setSelectedProfileImage(null); // Clear selected file
    setProfileImagePreview("");    // Clear preview
    // Note: Actual deletion from storage happens on save if imageUrl is empty or a new image is uploaded
  };
  
  // Handle newly selected business images from child component
  const handleNewImagesChange = (files) => {
    setNewSelectedImages(files);
  };

  // Handle request to delete an existing business image from child component
  const handleDeleteExistingImageRequest = (imageUrl) => {
    // Add URL to the deletion list if not already there
    setImagesToDelete(prev => [...new Set([...prev, imageUrl])]);
    // Visually remove it from the displayed existing images in the parent state
    setBusiness(prev => ({
        ...prev,
        images: prev.images.filter(url => url !== imageUrl)
    }));
  };

  // Validate form before submission
  const validateForm = () => {
    if (!business.businessName) {
      toast.error("Business name required", {
        description: "Please enter a name for your business"
      });
      return false;
    }
    
    if (!business.address) {
      toast.error("Address required", {
        description: "Please enter your business address"
      });
      return false;
    }
    
    // Validate opening hours
    let hasInvalidTimeSlots = false;
    Object.keys(business.openingHours).forEach(day => {
      const dayData = business.openingHours[day];
      if (dayData.isOpen) {
        dayData.timeSlots.forEach(slot => {
          if (!slot.open || !slot.close) {
            hasInvalidTimeSlots = true;
          }
          
          const openTime = new Date(`2000-01-01T${slot.open}`);
          const closeTime = new Date(`2000-01-01T${slot.close}`);
          
          if (closeTime <= openTime) {
            hasInvalidTimeSlots = true;
          }
        });
      }
    });
    
    if (hasInvalidTimeSlots) {
      toast.error("Invalid opening hours", {
        description: "Please ensure closing times are after opening times"
      });
      return false;
    }
    
    return true;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const formData = new FormData();
    formData.append("businessName", business.businessName);
    formData.append("description", business.description);
    formData.append("email", business.email);
    formData.append("phone", business.phone);
    formData.append("website", business.website);
    formData.append("address", business.address);
    formData.append("openingHours", JSON.stringify(business.openingHours));
    
    // Add cuisines
    if (business.cuisines && business.cuisines.length > 0) {
      formData.append("cuisines", JSON.stringify(business.cuisines));
    }
    
    // Append profile image if a new one is selected
    if (selectedProfileImage) {
      formData.append("profile_image", selectedProfileImage);
    } else if (!business.imageUrl && businessData?.imageUrl) {
        // If the imageUrl was cleared in state AND there was an image before, signal deletion
        formData.append("delete_profile_image", "true"); // Signal to backend
    }

    // Append newly selected business images
    newSelectedImages.forEach((file) => {
      // Use the same field name for all images; backend (e.g., multer) handles arrays
      formData.append("images", file);
    });

    // Append list of existing image URLs to delete
    if (imagesToDelete.length > 0) {
      formData.append("imagesToDelete", JSON.stringify(imagesToDelete));
    }
    
    try {
      if (businessData) {
        // Update existing business
        await updateBusiness(formData, businessData._id);
        toast.success("Business updated", {
          description: "Your business information has been updated successfully"
        });
      } else {
        // Create new business
        await createBusiness(formData);
        toast.success("Business created", {
          description: "Your business has been created successfully"
        });
      }
      
      // Refresh data
      refetch();
    } catch (error) {
      toast.error("Error", {
        description: error.message || "There was an error saving your business information"
      });
    }
  };
  
  if (isLoadingBusiness) {
    return (
      <div className="container mx-auto py-6 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-md w-1/3 mx-auto mb-4"></div>
          <div className="h-64 bg-gray-200 rounded-md w-full mb-6"></div>
          <div className="h-32 bg-gray-200 rounded-md w-full"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6">
      <Tabs defaultValue="business-info">
        <TabsList className="w-full border-b overflow-hidden flex-nowrap justify-start sm:justify-center">
          <TabsTrigger value="business-info" className="flex-1">Business Information</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
          <TabsTrigger value="menu" className="flex-1">Menu</TabsTrigger>
        </TabsList>
        
        <TabsContent value="business-info" className="mt-6">
          <form onSubmit={handleSubmit}>
            <ProfileImageSection 
              imageUrl={business.imageUrl} 
              imagePreview={profileImagePreview}
              onImageChange={handleProfileImageChange}
              onDeleteImage={handleDeleteProfileImage}
            />
            
            <BusinessDetailsForm 
              business={business}
              onInputChange={handleInputChange}
            />

            <MultipleImageUploadSection
              existingImages={business.images} 
              onNewImagesChange={handleNewImagesChange} 
              onDeleteExistingImage={handleDeleteExistingImageRequest} 
            />
            
            <OpeningHoursSection 
              openingHours={business.openingHours}
              onHoursChange={handleHoursChange}
            />
            
            <div className="my-6">
              <CuisineSelector 
                selectedCuisines={business.cuisines}
                onChange={handleCuisinesChange}
              />
            </div>
            
            <div className="mt-6 flex justify-center sm:justify-end">
              <Button 
                type="submit" 
                className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                disabled={isUpdating || isCreating}
              >
                {isUpdating || isCreating 
                  ? "Saving..." 
                  : businessData 
                    ? "Save Changes" 
                    : "Create Business"
                }
              </Button>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="reviews">
          <div className="p-4 text-center">
            <h3 className="text-lg font-medium">Reviews Management Coming Soon</h3>
            <p className="text-gray-500 mt-2">This section will allow you to view and respond to customer reviews.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="menu">
          <MenuPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessProfilePage;