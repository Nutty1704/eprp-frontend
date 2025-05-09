import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

const LightboxGallery = ({
  images,
  renderImages, // Render prop for custom image layout
  additionalPlugins = [],
  thumbnailOptions = {},
  styleOptions = {},
  initialIndex = 0,
  onImageClick = null,
}) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(initialIndex);
  
  // Normalize images into a consistent format
  const imageUrls = images?.map(img => typeof img === 'string' ? img : img.url || '') || [];
  
  // Convert image URLs to the format expected by yet-another-react-lightbox
  const slides = imageUrls.map(url => ({
    src: url,
  }));

  // Default handler for image clicks
  const handleImageClick = (imageIndex) => {
    setIndex(imageIndex);
    setOpen(true);
    
    // Call the custom click handler if provided
    if (onImageClick) {
      onImageClick(imageIndex);
    }
  };

  // Default thumbnail options
  const defaultThumbnailOptions = {
    position: "bottom",
    width: 99,
    height: 66,
    border: 2,
    borderRadius: 4,
    padding: 2,
    gap: 8,
    imageFit: "cover",
  };
  
  // Default style options
  const defaultStyleOptions = {
    container: { 
      backgroundColor: "rgba(0, 0, 0, .9)",
      paddingBottom: "0",
    },
    thumbnail: { 
      border: "1px solid transparent", 
      borderRadius: "4px",
      transition: "border-color 0.3s ease",
    },
    thumbnailsTrack: { 
      padding: "0.5rem 0",
    },
    thumbnailsContainer: { 
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      paddingBottom: "20px",
      paddingTop: "10px",
      margin: "0",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    },
    thumbnailsImage: { 
      objectFit: "cover",
    },
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
    }
  };

  // Merge default options with custom options
  const mergedThumbnailOptions = { ...defaultThumbnailOptions, ...thumbnailOptions };
  const mergedStyleOptions = { ...defaultStyleOptions, ...styleOptions };

  return (
    <>
      {/* Render custom image layout using the render prop */}
      {renderImages({
        images: imageUrls,
        handleImageClick
      })}

      {/* Lightbox with thumbnails */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Thumbnails, ...additionalPlugins]}
        thumbnails={mergedThumbnailOptions}
        carousel={{
          finite: slides.length <= 1,
        }}
        styles={mergedStyleOptions}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
      />
    </>
  );
};

export default LightboxGallery;