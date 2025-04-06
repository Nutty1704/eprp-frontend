import React, { useEffect } from 'react';
import { Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";

const MapDisplay = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        if (map && position) {
            map.panTo(position);
        }
    }, [map, position]);

    return (
        <Map
            defaultZoom={17}
            defaultCenter={{ lat: -37.91134458071141, lng: 145.1328566424153 }}
            mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
            className="w-full h-full"
        >
            {position && <AdvancedMarker position={position} />}
        </Map>
    );
};

export default MapDisplay;