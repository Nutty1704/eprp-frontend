import { z } from 'zod';

export const MAX_IMAGES = 3;
export const MAX_CHARACTERS_TITLE = 50;
export const MAX_CHARACTERS_TEXT = 500;
export const MIN_CHARACTERS_TEXT = 50;

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
    reviewTitle: z.string()
        .min(3, { message: "Review title must be at least 3 characters" })
        .max(MAX_CHARACTERS_TITLE, { message: "Review title cannot exceed 50 characters" }),
    reviewText: z.string()
        .min(MIN_CHARACTERS_TEXT, { message: `Review must be at least ${MIN_CHARACTERS_TEXT} characters` })
        .max(MAX_CHARACTERS_TEXT, { message: `Review cannot exceed ${MAX_CHARACTERS_TEXT} characters` }),
    priceRange: z.string()
        .min(1, { message: "Please select a price range" })
        .max(50, { message: "Price range cannot exceed 50 characters" }),
    images: z.array(z.instanceof(File))
        .max(MAX_IMAGES, { message: `You can upload up to ${MAX_IMAGES} images only.` })
        .optional(),
});