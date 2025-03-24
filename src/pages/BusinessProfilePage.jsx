import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Button } from "../components/ui/button";
import { useGetMyBusiness, useUpdateMyBusiness, useCreateMyBusiness } from "../api/MyBusinessApi";
import ProfileImageSection from "../components/ProfileImageSection";
import BusinessDetailsForm from "../components/business/BusinessDetailsForm";
import OpeningHoursSection from "../components/business/OpeningHoursSection";

/**
 * Business Profile Management Page
 * Allows business owners to manage their profile information,
 * including basic details, logo, and operating hours.
 */
const BusinessProfilePage = () => {
  // State for business data
  const [business, setBusiness] = useState({
    businessName: "",
    description: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    imageUrl: "",
    openingHours: {
      mon: { isOpen: true, open: "10:00", close: "20:00" },
      tue: { isOpen: true, open: "10:00", close: "20:00" },
      wed: { isOpen: true, open: "10:00", close: "20:00" },
      thu: { isOpen: true, open: "10:00", close: "20:00" },
      fri: { isOpen: true, open: "10:00", close: "20:00" },
      sat: { isOpen: true, open: "10:00", close: "20:00" },
      sun: { isOpen: false, open: "", close: "" }
    }
  });
  
  // Get profile data
  const { business: businessData, isLoading: isLoadingBusiness } = useGetMyBusiness();
  const { updateBusiness, isLoading: isUpdating } = useUpdateMyBusiness();
  const { createBusiness, isLoading: isCreating } = useCreateMyBusiness();
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  
  // Load business data when available
  useEffect(() => {
    if (businessData) {
      setBusiness({
        businessName: businessData.businessName || "",
        description: businessData.description || "",
        email: businessData.email || "",
        phone: businessData.phone || "",
        website: businessData.website || "",
        address: businessData.address || "",
        imageUrl: businessData.imageUrl || "",
        openingHours: businessData.openingHours || {
          mon: { isOpen: true, open: "10:00", close: "20:00" },
          tue: { isOpen: true, open: "10:00", close: "20:00" },
          wed: { isOpen: true, open: "10:00", close: "20:00" },
          thu: { isOpen: true, open: "10:00", close: "20:00" },
          fri: { isOpen: true, open: "10:00", close: "20:00" },
          sat: { isOpen: true, open: "10:00", close: "20:00" },
          sun: { isOpen: false, open: "", close: "" }
        }
      });
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
  
  // Handle opening hours changes
  const handleHoursChange = (day, field, value) => {
    setBusiness(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value
        }
      }
    }));
  };
  
  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  // Handle image deletion
  const handleDeleteImage = () => {
    setBusiness(prev => ({
      ...prev,
      imageUrl: ""
    }));
    setSelectedImage(null);
    setImagePreview("");
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("businessName", business.businessName);
    formData.append("description", business.description);
    formData.append("email", business.email);
    formData.append("phone", business.phone);
    formData.append("website", business.website);
    formData.append("address", business.address);
    formData.append("openingHours", JSON.stringify(business.openingHours));
    
    if (selectedImage) {
      formData.append("profile_image", selectedImage);
    }
    
    if (businessData) {
      // Update existing business
      updateBusiness(formData);
    } else {
      // Create new business
      createBusiness(formData);
    }
  };
  
  if (isLoadingBusiness) {
    return (
        <div className="container mx-auto py-6 text-center">
          Loading business information...
        </div>
    );
  }
  
  return (
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <Tabs defaultValue="business-info">
          <TabsList className="w-full border-b overflow-x-auto flex-nowrap justify-start sm:justify-center">
            <TabsTrigger value="business-info" className="flex-1">Business Information</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
            <TabsTrigger value="menu" className="flex-1">Menu</TabsTrigger>
          </TabsList>
          
          <TabsContent value="business-info" className="mt-6">
            <form onSubmit={handleSubmit}>
              <ProfileImageSection 
                imageUrl={business.imageUrl} 
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
                onDeleteImage={handleDeleteImage}
              />
              
              <BusinessDetailsForm 
                business={business}
                onInputChange={handleInputChange}
              />
              
              <OpeningHoursSection 
                openingHours={business.openingHours}
                onHoursChange={handleHoursChange}
              />
              
              <div className="mt-6 flex justify-center sm:justify-end">
                <Button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                  disabled={isUpdating || isCreating}
                >
                  {isUpdating || isCreating ? "Saving..." : "Save Changes"}
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
            <div className="p-4 text-center">
              <h3 className="text-lg font-medium">Menu Management Coming Soon</h3>
              <p className="text-gray-500 mt-2">This section will allow you to add, edit, and organize your menu items.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
};

export default BusinessProfilePage;