import React from 'react';
import { APIProvider } from "@vis.gl/react-google-maps";
import { useGeocode } from '@/src/hooks/useGeocode';
import MapDisplay from '../ui/MapDisplay';
import { cn } from '@/lib/utils';
import { Copy } from 'lucide-react';
import ToolTip from '../ui/Tooltip';

const Location = ({ address, className }) => {
    return (
        <div className={cn('inter-regular text-sm', className)}>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
                <Geocoding address={address} />
            </APIProvider>
            <div className='w-full h-15% bg-gray-100 !bg-primary text-primary-foreground py-2 flex items-center justify-between px-5 shadow-lg'>
                <span>{address}</span>
                <div className='flex items-center h-full pl-1'>
                    <ToolTip text='Copy to clipboard'>
                        <Copy
                            onClick={() => navigator.clipboard.writeText(address)}
                            className='w-4 h-4 hover:scale-105'
                        />
                    </ToolTip>
                </div>
            </div>
        </div>
    )
};

const Geocoding = ({ address }) => {
    const { position, isLoading, error } = useGeocode(address);

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <MapDisplay position={position} />
    );
}

export default Location;