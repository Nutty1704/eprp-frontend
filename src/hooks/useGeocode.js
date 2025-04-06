import { useState, useEffect } from 'react';
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export const useGeocode = (address) => {
    const geocodingApiLoaded = useMapsLibrary("geocoding");
    const [geocodingService, setGeocodingService] = useState(undefined);
    const [position, setPosition] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!geocodingApiLoaded || !window.google.maps) return;
        setGeocodingService(new window.google.maps.Geocoder());
    }, [geocodingApiLoaded]);

    useEffect(() => {
        if (!geocodingService || !address) return;

        setIsLoading(true);
        setError(null);

        geocodingService.geocode({ address }, (results, status) => {
            if (results && status === 'OK') {
                setPosition({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() });
                setIsLoading(false);
            } else {
                setError('Geocoding failed.');
                setIsLoading(false);
            }
        });
    }, [geocodingService, address]);

    return { position, isLoading, error };
};