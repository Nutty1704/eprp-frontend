import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import MenuCard from './MenuCard';
import AddMenuItemDialog from './AddMenuItemDialog';
import { useGetMyBusiness, useUpdateMyBusiness } from '@/src/lib/api/MyBusinessApi';
import { Card } from '@/components/ui/card';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { business, isLoading, refetch } = useGetMyBusiness();
  const { updateBusiness, isLoading: isUpdating } = useUpdateMyBusiness();

  useEffect(() => {
    if (business?.menuItems) {
      setMenuItems(business.menuItems);
    }
  }, [business]);

  const handleOpenDialog = (item = null) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditingItem(null);
    setDialogOpen(false);
  };

  const handleSaveMenuItem = async (formData, itemId) => {
    try {
      // Create a copy of the current menu items
      let updatedMenuItems = [...menuItems];
      
      if (itemId) {
        // Update existing item
        const index = updatedMenuItems.findIndex(item => item._id === itemId);
        if (index !== -1) {
          updatedMenuItems[index] = {
            ...updatedMenuItems[index],
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            // Only update image if a new one was provided
            ...(formData.get('image') ? { imageUrl: URL.createObjectURL(formData.get('image')) } : {})
          };
        }
      } else {
        // Add new item
        const newItem = {
          _id: `temp-${Date.now()}`, // This will be replaced with a real ID by the backend
          name: formData.get('name'),
          price: parseFloat(formData.get('price')),
          imageUrl: formData.get('image') ? URL.createObjectURL(formData.get('image')) : ''
        };
        updatedMenuItems.push(newItem);
      }

      // Update local state first for immediate feedback
      setMenuItems(updatedMenuItems);

      // Prepare data for API call
      const businessFormData = new FormData();
      businessFormData.append('menuItems', JSON.stringify(updatedMenuItems));
      
      // For any images being uploaded, append them to the form data
      if (formData.get('image')) {
        businessFormData.append('menuItemImage', formData.get('image'));
        businessFormData.append('menuItemImageIndex', itemId 
          ? updatedMenuItems.findIndex(item => item._id === itemId)
          : updatedMenuItems.length - 1
        );
      }

      // Send to API
      await updateBusiness(businessFormData, business._id);
      
      // Refetch to get updated data from server
      refetch();
      
      toast.success(itemId ? 'Menu item updated' : 'Menu item added');
    } catch (error) {
      console.error('Error saving menu item:', error);
      toast.error('Failed to save menu item');
      // Revert the local state change on error
      if (business?.menuItems) {
        setMenuItems(business.menuItems);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-md w-1/3 mx-auto mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {menuItems.map((item, index) => (
          <MenuCard
            key={item._id}
            number={index + 1}
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
            onEdit={() => handleOpenDialog(item)}
          />
        ))}
        
        {/* Add New Item Card */}
        <Card 
          className="flex items-center justify-center h-48 bg-pink-100 border-dashed border-2 border-pink-300 cursor-pointer hover:bg-pink-200 transition-colors duration-300"
          onClick={() => handleOpenDialog()}
        >
          <div className="text-center">
            <Plus className="mx-auto h-12 w-12 text-pink-500" />
            <p className="mt-2 text-pink-700 font-medium">Add Menu Item</p>
          </div>
        </Card>
      </div>

      <AddMenuItemDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveMenuItem}
        editItem={editingItem}
      />
    </div>
  );
};

export default MenuPage;