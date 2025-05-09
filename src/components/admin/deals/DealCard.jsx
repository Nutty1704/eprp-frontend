import { Trash2, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { dealTypeOptions } from "@/src/config/DealTypes";

const DealCard = ({ deal, onEdit, onDelete }) => {
  const {
    title,
    description,
    type,
    discountValue,
    startDate,
    endDate,
  } = deal;

  const typeOption = dealTypeOptions.find((opt) => opt.value === type);
  const typeLabel = typeOption?.label || type;

  // Only show value if type expects a numeric discount
  const showValue = ["PERCENTAGE", "FIXED_AMOUNT"].includes(type);

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm w-full p-6">
      {/* Title + Action Icons */}
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-red-800">{title}</h3>
        <div className="flex gap-3">
          <Pencil
            className="h-5 w-5 text-blue-500 cursor-pointer"
            onClick={onEdit}
          />
          <Trash2
            className="h-5 w-5 text-red-500 cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>

      {/* Horizontal Separator */}
      <Separator className="my-4 bg-gray-200" />

      {/* Info + Description + Vertical Separator */}
      <div className="flex gap-6 items-stretch">
        {/* Deal Info (Left Column) */}
        <div className="flex flex-col gap-1 w-[55%]">
          <p className="text-sm text-gray-600">
            {typeLabel}
            {showValue && `: ${discountValue}`}
          </p>
          <p className="text-sm text-gray-500">
            Valid: {format(new Date(startDate), "PPP")} – {format(new Date(endDate), "PPP")}
          </p>
        </div>

        {/* Vertical Separator */}
        <div className="flex justify-center">
          <Separator orientation="vertical" className="h-full w-[1px] bg-gray-300" />
        </div>

        {/* Description (Right Column) */}
        <div className="w-[45%]">
          <p className="text-sm text-gray-700">
            {description?.trim()
              ? description
              : <span className="text-gray-400 italic">No description</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
