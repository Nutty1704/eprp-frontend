import { apiClient, handleApiError } from "@/src/lib/api/api-client";

const baseRoute = "/api/my/business";

// GET /api/owner/businesses
export const getOwnerBusinesses = async () => {
  try {
    const response = await apiClient.get(baseRoute);
    return response.data; 
  } catch (error) {
    return handleApiError(error, "Failed to load businesses.");
  }
};
