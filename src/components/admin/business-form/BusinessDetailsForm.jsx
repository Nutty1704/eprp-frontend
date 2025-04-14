import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const BusinessDetailsForm = ({ business, onInputChange }) => {
  return (
    <div className="mb-6">
      <div className="grid gap-6 pt-6">
        <div className="grid gap-2">
          <Label htmlFor="businessName">Name</Label>
          <Input 
            id="businessName"
            name="businessName"
            value={business.businessName}
            onChange={onInputChange}
            placeholder="Your business name"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">Business Description</Label>
          <Textarea 
            id="description"
            name="description"
            value={business.description}
            onChange={onInputChange}
            placeholder="Describe your business"
            className="min-h-[150px]"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <p className="text-sm text-gray-500 mb-1">This is your account's email address for receiving notifications</p>
          <Input 
            id="email"
            name="email"
            type="email"
            value={business.email}
            onChange={onInputChange}
            placeholder="your-email@example.com"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone number</Label>
            <div className="flex">
              <div className="w-16 flex-shrink-0">
                <Input 
                  value="+61"
                  readOnly
                  className="rounded-r-none text-center"
                />
              </div>
              <Input 
                id="phone"
                name="phone"
                value={business.phone}
                onChange={onInputChange}
                className="rounded-l-none flex-1"
                placeholder="9123 4567"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <Input 
              id="website"
              name="website"
              value={business.website}
              onChange={onInputChange}
              placeholder="yourwebsite.com.au"
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="address">Location</Label>
          <Input 
            id="address"
            name="address"
            value={business.address}
            onChange={onInputChange}
            placeholder="Ground Floor, Campus Centre, 21 Chancellors Walk"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;