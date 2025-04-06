import { z } from 'zod';

export const MAX_IMAGES = 3;
export const MAX_CHARACTERS = 500;

export const reviewSchema = z.object({
    foodRating: z.number()
        .min(1, { message: "Food rating is required" })
        .max(5, { message: "Food rating cannot exceed 5 stars" }),
    ambienceRating: z.number()
        .min(1, { message: "Ambience rating is required" })
        .max(5, { message: "Ambience rating cannot exceed 5 stars" }),
    serviceRating: z.number()
        .min(1, { message: "Service rating is required" })
        .max(5, { message: "Service rating cannot exceed 5 stars" }),
    reviewText: z.string()
        .min(1, { message: "Review cannot be empty" })
        .max(MAX_CHARACTERS, { message: `Review cannot exceed ${MAX_CHARACTERS} characters` }),
    priceRange: z.string()
        .min(1, { message: "Please select a price range" })
        .max(50, { message: "Price range cannot exceed 50 characters" }),
    images: z.array(z.instanceof(File))
        .max(MAX_IMAGES, { message: `You can upload up to ${MAX_IMAGES} images only.` })
        .optional(),
});