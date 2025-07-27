import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BookingRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingRequestModal = ({ isOpen, onClose }: BookingRequestModalProps) => {
  const [formData, setFormData] = useState({
    // Contact Details
    name: "",
    company: "",
    email: "",
    phone: "",
    serviceType: "",
    
    // Pickup Location
    pickupAddress: "",
    pickupContact: "",
    pickupDate: undefined as Date | undefined,
    
    // Delivery Location
    deliveryAddress: "",
    deliveryContact: "",
    deliveryDate: undefined as Date | undefined,
    
    // Cargo Details
    cargoDescription: "",
    totalWeight: "",
    numberOfPackages: "",
    dimensions: "",
    hazardousCargo: false,
    temperatureControl: false,
    specialRequests: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Booking Request from ${formData.name}`;
    const text = `BOOKING REQUEST DETAILS\n\nContact Details:\nName: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService Type: ${formData.serviceType}\n\nPickup Location:\nAddress: ${formData.pickupAddress}\nContact Person: ${formData.pickupContact}\nPreferred Date & Time: ${formData.pickupDate ? format(formData.pickupDate, "PPP") : "Not specified"}\n\nDelivery Location:\nAddress: ${formData.deliveryAddress}\nContact Person: ${formData.deliveryContact}\nPreferred Date & Time: ${formData.deliveryDate ? format(formData.deliveryDate, "PPP") : "Not specified"}\n\nCargo Details:\nDescription: ${formData.cargoDescription}\nTotal Weight: ${formData.totalWeight} kg\nNumber of Packages: ${formData.numberOfPackages}\nDimensions: ${formData.dimensions}\nHazardous Cargo: ${formData.hazardousCargo ? "Yes" : "No"}\nTemperature Control Required: ${formData.temperatureControl ? "Yes" : "No"}\n\nSpecial Requests:\n${formData.specialRequests}`;
    const html = `<h2>Booking Request Details</h2><h3>Contact Details</h3><p><strong>Name:</strong> ${formData.name}</p><p><strong>Company:</strong> ${formData.company}</p><p><strong>Email:</strong> ${formData.email}</p><p><strong>Phone:</strong> ${formData.phone}</p><p><strong>Service Type:</strong> ${formData.serviceType}</p><h3>Pickup Location</h3><p><strong>Address:</strong> ${formData.pickupAddress}</p><p><strong>Contact Person:</strong> ${formData.pickupContact}</p><p><strong>Preferred Date & Time:</strong> ${formData.pickupDate ? format(formData.pickupDate, "PPP") : "Not specified"}</p><h3>Delivery Location</h3><p><strong>Address:</strong> ${formData.deliveryAddress}</p><p><strong>Contact Person:</strong> ${formData.deliveryContact}</p><p><strong>Preferred Date & Time:</strong> ${formData.deliveryDate ? format(formData.deliveryDate, "PPP") : "Not specified"}</p><h3>Cargo Details</h3><p><strong>Description:</strong> ${formData.cargoDescription}</p><p><strong>Total Weight:</strong> ${formData.totalWeight} kg</p><p><strong>Number of Packages:</strong> ${formData.numberOfPackages}</p><p><strong>Dimensions:</strong> ${formData.dimensions}</p><p><strong>Hazardous Cargo:</strong> ${formData.hazardousCargo ? "Yes" : "No"}</p><p><strong>Temperature Control Required:</strong> ${formData.temperatureControl ? "Yes" : "No"}</p><h3>Special Requests</h3><p>${formData.specialRequests}</p>`;

    // Send email via API
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, text, html })
    })
      .then(() => {
        toast.success("Booking request sent! Thank you.");
        onClose();
      })
      .catch(() => {
        toast.error("Failed to send booking request email.");
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prevFormData: typeof formData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked
    }));
  };

  const handleDateChange = (name: string, date: Date | undefined) => {
    setFormData({
      ...formData,
      [name]: date
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Request a Booking
          </DialogTitle>
          <p className="text-center text-gray-600 mt-2">
            Fill in the form to request a booking. We will contact you soon to confirm your booking details.
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your Company Name"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Label htmlFor="serviceType">Service Type *</Label>
              <select
                id="serviceType"
                name="serviceType"
                required
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a service</option>
                <option value="supply-chain">Supply Chain Management</option>
                <option value="cold-chain">Cold Chain Logistics</option>
                <option value="inventory">Inventory Management</option>
                <option value="delivery">B2B/B2C Delivery</option>
                <option value="warehousing">Warehousing Solutions</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>

          {/* Pickup Location */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pickup Location</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pickupAddress">Address *</Label>
                <Input
                  id="pickupAddress"
                  name="pickupAddress"
                  type="text"
                  required
                  placeholder="Pickup Address"
                  value={formData.pickupAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="pickupContact">Contact Person *</Label>
                <Input
                  id="pickupContact"
                  name="pickupContact"
                  type="text"
                  required
                  placeholder="Name of contact at pickup"
                  value={formData.pickupContact}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Label>Preferred Date & Time *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.pickupDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.pickupDate ? format(formData.pickupDate, "PPP") : <span>Pick a pickup date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.pickupDate}
                    onSelect={(date) => handleDateChange("pickupDate", date)}
                    className="p-3 pointer-events-auto"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Delivery Location */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Location</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deliveryAddress">Address *</Label>
                <Input
                  id="deliveryAddress"
                  name="deliveryAddress"
                  type="text"
                  required
                  placeholder="Delivery Address"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="deliveryContact">Contact Person *</Label>
                <Input
                  id="deliveryContact"
                  name="deliveryContact"
                  type="text"
                  required
                  placeholder="Name of contact at delivery"
                  value={formData.deliveryContact}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Label>Preferred Date & Time *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.deliveryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.deliveryDate ? format(formData.deliveryDate, "PPP") : <span>Pick a delivery date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.deliveryDate}
                    onSelect={(date) => handleDateChange("deliveryDate", date)}
                    className="p-3 pointer-events-auto"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Cargo Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cargo Details</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cargoDescription">Description *</Label>
                <Input
                  id="cargoDescription"
                  name="cargoDescription"
                  type="text"
                  required
                  placeholder="e.g., Electronics, Food products"
                  value={formData.cargoDescription}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="totalWeight">Total Weight (kg)</Label>
                  <Input
                    id="totalWeight"
                    name="totalWeight"
                    type="number"
                    placeholder="0"
                    value={formData.totalWeight}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="numberOfPackages">Number of Packages</Label>
                  <Input
                    id="numberOfPackages"
                    name="numberOfPackages"
                    type="number"
                    placeholder="0"
                    value={formData.numberOfPackages}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="dimensions">Dimensions (L x W x H)</Label>
                  <Input
                    id="dimensions"
                    name="dimensions"
                    type="text"
                    placeholder="e.g., 100 x 50 x 30 cm"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hazardousCargo"
                    checked={formData.hazardousCargo}
                    onCheckedChange={(checked) => handleCheckboxChange("hazardousCargo", checked as boolean)}
                  />
                  <Label htmlFor="hazardousCargo">Hazardous Cargo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="temperatureControl"
                    checked={formData.temperatureControl}
                    onCheckedChange={(checked) => handleCheckboxChange("temperatureControl", checked as boolean)}
                  />
                  <Label htmlFor="temperatureControl">Temperature Control Required</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Requests</h3>
            <div>
              <Label htmlFor="specialRequests">Any special handling requirements or additional notes...</Label>
              <Textarea
                id="specialRequests"
                name="specialRequests"
                rows={4}
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Type your special requests here."
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Submit Booking Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingRequestModal;
