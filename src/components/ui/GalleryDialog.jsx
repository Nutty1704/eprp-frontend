import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'
import LightboxGallery from './LightboxGallery';


const ImageGrid = ({ images }) => {
    if (images.length === 0) {
        return (
            <div>No images yet. Be the first to share!</div>
        );
    }

    // Custom render function for the images
    const renderImages = ({ images, handleImageClick }) => {
        return (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto custom-scrollbar px-2'>
                {images.map((image, index) => (
                    <img
                        src={image}
                        alt=""
                        key={image}
                        className="w-full h-full object-cover rounded-md shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-md cursor-pointer"
                        onClick={() => handleImageClick(index)}
                    />
                ))}
            </div>
        );
    };

    // Custom style options for the lightbox (optional)
    const styleOptions = {
        thumbnailsContainer: { 
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            paddingBottom: "20px",
            paddingTop: "10px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }
    };

    return (
        <LightboxGallery
            images={images}
            renderImages={renderImages}
            thumbnailOptions={{
                width: 80,
                height: 60,
                gap: 10
            }}
            styleOptions={styleOptions}
            onImageClick={(index) => console.log(`Image ${index} clicked`)}
        />
    );
};

const GalleryDialog = ({ images = [], title = "Gallery", children }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="min-w-[70vw] max-w-[90vw] max-h-[90vh] overflow-y-auto space-y-6">
                <DialogTitle className="text-lg lg:text-2xl text-center rubik-bold mb-2">
                    {title}
                </DialogTitle>
                <ImageGrid images={images} />
            </DialogContent>
        </Dialog>
    )
}

GalleryDialog.prototype = {
    images: PropTypes.array
}

export default GalleryDialog
