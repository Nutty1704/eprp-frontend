import { apiClient} from "./api-client";

const baseRoute = "/api/customer";


export const getCustomer = async () => {
    try {
        const response = await apiClient.get(`${baseRoute}`);
        console.log("Customer data fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching customer data:", error);
        throw new Error("Failed to fetch customer data");
    }
};

export const updateCustomer = async (data) => {
    try {
        const response = await apiClient.put(`${baseRoute}`, data);
        console.log("Customer data updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating customer data:", error);
        throw new Error("Failed to update customer data");
    }
}

export const deleteCustomer = async () => {
    try {
        const response = await apiClient.delete(`${baseRoute}`);
        console.log("Customer data deleted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting customer data:", error);
        throw new Error("Failed to delete customer data");
    }
}