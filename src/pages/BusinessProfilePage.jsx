import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

import {
  useGetBusinessById,
  useUpdateMyBusiness,
  useCreateMyBusiness
} from "../lib/api/MyBusinessApi";

import BusinessForm from "../components/admin/business-form/BusinessForm";
import MenuPage from "../components/admin/menu/MenuPage";
import { businessSchema } from "../lib/business/schema";

const defaultOpeningHours = {
  mon: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
  tue: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
  wed: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
  thu: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
  fri: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
  sat: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
  sun: { isOpen: false, timeSlots: [] }
};

const BusinessProfilePage = () => {
  const navigate = useNavigate();
  const { businessId } = useParams();
  const {
    business: businessData,
    isLoading: isLoadingBusiness,
    refetch
  } = useGetBusinessById(businessId);

  const { updateBusiness, isLoading: isUpdating } = useUpdateMyBusiness();
  const { createBusiness, isLoading: isCreating } = useCreateMyBusiness();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [activeTab, setActiveTab] = useState("business-info");

  const isSubmitting = isUpdating || isCreating;

  const methods = useForm({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: "",
      description: "",
      email: "",
      phone: "",
      website: "",
      address: "",
      cuisines: [],
      profileImage: null,
      businessImages: [],
      openingHours: defaultOpeningHours,
      removeProfileImage: false,
    }
  });

  const { handleSubmit, reset, setValue } = methods;

  // Only reset form when business data changes and not during component initialization
  useEffect(() => {
    if (businessData) {
      reset({
        name: businessData.businessName || businessData.name || "",
        description: businessData.description || "",
        email: businessData.email || "",
        phone: businessData.phone || "",
        website: businessData.website || "",
        address: businessData.address || "",
        cuisines: businessData.cuisines || [],
        profileImage: null,
        businessImages: [],
        openingHours: {
          ...defaultOpeningHours,
          ...businessData.openingHours
        },
        removeProfileImage: false,
      });
    }
  }, [businessData, businessId, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Prepare form data
    for (const key in data) {
      if (key === "openingHours" || key === "cuisines") {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key !== "images" && key !== "profileImage" && key !== "galleryImages") {
        formData.append(key, data[key]);
      }
    }

    console.log("Data to be submitted:", data);

    if (data.removeProfileImage) {
      formData.append("profileImageDeleted", "true");
    }

    // Append single profile image
    if (data.profileImage instanceof File) {
      formData.append("profile_image", data.profileImage);
    }
  
    // Append multiple business gallery images
    if (Array.isArray(data.businessImages) && data.businessImages.length > 0) {
      data.businessImages.forEach((file) => {
        if (file instanceof File) {
          formData.append("business_images", file);
        }
      });
    }

    try {
      if (businessData) {
        await updateBusiness(formData, businessData._id);
        toast.success("Business updated successfully");
      } else {
        await createBusiness(formData);
        toast.success("Business created successfully");
        navigate("/owner");
      }

      refetch();
      setValue("images", []);
      setImagePreview("");
      setSelectedImage(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "An error occurred while saving your business information"
      );
    }
  };

  if (isLoadingBusiness) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        <span className="ml-2">Loading business information...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
      {businessId && (
        <TabsList className="w-full border-b flex-nowrap justify-start sm:justify-center">
          <TabsTrigger value="business-info" className="flex-1">Business Information</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
          <TabsTrigger value="menu" className="flex-1">Menu</TabsTrigger>
        </TabsList>
      )}
        <TabsContent value="business-info" className="mt-6">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <BusinessForm
                business={businessData}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
              <div className="mt-6 flex justify-center sm:justify-end">
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting
                    ? "Saving..."
                    : businessData
                    ? "Save Changes"
                    : "Create Business"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </TabsContent>

        {businessId && (
          <TabsContent value="reviews">
            <div className="p-4 text-center">
              <h3 className="text-lg font-medium">Reviews Management</h3>
              <p className="text-gray-500 mt-2">
                This section will allow you to view and respond to customer reviews.
              </p>
            </div>
          </TabsContent>
        )}

        {businessId && (
          <TabsContent value="menu" className="mt-6">
            <MenuPage businessId={businessId} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default BusinessProfilePage;
