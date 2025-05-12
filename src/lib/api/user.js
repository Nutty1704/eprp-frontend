import axios from "axios";

const baseRoute = "http://localhost:5000/api";


export const getCustomer = async () => {
    try {
        const response = await axios.get(`${baseRoute}/customer`);
        console.log("Customer data fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching customer data:", error);
        throw new Error("Failed to fetch customer data");
    }
};

export const updateCustomer = async (data) => {
    try {
        const response = await axios.put(`${baseRoute}/customer`, data);
        console.log("Customer data updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating customer data:", error);
        throw new Error("Failed to update customer data");
    }
}

export const deleteCustomer = async () => {
    try {
        const response = await axios.delete(`${baseRoute}/customer`);
        console.log("Customer data deleted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting customer data:", error);
        throw new Error("Failed to delete customer data");
    }
}