import { cuisineOptions } from "@/src/config/Cuisine";

export const getCuisineLabel = (id) => {
    const cuisine = cuisineOptions.find((c) => c.id === id);
    return cuisine ? cuisine.label : "Unknown";
};