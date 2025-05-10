import ProfileImageSection from "./ProfileImageSection";
import BusinessDetailsForm from "./BusinessDetailsForm";
import OpeningHoursSection from "./OpeningHoursSection";
import CuisineSelector from "./CuisineSelector";
import CollapsibleSection from "@/src/components/ui/CollapsibleSection";
import { useFormContext } from "react-hook-form";
import ImageSection from "./Image Section";
import { useState, useEffect, useRef } from "react";
import { Image, Building2, Clock, Utensils, GalleryHorizontal } from "lucide-react";

const BusinessForm = ({
  business = {},
  selectedImage,
  setSelectedImage,
  imagePreview,
  setImagePreview
}) => {
  // Get methods from FormProvider context
  const { setValue, formState: { errors } } = useFormContext();
  const [imageDeleted, setImageDeleted] = useState(false);

  const lastPreviewUrlRef = useRef(null);

  useEffect(() => {
    return () => {
      if (lastPreviewUrlRef.current) {
        URL.revokeObjectURL(lastPreviewUrlRef.current);
      }
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      if (lastPreviewUrlRef.current) {
        URL.revokeObjectURL(lastPreviewUrlRef.current);
      }

      const newUrl = URL.createObjectURL(file);
      lastPreviewUrlRef.current = newUrl;

      setSelectedImage(file);
      setImagePreview(newUrl);
      setValue("profileImage", file, { shouldValidate: true, shouldDirty: true });
      setValue("removeProfileImage", false);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setImagePreview("");
    setValue("profileImage", null, { shouldValidate: true, shouldDirty: true });
    setValue("removeProfileImage", true);
    setImageDeleted(true);
  };

  return (
    <div className="space-y-6">
      <CollapsibleSection title="Profile Image" defaultOpen={true} icon={Image}>
        <ProfileImageSection
          imageUrl={business?.imageUrl}
          imagePreview={imagePreview}
          imageDeleted={imageDeleted}
          onImageChange={handleImageChange}
          onDeleteImage={handleDeleteImage}
          errors={errors.profileImage}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Basic Business Details" defaultOpen={true} icon={Building2}>
        <BusinessDetailsForm
          business={business}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Opening Hours" icon={Clock}>
        <OpeningHoursSection
          openingHours={business?.openingHours}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Cuisines" icon={Utensils}>
        <CuisineSelector
          selectedCuisines={business?.cuisines || []}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Business Photos" icon={GalleryHorizontal}>
        <ImageSection defaultImages={business?.images || []}/>
      </CollapsibleSection>
    </div>
  );
};

export default BusinessForm;