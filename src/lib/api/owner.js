import { apiClient, handleApiError } from "@/src/lib/api/api-client";

const baseRoute = "/api/my/business";

export const getOwnerBusinesses = async () => {
  try {
    const response = await apiClient.get(baseRoute);
    return response.data; 
  } catch (error) {
    return handleApiError(error, "Failed to load businesses.");
  }
};

export const getBusinessDetails = async (businessId) => {
  try {
    const response = await apiClient.get(`${baseRoute}/${businessId}`);
    return response.data; 
  } catch (error) {
    return handleApiError(error, "Failed to load business details.");
  }
}
