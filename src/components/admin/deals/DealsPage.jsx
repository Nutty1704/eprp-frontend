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
        {deals?.map((deal) => (
          <DealCard
            key={deal._id}
            deal={deal}
            onEdit={() => openDialog(deal)}
            onDelete={() => handleDelete(deal._id)}
          />
        ))}
      </div>

      <AddDealDialog open={dialogOpen} onClose={closeDialog} onSave={handleSave} editDeal={editingDeal} />
    </div>
  );
};

export default DealsPage;
