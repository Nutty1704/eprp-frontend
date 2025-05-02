import ProfileImageSection from "./ProfileImageSection";
import BusinessDetailsForm from "./BusinessDetailsForm";
import OpeningHoursSection from "./OpeningHoursSection";
import CuisineSelector from "./CuisineSelector";
import CollapsibleSection from "@/src/components/ui/CollapsibleSection";
import { useFormContext } from "react-hook-form";
import ImageSection from "./Image Section";

const BusinessForm = ({
  business = {},
  selectedImage,
  setSelectedImage,
  imagePreview,
  setImagePreview
}) => {
  // Get methods from FormProvider context
  const { setValue, formState: { errors } } = useFormContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      // Update the form value
      setValue("profileImage", file, { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setImagePreview("");
    // Clear the form value
    setValue("profileImage", null, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="space-y-6">
      <CollapsibleSection title="Profile Image" defaultOpen={true}>
        <ProfileImageSection
          imageUrl={business?.imageUrl}
          imagePreview={imagePreview}
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