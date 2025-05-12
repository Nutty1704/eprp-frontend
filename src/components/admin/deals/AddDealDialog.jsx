import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { dealTypeOptions } from "@/src/config/DealTypes";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const AddDealDialog = ({ open, onClose, onSave, editDeal = null }) => {
  const [dealData, setDealData] = useState({
    title: "",
    description: "",
    type: "PERCENTAGE",
    discountValue: "",
    startDate: null,
    endDate: null,
    redemptionInfo: "",
    appliesTo: "",
    minimumSpend: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editDeal) {
      setDealData({
        title: editDeal.title || "",
        description: editDeal.description || "",
        type: editDeal.type || "PERCENTAGE",
        discountValue: editDeal.discountValue || "",
        startDate: editDeal.startDate ? new Date(editDeal.startDate) : null,
        endDate: editDeal.endDate ? new Date(editDeal.endDate) : null,
        redemptionInfo: editDeal.redemptionInfo || "",
        appliesTo: editDeal.appliesTo || "",
        minimumSpend: editDeal.minimumSpend?.toString() || "",
      });
    } else {
      setDealData({
        title: "",
        description: "",
        type: "PERCENTAGE",
        discountValue: "",
        startDate: null,
        endDate: null,
        redemptionInfo: "",
        appliesTo: "",
        minimumSpend: "",
      });
    }
  }, [editDeal, open]);

  const handleChange = (field, value) => {
    setDealData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!dealData.title.trim()) newErrors.title = "Title is required";
    if (!dealData.startDate) newErrors.startDate = "Start date is required";
    if (!dealData.endDate) newErrors.endDate = "End date is required";

    // Ensure endDate >= startDate
    if (
      dealData.startDate &&
      dealData.endDate &&
      dealData.endDate < dealData.startDate
    ) {
      newErrors.startDate = "End date must be after or equal to start date";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSaving(true);
    try {
      const formattedData = {
        ...dealData,
        startDate: dealData.startDate.toISOString(),
        endDate: dealData.endDate.toISOString(),
      };

      await onSave(formattedData, editDeal?._id);
      onClose();
    } catch (err) {
      console.error("Failed to save deal:", err);
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editDeal ? "Edit Deal" : "Add Deal"}</DialogTitle>
          <DialogDescription>
            Fill in the details of the promotional deal you'd like to offer.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={dealData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g. 15% Off Lunch Sets"
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Deal Type</Label>
            <Select
              value={dealData.type}
              onValueChange={(value) => handleChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select deal type" />
              </SelectTrigger>
              <SelectContent>
                {dealTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(dealData.type === "PERCENTAGE" ||
            dealData.type === "FIXED_AMOUNT") && (
            <div className="space-y-2">
              <Label htmlFor="discountValue">Discount Value</Label>
              <Input
                id="discountValue"
                type="number"
                value={dealData.discountValue}
                onChange={(e) => handleChange("discountValue", e.target.value)}
                placeholder={
                  dealData.type === "PERCENTAGE" ? "e.g. 15" : "e.g. 5"
                }
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="minimumSpend">Minimum Spend</Label>
            <Input
              id="minimumSpend"
              type="number"
              value={dealData.minimumSpend}
              onChange={(e) => handleChange("minimumSpend", e.target.value)}
              placeholder="e.g. 20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={dealData.startDate ? dealData.startDate.toISOString().split('T')[0] : ''}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null;
                handleChange("startDate", date);
              }}
              className="w-full"
            />
            {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={dealData.endDate ? dealData.endDate.toISOString().split('T')[0] : ''}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null;
                handleChange("endDate", date);
              }}
              min={dealData.startDate ? dealData.startDate.toISOString().split('T')[0] : ''}
              className="w-full"
            />
            {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
          </div>

          <div className="space-y-2 sm:col-span-2 mt-4">
            <Label htmlFor="appliesTo">Applies To</Label>
            <Input
              id="appliesTo"
              value={dealData.appliesTo}
              onChange={(e) => handleChange("appliesTo", e.target.value)}
              placeholder="e.g. Lunch items only"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="redemptionInfo">Redemption Instructions</Label>
            <Textarea
              id="redemptionInfo"
              value={dealData.redemptionInfo}
              onChange={(e) =>
                handleChange("redemptionInfo", e.target.value)
              }
              placeholder="e.g. Show this deal in-store to redeem."
              rows={3}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="description">Additional Description</Label>
            <Textarea
              id="description"
              value={dealData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Extra notes or T&Cs"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isSaving ? "Saving..." : "Save Deal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDealDialog;
