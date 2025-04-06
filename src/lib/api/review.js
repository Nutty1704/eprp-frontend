import { apiClient, handleApiError } from "./api-client";

const baseRoute = "/api/reviews";

export const createReview = async (reviewData, businessId) => {
    try {
        const formData = new FormData();
        
        formData.append("businessId", businessId);
        formData.append("text", reviewData.reviewText);
        formData.append("foodRating", reviewData.foodRating);
        formData.append("ambienceRating", reviewData.ambienceRating);
        formData.append("serviceRating", reviewData.serviceRating);

        if (reviewData.images && reviewData.images.length > 0) {
            reviewData.images.forEach((image, index) => {
                formData.append("images", image); // Assuming 'image' is a File object
            });
        }

        const response = await apiClient.post(`${baseRoute}/create`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        return handleApiError(error, "Review creation failed. Please try again.");
    }
}

export const getReviews = async (customerId, businessId, filters = {}) => {
    try {
        if (!customerId && !businessId) {
            throw new Error("Either customerId or businessId is required.");
        }

        const params = new URLSearchParams();

        if (customerId) params.append("customerId", customerId);
        if (businessId) params.append("businessId", businessId);

        // Add filters dynamically
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, value);
            }
        });

        const response = await apiClient.get(`${baseRoute}/?${params.toString()}`);
        
        return response.data;
    } catch (error) {
        return handleApiError(error, "Failed to fetch reviews. Please try again.");
    }
};
