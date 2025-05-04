import ProfileImageSection from "./ProfileImageSection";
import BusinessDetailsForm from "./BusinessDetailsForm";
import OpeningHoursSection from "./OpeningHoursSection";
import CuisineSelector from "./CuisineSelector";
import CollapsibleSection from "@/src/components/ui/CollapsibleSection";
import { useFormContext } from "react-hook-form";
import ImageSection from "./Image Section";
import { useState } from "react";

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
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
      <CollapsibleSection title="Profile Image" defaultOpen={true}>
        <ProfileImageSection
          imageUrl={business?.imageUrl}
          imagePreview={imagePreview}
          imageDeleted={imageDeleted}
          onImageChange={handleImageChange}
          onDeleteImage={handleDeleteImage}
          errors={errors.profileImage}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Basic Business Details" defaultOpen={true}>
        <BusinessDetailsForm
          business={business}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Opening Hours">
        <OpeningHoursSection
          openingHours={business?.openingHours}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Cuisines">
        <CuisineSelector
          selectedCuisines={business?.cuisines || []}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Business Photos">
        <ImageSection />
      </CollapsibleSection>
    </div>
  );
};

export default BusinessForm;