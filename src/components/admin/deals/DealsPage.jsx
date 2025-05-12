import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import DealCard from "./DealCard";
import AddDealDialog from "./AddDealDialog";
import { useGetMyDeals, useCreateDeal, useUpdateDeal, useDeleteDeal } from "@/src/lib/api/MyBusinessApi";
import { dealTypeOptions } from "@/src/config/DealTypes";

const DealsPage = ({ businessId }) => {
  const { deals, isLoading, refetch } = useGetMyDeals();
  const { createDeal } = useCreateDeal();
  const { updateDeal } = useUpdateDeal();
  const { deleteDeal } = useDeleteDeal();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);

  const openDialog = (deal = null) => {
    setEditingDeal(deal);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setEditingDeal(null);
    setDialogOpen(false);
  };

  const handleSave = async (data) => {
    try {
      if (editingDeal?._id) {
        await updateDeal(editingDeal._id, data);
        toast.success("Deal updated");
      } else {
        await createDeal({ ...data, business_id: businessId });
        toast.success("Deal created");
      }
      closeDialog();
      refetch();
    } catch (err) {
      toast.error("Failed to save deal");
    }
  };

  const handleDelete = async (dealId) => {
    try {
      await deleteDeal(dealId);
      toast.success("Deal deleted");
      refetch();
    } catch {
      toast.error("Failed to delete deal");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => openDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {deals && deals.length > 0 ? (
          deals.map((deal) => (
            <DealCard
              key={deal._id}
              deal={deal}
              onEdit={() => openDialog(deal)}
              onDelete={() => handleDelete(deal._id)}
            />
          ))
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h3 className="font-medium text-lg mb-2">No Deals Available</h3>
            <p className="text-gray-500 mb-4">You haven't created any promotional deals yet.</p>
          </div>
        )}
      </div>

      <AddDealDialog open={dialogOpen} onClose={closeDialog} onSave={handleSave} editDeal={editingDeal} />
    </div>
  );
};

export default DealsPage;
