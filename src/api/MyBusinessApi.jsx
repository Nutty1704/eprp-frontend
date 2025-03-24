import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyBusiness = () => {
  const getMyBusinessRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/business`, {
      method: "GET",
    });
    
    if (!response.ok) {
      throw new Error("Failed to get business");
    }
    
    return response.json();
  };

  const { data: business, isLoading } = useQuery(
    "fetchMyBusiness",
    getMyBusinessRequest
  );

  return { business, isLoading };
};

export const useCreateMyBusiness = () => {
  const createMyBusinessRequest = async (businessFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/business`, {
      method: "POST",
      body: businessFormData,
    });
    
    if (!response.ok) {
      throw new Error("Failed to create business");
    }
    
    return response.json();
  };

  const {
    mutate: createBusiness,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyBusinessRequest);

  if (isSuccess) {
    toast.success("Business created!");
  }

  if (error) {
    toast.error("Unable to update business");
  }

  return { createBusiness, isLoading };
};

export const useUpdateMyBusiness = () => {
  const updateBusinessRequest = async (businessFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/business`, {
      method: "PUT",
      body: businessFormData,
    });
    
    if (!response) {
      throw new Error("Failed to update business");
    }
    
    return response.json();
  };

  const {
    mutate: updateBusiness,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateBusinessRequest);

  if (isSuccess) {
    toast.success("Business Updated");
  }

  if (error) {
    toast.error("Unable to update business");
  }

  return { updateBusiness, isLoading };
};