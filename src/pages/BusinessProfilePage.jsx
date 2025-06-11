import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2, Star, List, FileText, MessageCircle, Tag, Menu, X } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  useGetBusinessById,
  useUpdateMyBusiness,
  useCreateMyBusiness,
} from "../lib/api/MyBusinessApi";

import BusinessForm from "../components/admin/business-form/BusinessForm";
import MenuPage from "../components/admin/menu/MenuPage";
import { businessSchema } from "../lib/business/schema";
import ReviewStats from "../components/admin/reviews/ReviewStats";
import CollapsibleSection from "../components/ui/CollapsibleSection";
import AdminReviewDeck from "../components/admin/reviews/AdminReviewDeck";
import DealsPage from "../components/admin/deals/DealsPage";

const defaultOpeningHours = {
  mon: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
  tue: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
  wed: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
  thu: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
  fri: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
  sat: { isOpen: true, timeSlots: [{ open: "10:00", close: "20:00" }] },
  sun: { isOpen: false, timeSlots: [] }
};

const navigationItems = [
  { key: 'info', icon: FileText, label: 'Info' },
  { key: 'reviews', icon: MessageCircle, label: 'Reviews' },
  { key: 'menu', icon: List, label: 'Menu' },
  { key: 'deals', icon: Tag, label: 'Deals' }
];

const NavButton = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      className={`flex items-center gap-2 text-left w-full px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${isActive ? 'bg-gray-100 font-semibold' : ''
        }`}
      onClick={onClick}
    >
      <Icon size={18} />
      {item.label}
    </button>
  );
};

const BusinessProfilePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  const [activeSection, setActiveSection] = useState("info");

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
      existingImageUrls: [],
      removedImageUrls: [],
    }
  });

  const { handleSubmit, reset, setValue } = methods;

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
        existingImageUrls: businessData.images || [],
        removedImageUrls: [],
      });
    }
  }, [businessData, businessId, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (data.website && !data.website.startsWith("http://") && !data.website.startsWith("https://")) {
      data.website = `https://${data.website}`;
    }

    for (const key in data) {
      if (key === "openingHours" || key === "cuisines") {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key !== "images" && key !== "profileImage" && key !== "businessImages" && key !== "removeProfileImage" && key !== "removedImageUrls") {
        formData.append(key, data[key]);
      }
    }

    if (data.removeProfileImage) {
      formData.append("profileImageDeleted", "true");
    }

    if (data.profileImage instanceof File) {
      formData.append("profile_image", data.profileImage);
    }

    if (Array.isArray(data.businessImages)) {
      data.businessImages.forEach((file) => {
        if (file instanceof File) {
          formData.append("business_images", file);
        }
      });
    }

    if (data.removedImageUrls?.length) {
      formData.append("removedImageUrls", JSON.stringify(data.removedImageUrls));
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
    <div className="flex gap-6 px-4 sm:px-6 py-6 container mx-auto">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-12 left-2 z-50 p-2 bg-primary text-white rounded-md shadow-md border"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile Drawer */}
      <aside className={`
      w-40 shrink-0 space-y-2 bg-white
      lg:sticky lg:top-[88px] lg:self-start lg:translate-x-0
      lg:shadow-none lg:border-none lg:z-auto
      fixed top-0 left-0 h-full z-50 shadow-lg border-r
      transform transition-transform duration-300 ease-in-out
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="px-2 lg:px-0">
          {navigationItems.map((item) => (
            <NavButton
              key={item.key}
              item={item}
              isActive={activeSection === item.key}
              onClick={() => {
                setActiveSection(item.key);
                setIsMobileMenuOpen(false); // Close mobile menu when item is selected
              }}
            />
          ))}
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 lg:ml-0 ml-0">
        {activeSection === "info" && (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Saving..." : businessData ? "Save Changes" : "Create Business"}
                </Button>
              </div>
            </form>
          </FormProvider>
        )}

        {activeSection === "reviews" && (
          <>
            <CollapsibleSection
              title={(
                <div className="flex items-center gap-2 text-xl rubik-bold">
                  <Star className="text-primary fill-primary" size={22} />
                  Review Statistics Dashboard
                </div>
              )}
            >
              <ReviewStats
                businessId={businessData?._id}
                averageRating={businessData?.rating}
                avgFoodRating={businessData?.foodRating}
                avgAmbienceRating={businessData?.ambienceRating}
                avgServiceRating={businessData?.serviceRating}
              />
            </CollapsibleSection>
            <AdminReviewDeck businessId={businessData?._id} />
          </>
        )}

        {activeSection === "menu" && (
          <MenuPage businessId={businessData?._id} />
        )}

        {activeSection === "deals" && (
          <DealsPage businessId={businessData?._id} />
        )}
      </div>
    </div>
  );
};

export default BusinessProfilePage;
