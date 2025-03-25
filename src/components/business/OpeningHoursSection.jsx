import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Separator } from "../ui/separator";

const days = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

const OpeningHoursSection = ({ openingHours, onHoursChange }) => {
  // Validate time slot
  const validateTimeSlot = (open, close) => {
    if (!open || !close) return false;
    
    const openTime = new Date(`2000-01-01T${open}`);
    const closeTime = new Date(`2000-01-01T${close}`);
    
    return closeTime > openTime;
  };
  
  // Handle checkbox change
  const handleIsOpenChange = (day, checked) => {
    onHoursChange(day, {
      ...openingHours[day],
      isOpen: checked,
      timeSlots: checked 
        ? openingHours[day].timeSlots.length > 0 
          ? openingHours[day].timeSlots 
          : [{ open: "10:00", close: "20:00" }]
        : []
    });
  };
  
  // Add a new time slot to a day
  const addTimeSlot = (day) => {
    const updatedTimeSlots = [
      ...openingHours[day].timeSlots,
      { open: "10:00", close: "20:00" }
    ];
    
    onHoursChange(day, {
      ...openingHours[day],
      timeSlots: updatedTimeSlots
    });
  };
  
  // Remove a time slot from a day
  const removeTimeSlot = (day, index) => {
    const updatedTimeSlots = [...openingHours[day].timeSlots];
    updatedTimeSlots.splice(index, 1);
    
    onHoursChange(day, {
      ...openingHours[day],
      timeSlots: updatedTimeSlots
    });
  };
  
  // Update a time slot
  const updateTimeSlot = (day, index, field, value) => {
    const updatedTimeSlots = [...openingHours[day].timeSlots];
    updatedTimeSlots[index] = {
      ...updatedTimeSlots[index],
      [field]: value
    };
    
    onHoursChange(day, {
      ...openingHours[day],
      timeSlots: updatedTimeSlots
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Opening Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <AlertDescription>
            You can add multiple time slots for split schedules (e.g., lunch and dinner hours).
          </AlertDescription>
        </Alert>
        <div className="space-y-4">
          {days.map((day) => (
            <div key={day.key} className="border rounded-md p-4">
              <div className="flex items-center mb-4">
                <Checkbox
                  id={`open-${day.key}`}
                  checked={openingHours[day.key]?.isOpen}
                  onCheckedChange={(checked) => 
                    handleIsOpenChange(day.key, checked)
                  }
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
                      <Input
                        type="time"
                        value={timeSlot.open}
                        onChange={(e) => 
                          updateTimeSlot(day.key, index, "open", e.target.value)
                        }
                        className="w-24 sm:w-32"
                      />
                      <span className="text-sm">—</span>
                      <Input
                        type="time"
                        value={timeSlot.close}
                        onChange={(e) => 
                          updateTimeSlot(day.key, index, "close", e.target.value)
                        }
                        className="w-24 sm:w-32"
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
        
        
      </CardContent>
    </Card>
  );
};

export default OpeningHoursSection;