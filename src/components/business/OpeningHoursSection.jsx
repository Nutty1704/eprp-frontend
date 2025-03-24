import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Plus } from "lucide-react";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Opening Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {days.map((day) => (
            <div key={day.key} className="flex flex-col sm:flex-row sm:items-center border-b py-3">
              <div className="w-full sm:w-12 flex items-center mb-2 sm:mb-0">
                <Checkbox
                  id={`open-${day.key}`}
                  checked={openingHours[day.key]?.isOpen}
                  onCheckedChange={(checked) => 
                    onHoursChange(day.key, "isOpen", checked)
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
                <div className="flex flex-1 items-center justify-between sm:ml-8 pl-6 sm:pl-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Input
                      type="time"
                      value={openingHours[day.key]?.open || "10:00"}
                      onChange={(e) => 
                        onHoursChange(day.key, "open", e.target.value)
                      }
                      className="w-24 sm:w-32"
                    />
                    <span className="text-sm">—</span>
                    <Input
                      type="time"
                      value={openingHours[day.key]?.close || "20:00"}
                      onChange={(e) => 
                        onHoursChange(day.key, "close", e.target.value)
                      }
                      className="w-24 sm:w-32"
                    />
                  </div>
                  <Plus className="text-red-500 h-5 w-5 ml-2" />
                </div>
              ) : (
                <div className="sm:ml-8 pl-6 sm:pl-0 text-sm text-gray-500">Closed</div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpeningHoursSection;