import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const days = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

const OpeningHoursSection = () => {
  const { control, setValue, watch } = useFormContext();
  const openingHours = watch("openingHours");
  
  // Validate time slot
  const validateTimeSlot = (open, close) => {
    if (!open || !close) return false;
    
    const openTime = new Date(`2000-01-01T${open}`);
    const closeTime = new Date(`2000-01-01T${close}`);
    
    return closeTime > openTime;
  };
  
  // Handle checkbox change
  const handleIsOpenChange = (day, checked) => {
    setValue(`openingHours.${day}`, {
      ...openingHours[day],
      isOpen: checked,
      timeSlots: checked 
        ? openingHours[day].timeSlots.length > 0 
          ? openingHours[day].timeSlots 
          : [{ open: "10:00", close: "20:00" }]
        : []
    }, { shouldValidate: true });
  };
  
  // Add a new time slot to a day
  const addTimeSlot = (day) => {
    const updatedTimeSlots = [
      ...openingHours[day].timeSlots,
      { open: "10:00", close: "20:00" }
    ];
    
    setValue(`openingHours.${day}.timeSlots`, updatedTimeSlots, { shouldValidate: true });
  };
  
  // Remove a time slot from a day
  const removeTimeSlot = (day, index) => {
    const updatedTimeSlots = [...openingHours[day].timeSlots];
    updatedTimeSlots.splice(index, 1);
    
    setValue(`openingHours.${day}.timeSlots`, updatedTimeSlots, { shouldValidate: true });
  };
  
  // Update a time slot
  const updateTimeSlot = (day, index, field, value) => {
    setValue(`openingHours.${day}.timeSlots.${index}.${field}`, value, { shouldValidate: true });
  };
  
  if (!openingHours) return null;
  
  return (
    <div>
      <div>
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <AlertDescription>
            You can add multiple time slots for split schedules (e.g., lunch and dinner hours).
          </AlertDescription>
        </Alert>
        <div className="space-y-4">
          {days.map((day) => (
            <div key={day.key} className="border rounded-md p-4">
              <div className="flex items-center mb-4">
                <Controller
                  name={`openingHours.${day.key}.isOpen`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id={`open-${day.key}`}
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        handleIsOpenChange(day.key, checked);
                      }}
                    />
                  )}
                />
                <Label
                  htmlFor={`open-${day.key}`}
                  className="ml-2 text-sm font-medium"
                >
                  {day.label}
                </Label>
              </div>
              
              {openingHours[day.key]?.isOpen ? (
                <div className="pl-6 space-y-3">
                  {openingHours[day.key].timeSlots.map((timeSlot, index) => (
                    <div key={index} className="flex flex-wrap items-center gap-2">
                      <Controller
                        name={`openingHours.${day.key}.timeSlots.${index}.open`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="time"
                            {...field}
                            className="w-24 sm:w-32"
                          />
                        )}
                      />
                      <span className="text-sm">—</span>
                      <Controller
                        name={`openingHours.${day.key}.timeSlots.${index}.close`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="time"
                            {...field}
                            className="w-24 sm:w-32"
                          />
                        )}
                      />
                      
                      {!validateTimeSlot(timeSlot.open, timeSlot.close) && (
                        <span className="text-xs text-red-500">
                          Closing time must be after opening time
                        </span>
                      )}
                      
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTimeSlot(day.key, index)}
                        disabled={openingHours[day.key].timeSlots.length <= 1}
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addTimeSlot(day.key)}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Time Slot
                  </Button>
                </div>
              ) : (
                <div className="pl-6 text-sm text-gray-500">Closed</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpeningHoursSection;