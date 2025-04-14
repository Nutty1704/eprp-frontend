import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddMenuItemDialog = ({ open, onClose, onSave, editItem = null }) => {
  const [name, setName] = useState(editItem?.name || '');
  const [price, setPrice] = useState(editItem?.price ? editItem.price.toString() : '');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(editItem?.imageUrl || '');
  const [isLoading, setIsLoading] = useState(false);

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (open) {
      // If editing existing item, populate fields
      if (editItem) {
        setName(editItem.name || '');
        setPrice(editItem.price ? editItem.price.toString() : '');
        setImagePreview(editItem.imageUrl || '');
      } else {
        // Reset for new item
        setName('');
        setPrice('');
        setImage(null);
        setImagePreview('');
      }
    }
  }, [open, editItem]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (!name.trim()) {
      alert('Please enter a name for the menu item');
      return;
    }

    if (!price.trim() || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      alert('Please enter a valid price');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data for submission
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('price', parseFloat(price));
      
      if (image) {
        formData.append('image', image);
      }

      if (editItem?._id) {
        formData.append('_id', editItem._id);
      }

      // Use the onSave callback to handle the actual saving logic
      await onSave(formData, editItem?._id);
      onClose();
    } catch (error) {
      console.error('Error saving menu item:', error);
      alert('Failed to save menu item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editItem ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
          <DialogDescription>
            Complete the form below to {editItem ? 'update' : 'add'} a menu item.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Nasi Lemak"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 18.99"
              step="0.01"
              min="0"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Image</Label>
            <div className="flex items-center gap-4">
              <Input
                id="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image').click()}
              >
                Select Image
              </Button>
              {imagePreview && (
                <div className="relative w-20 h-20">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => {
                      setImage(null);
                      setImagePreview('');
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? 'Saving...' : 'Save Item'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMenuItemDialog;