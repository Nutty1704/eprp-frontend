import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'


const ImageGrid = ({ images }) => {
    if (images.length === 0) {
        return (
            <div>No images yet. Be the first to share!</div>
        )
    }

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto custom-scrollbar px-2'>
            {images.map(image => (
                <img
                    src={image}
                    alt=""
                    key={image}
                    className="w-full h-full object-cover rounded-md shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-md"
                />

            ))}
        </div>
    )
}

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
