import z from "zod";


export const MAX_IMAGES = 30;

const validateTimeOrder = (timeSlot) => {
  if (!timeSlot.open || !timeSlot.close) return true;
  
  const openTime = new Date(`2000-01-01T${timeSlot.open}`);
  const closeTime = new Date(`2000-01-01T${timeSlot.close}`);
  
  return closeTime > openTime || "Closing time must be after opening time";
};

const timeSlotSchema = z.object({
  open: z.string().min(1, "Opening time is required"),
  close: z.string().min(1, "Closing time is required")
}).refine(validateTimeOrder, {
  message: "Closing time must be after opening time",
  path: ["close"]
});

const daySchema = z.object({
  isOpen: z.boolean(),
  timeSlots: z.array(timeSlotSchema)
});

export const businessSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  address: z.string().min(1, "Address is required"),
  description: z.string().min(1, "Description is required"),
  
  email: z
    .string()
    .email("Not a valid email")
    .optional()
    .or(z.literal("")), // allow empty string if optional
  
  phone: z
    .string()
    .min(1, "Phone number is required")
    .optional()
    .or(z.literal("")),
  
  website: z
    .string()
    .regex(/^(https?:\/\/|www\.)[^\s]+$/, "Enter a valid website starting with http or www")
    .optional()
    .or(z.literal("")),
  
  profileImage: z
    .instanceof(File)
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      { message: "Only JPEG and PNG images are allowed" }
    )
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "Image must be less than 10MB",
    })
    .or(z.literal(null)) // allow null if optional
    .optional(),
    
  businessImages: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
          { message: "Only JPEG and PNG images are allowed" }
        )
        .refine((file) => file.size <= 10 * 1024 * 1024, {
          message: "Each image must be less than 10MB",
        })
    )
    .max(MAX_IMAGES, "Maximum 30 images allowed")
    .optional(),

  cuisines: z
    .array(z.string())
    .min(1, "Please select at least one cuisine type"),
  
  openingHours: z.object({
    mon: daySchema,
    tue: daySchema,
    wed: daySchema,
    thu: daySchema,
    fri: daySchema,
    sat: daySchema,
    sun: daySchema
  }),

  removeProfileImage: z.boolean().optional().default(false),
  existingImageUrls: z.array(z.string().url()).optional(),
  removedImageUrls: z.array(z.string().url()).optional()
});