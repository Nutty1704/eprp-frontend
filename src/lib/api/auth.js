import { apiClient, handleApiError } from "@/src/lib/api/api-client";

const baseRoute = "/api/auth";

export const login = async (isOwner, email, password) => {
    try {
        if (!email || !password) {
            return { success: false, message: "Email and password are required" };
        }

        const response = await apiClient.post(`${baseRoute}/login`, {
            role: isOwner ? "owner" : "customer",
            email,
            password,
        });

        return response.data;
    } catch (error) {
        return handleApiError(error, "Login failed. Please try again.");
    }
};

export const logout = async () => {
    try {
        const response = await apiClient.post(`${baseRoute}/logout`);
        return response.data;
    } catch (error) {
        return handleApiError(error, "Logout failed. Please try again.");
    }
};

export const register = async (isOwner, email, password, fname, lname) => {
    try {
        const response = await apiClient.post(`${baseRoute}/register`, {
            role: isOwner ? "owner" : "customer",
            email,
            password,
            fname: fname || null,
            lname: lname || null,
        });

        return response.data;
    } catch (error) {
        return handleApiError(error, "Registration failed. Please try again.");
    }
};

export const googleAuth = (role) => {
    window.open(
        `http://localhost:5000/api/auth/google?role=${role}`,
        '_self'
    );
}

export const getAuthStatus = async (role) => {
    try {
        const response = await apiClient.get(`${baseRoute}/status?role=${role}`);
        return response.data;
    } catch (error) {
        return handleApiError(error, "Cannot get auth status. Try again later.")
    }
}