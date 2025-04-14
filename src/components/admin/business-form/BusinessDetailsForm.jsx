import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const BusinessDetailsForm = () => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="mb-6">
      <div className="grid gap-6 pt-6">
        <div className="grid gap-2">
          <Label htmlFor="name" className={errors.name ? "text-red-500" : ""}>
            Business Name
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                id="name"
                {...field}
                placeholder="Your business name"
                className={errors.name ? "border-red-500" : ""}
              />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description" className={errors.description ? "text-red-500" : ""}>
            Business Description
          </Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                id="description"
                {...field}
                placeholder="Describe your business"
                className={`min-h-[150px] ${errors.description ? "border-red-500" : ""}`}
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email" className={errors.email ? "text-red-500" : ""}>
            Email
          </Label>
          <p className="text-sm text-gray-500 mb-1">
            This is your account's email address for receiving notifications
          </p>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                id="email"
                {...field}
                type="email"
                placeholder="your-email@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="phone" className={errors.phone ? "text-red-500" : ""}>
              Phone number
            </Label>
            <div className="flex">
              <div className="w-16 flex-shrink-0">
                <Input
                  value="+61"
                  readOnly
                  className="rounded-r-none text-center"
                />
              </div>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    id="phone"
                    {...field}
                    className={`rounded-l-none flex-1 ${errors.phone ? "border-red-500" : ""}`}
                    placeholder="9123 4567"
                  />
                )}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="website" className={errors.website ? "text-red-500" : ""}>
              Website
            </Label>
            <Controller
              name="website"
              control={control}
              render={({ field }) => (
                <Input
                  id="website"
                  {...field}
                  placeholder="yourwebsite.com.au"
                  className={errors.website ? "border-red-500" : ""}
                />
              )}
            />
            {errors.website && (
              <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address" className={errors.address ? "text-red-500" : ""}>
            Location
          </Label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input
                id="address"
                {...field}
                placeholder="Ground Floor, Campus Centre, 21 Chancellors Walk"
                className={errors.address ? "border-red-500" : ""}
              />
            )}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;