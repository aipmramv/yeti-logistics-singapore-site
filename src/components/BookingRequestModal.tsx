
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useCompanyInfo } from "@/hooks/useAppwriteContent";

interface BookingRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingRequestModal = ({ isOpen, onClose }: BookingRequestModalProps) => {
  const { toast } = useToast();
  const { data: companyInfo } = useCompanyInfo();
  
  const [formData, setFormData] = useState({
    // Contact Details
    name: '',
    companyName: '',
    email: '',
    phone: '',
    
    // Service Type
    serviceTypes: [] as string[],
    otherService: '',
    
    // Pickup Location
    pickupAddress: '',
    pickupContact: '',
    pickupDateTime: '',
    
    // Delivery Location
    deliveryAddress: '',
    deliveryContact: '',
    deliveryDateTime: '',
    
    // Cargo Details
    goodsDescription: '',
    totalWeight: '',
    numberOfPackages: '',
    dimensions: '',
    hazardousCargo: false,
    temperatureControl: false,
    
    // Special Requests
    specialRequests: ''
  });

  const serviceOptions = ['Local Delivery', 'Import', 'Export', 'Warehousing', 'Others'];

  const handleServiceTypeChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        serviceTypes: [...prev.serviceTypes, service]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        serviceTypes: prev.serviceTypes.filter(s => s !== service)
      }));
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const services = formData.serviceTypes.includes('Others') 
      ? [...formData.serviceTypes.filter(s => s !== 'Others'), formData.otherService].filter(Boolean)
      : formData.serviceTypes;
    
    const emailSubject = encodeURIComponent(`Booking Request from ${formData.name}`);
    const emailBody = encodeURIComponent(`
BOOKING REQUEST

Contact Details:
Name: ${formData.name}
Company: ${formData.companyName || 'Not provided'}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

Service Type: ${services.join(', ') || 'Not specified'}

Pickup Location:
Address: ${formData.pickupAddress}
Contact Person: ${formData.pickupContact}
Date & Time: ${formData.pickupDateTime}

Delivery Location:
Address: ${formData.deliveryAddress}
Contact Person: ${formData.deliveryContact}
Date & Time: ${formData.deliveryDateTime}

Cargo Details:
Description: ${formData.goodsDescription}
Total Weight: ${formData.totalWeight} kg
Number of Packages: ${formData.numberOfPackages}
Dimensions: ${formData.dimensions || 'Not specified'}
Hazardous Cargo: ${formData.hazardousCargo ? 'Yes' : 'No'}
Temperature Control: ${formData.temperatureControl ? 'Yes' : 'No'}

Special Requests:
${formData.specialRequests || 'None'}

This booking request was submitted through the Yeti Logistics website.
    `);
    
    // Get company email
    const contactEmail = companyInfo?.email || 'enquiry@yetilogistics.com';
    
    // Open email client
    window.location.href = `mailto:${contactEmail}?subject=${emailSubject}&body=${emailBody}`;
    
    // Log to console
    console.log('Booking Request Submission:', {
      ...formData,
      submittedTo: contactEmail,
      timestamp: new Date().toISOString()
    });
    
    // Show success toast
    toast({
      title: "Thanks for booking!",
      description: "We will contact you soon to confirm your booking request.",
    });
    
    // Reset form and close modal
    setFormData({
      name: '', companyName: '', email: '', phone: '',
      serviceTypes: [], otherService: '',
      pickupAddress: '', pickupContact: '', pickupDateTime: '',
      deliveryAddress: '', deliveryContact: '', deliveryDateTime: '',
      goodsDescription: '', totalWeight: '', numberOfPackages: '', dimensions: '',
      hazardousCargo: false, temperatureControl: false,
      specialRequests: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Booking Request Form</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">1. Contact Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Service Type */}
          <div>
            <h3 className="text-lg font-semibold mb-4">2. Service Type</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {serviceOptions.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={formData.serviceTypes.includes(service)}
                    onCheckedChange={(checked) => handleServiceTypeChange(service, checked as boolean)}
                  />
                  <Label htmlFor={service}>{service}</Label>
                </div>
              ))}
            </div>
            {formData.serviceTypes.includes('Others') && (
              <div className="mt-4">
                <Label htmlFor="otherService">Please specify:</Label>
                <Input
                  id="otherService"
                  value={formData.otherService}
                  onChange={(e) => handleInputChange('otherService', e.target.value)}
                  placeholder="Specify other service..."
                />
              </div>
            )}
          </div>

          {/* Pickup Location */}
          <div>
            <h3 className="text-lg font-semibold mb-4">3. Pickup Location</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="pickupAddress">Address</Label>
                <Textarea
                  id="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="pickupContact">Contact Person</Label>
                <Input
                  id="pickupContact"
                  value={formData.pickupContact}
                  onChange={(e) => handleInputChange('pickupContact', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="pickupDateTime">Date & Time</Label>
                <Input
                  id="pickupDateTime"
                  type="datetime-local"
                  value={formData.pickupDateTime}
                  onChange={(e) => handleInputChange('pickupDateTime', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Delivery Location */}
          <div>
            <h3 className="text-lg font-semibold mb-4">4. Delivery Location</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="deliveryAddress">Address</Label>
                <Textarea
                  id="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="deliveryContact">Contact Person</Label>
                <Input
                  id="deliveryContact"
                  value={formData.deliveryContact}
                  onChange={(e) => handleInputChange('deliveryContact', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="deliveryDateTime">Date & Time</Label>
                <Input
                  id="deliveryDateTime"
                  type="datetime-local"
                  value={formData.deliveryDateTime}
                  onChange={(e) => handleInputChange('deliveryDateTime', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Cargo Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">5. Cargo Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="goodsDescription">Description of Goods</Label>
                <Textarea
                  id="goodsDescription"
                  value={formData.goodsDescription}
                  onChange={(e) => handleInputChange('goodsDescription', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="totalWeight">Total Weight (kg)</Label>
                <Input
                  id="totalWeight"
                  type="number"
                  value={formData.totalWeight}
                  onChange={(e) => handleInputChange('totalWeight', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="numberOfPackages">Number of Packages</Label>
                <Input
                  id="numberOfPackages"
                  type="number"
                  value={formData.numberOfPackages}
                  onChange={(e) => handleInputChange('numberOfPackages', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="dimensions">Dimensions (if known)</Label>
                <Input
                  id="dimensions"
                  value={formData.dimensions}
                  onChange={(e) => handleInputChange('dimensions', e.target.value)}
                  placeholder="L x W x H"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hazardousCargo"
                  checked={formData.hazardousCargo}
                  onCheckedChange={(checked) => handleInputChange('hazardousCargo', checked as boolean)}
                />
                <Label htmlFor="hazardousCargo">Hazardous Cargo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="temperatureControl"
                  checked={formData.temperatureControl}
                  onCheckedChange={(checked) => handleInputChange('temperatureControl', checked as boolean)}
                />
                <Label htmlFor="temperatureControl">Temperature Control Needed</Label>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <h3 className="text-lg font-semibold mb-4">6. Special Requests</h3>
            <Textarea
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder="e.g., tailgate, manpower, permit help"
              rows={3}
            />
          </div>

          {/* Upload File */}
          <div>
            <h3 className="text-lg font-semibold mb-4">7. Upload File (Optional)</h3>
            <Input type="file" />
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingRequestModal;
