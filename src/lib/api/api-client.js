import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL

if (!baseURL) {
    throw new Error("Backend URL is not defined in .env");
}

export const apiClient = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true // allow cookies
});

export const handleApiError = (error, defaultMessage = "Something went wrong. Please try again.") => {
    console.error("API Error:", error);

    return {
        success: false,
        error: true,
        message: error.response?.data?.message || defaultMessage,
    };
};
