import { Info, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useEffect } from "react";

const UploadImages = ({ minImages = 0, maxImages = 3, onChange = (images) => { }, disabled = false, displayImages = [] }) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const imgInputRef = useRef(null);

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + images.length > maxImages) {
            setError(`You can upload a maximum of ${maxImages} images.`);
            setTimeout(() => setError(null), 3000);
            return;
        }
        const newImages = [...images, ...selectedFiles];
        setImages(newImages);
        onChange(newImages);
    };

    const handleRemoveImage = (index) => {
      if (images.length <= minImages) {
        setError(`You must keep at least ${minImages} image${minImages > 1 ? "s" : ""}.`);
        setTimeout(() => setError(null), 3000);
        return;
  }

  const newImages = images.filter((_, i) => i !== index);
  setImages(newImages);
  onChange(newImages);
    };

    useEffect(() => {
      if(displayImages.length > 0) {
        setImages(displayImages);
      }
    }, [displayImages]);

    return (
        <div>
            {/* Display uploaded images */}
            <div className="mt-4 flex flex-wrap space-x-2 gap-y-3">
                {images.map((image, index) => (
                    <div key={index} className="relative">
                        <img
                            src={image instanceof File ? URL.createObjectURL(image) : image}
                            alt={`uploaded-${index}`}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className={`absolute -top-2 -right-2 bg-gray-300 text-gray-800 p-1 rounded-full w-4.5 h-4.5 flex justify-center items-center hover:bg-gray-400 ${
                            images.length <= minImages ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          disabled={images.length <= minImages}
                        >
                            <X className="h-3 w-3" />
                        </button>

                    </div>
                ))}

                {/* Image upload box */}
                {(images.length < maxImages) && (
                    <div
                        className={`w-24 h-24 border-2 border-dashed border-gray-400 flex justify-center items-center cursor-pointer ${disabled && "border-gray-200 cursor-not-allowed"}`}
                        onClick={() => imgInputRef.current?.click()}
                    >
                        <span className="text-2xl font-bold text-gray-600">+</span>
                        <input
                            type="file"
                            ref={imgInputRef}
                            accept="image/*"
                            className="hidden"
                            multiple
                            onChange={handleImageChange}
                            disabled={disabled}
                        />
                    </div>
                )}
            </div>

            {/* Error message */}
            {error && (
                <div className="flex items-center my-2 gap-2 text-destructive">
                    <Info className="h-4 w-4" />
                    <span className="text-xs inter-medium">{error}</span>
                </div>
            )}
        </div>
    );
};

export default UploadImages;
