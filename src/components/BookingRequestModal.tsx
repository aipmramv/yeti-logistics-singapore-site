import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

interface BookingRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { useStrapiCompanyInfo } from "@/hooks/useStrapi";

const BookingRequestModal = ({ isOpen, onClose }: BookingRequestModalProps) => {
  const { toast } = useToast();
  const { data: companyInfo } = useStrapiCompanyInfo();
  
  const [formData, setFormData] = useState({
    contactDetails: {
      name: '',
      company: '',
      email: '',
      phone: '',
    },
    serviceType: {
      supplyChain: false,
      coldChain: false,
      inventoryManagement: false,
      b2bDelivery: false,
      warehousing: false,
      others: false,
    },
    otherService: '',
    pickupLocation: {
      address: '',
      contactPerson: '',
      dateTime: undefined,
    },
    deliveryLocation: {
      address: '',
      contactPerson: '',
      dateTime: undefined,
    },
    cargoDetails: {
      description: '',
      totalWeight: '',
      numberOfPackages: '',
      dimensions: '',
      hazardous: false,
      temperatureControl: false,
    },
    specialRequests: '',
  });

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => {
      if (section === 'contactDetails' || section === 'pickupLocation' || section === 'deliveryLocation' || section === 'cargoDetails') {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      } else if (section === 'serviceType') {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      } else {
        return {
          ...prev,
          [section]: value,
        };
      }
    });
  };

  const resetForm = () => {
    setFormData({
      contactDetails: {
        name: '',
        company: '',
        email: '',
        phone: '',
      },
      serviceType: {
        supplyChain: false,
        coldChain: false,
        inventoryManagement: false,
        b2bDelivery: false,
        warehousing: false,
        others: false,
      },
      otherService: '',
      pickupLocation: {
        address: '',
        contactPerson: '',
        dateTime: undefined,
      },
      deliveryLocation: {
        address: '',
        contactPerson: '',
        dateTime: undefined,
      },
      cargoDetails: {
        description: '',
        totalWeight: '',
        numberOfPackages: '',
        dimensions: '',
        hazardous: false,
        temperatureControl: false,
      },
      specialRequests: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create booking request email content
    const emailSubject = encodeURIComponent(`Booking Request from ${formData.contactDetails.name}`);
    const servicesText = Object.entries(formData.serviceType)
      .filter(([_, selected]) => selected)
      .map(([service, _]) => service.replace(/([A-Z])/g, ' $1').trim())
      .join(', ');
    
    const emailBody = encodeURIComponent(`
Booking Request Details:

CONTACT DETAILS:
Name: ${formData.contactDetails.name}
Company: ${formData.contactDetails.company || 'Not provided'}
Email: ${formData.contactDetails.email}
Phone: ${formData.contactDetails.phone || 'Not provided'}

SERVICE TYPE:
${servicesText || 'Not specified'}
${formData.serviceType.others ? `Others: ${formData.otherService}` : ''}

PICKUP LOCATION:
Address: ${formData.pickupLocation.address || 'Not provided'}
Contact Person: ${formData.pickupLocation.contactPerson || 'Not provided'}
Date & Time: ${formData.pickupLocation.dateTime || 'Not provided'}

DELIVERY LOCATION:
Address: ${formData.deliveryLocation.address || 'Not provided'}
Contact Person: ${formData.deliveryLocation.contactPerson || 'Not provided'}
Date & Time: ${formData.deliveryLocation.dateTime || 'Not provided'}

CARGO DETAILS:
Description: ${formData.cargoDetails.description || 'Not provided'}
Total Weight: ${formData.cargoDetails.totalWeight || 'Not provided'} kg
Number of Packages: ${formData.cargoDetails.numberOfPackages || 'Not provided'}
Dimensions: ${formData.cargoDetails.dimensions || 'Not provided'}
Hazardous Cargo: ${formData.cargoDetails.hazardous ? 'Yes' : 'No'}
Temperature Control: ${formData.cargoDetails.temperatureControl ? 'Yes' : 'No'}

SPECIAL REQUESTS:
${formData.specialRequests || 'None'}

This booking request was submitted through the Yeti Logistics website.
    `);
    
    // Get company email from Strapi or use fallback
    const contactEmail = companyInfo?.attributes?.email || 'enquiry@yetilogistics.com';
    
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
      description: "We will contact you soon to confirm your booking details.",
    });
    
    // Reset form and close modal
    setFormData({
      contactDetails: {
        name: '',
        company: '',
        email: '',
        phone: '',
      },
      serviceType: {
        supplyChain: false,
        coldChain: false,
        inventoryManagement: false,
        b2bDelivery: false,
        warehousing: false,
        others: false,
      },
      otherService: '',
      pickupLocation: {
        address: '',
        contactPerson: '',
        dateTime: undefined,
      },
      deliveryLocation: {
        address: '',
        contactPerson: '',
        dateTime: undefined,
      },
      cargoDetails: {
        description: '',
        totalWeight: '',
        numberOfPackages: '',
        dimensions: '',
        hazardous: false,
        temperatureControl: false,
      },
      specialRequests: '',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Request a Booking</DialogTitle>
          <DialogDescription>
            Fill in the form to request a booking. We will contact you soon to
            confirm your booking details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  type="text"
                  id="name"
                  required
                  value={formData.contactDetails.name}
                  onChange={(e) => handleInputChange('contactDetails', 'name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  type="text"
                  id="company"
                  value={formData.contactDetails.company}
                  onChange={(e) => handleInputChange('contactDetails', 'company', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  id="email"
                  required
                  value={formData.contactDetails.email}
                  onChange={(e) => handleInputChange('contactDetails', 'email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  type="tel"
                  id="phone"
                  value={formData.contactDetails.phone}
                  onChange={(e) => handleInputChange('contactDetails', 'phone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Service Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Service Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="supplyChain"
                  checked={formData.serviceType.supplyChain}
                  onCheckedChange={(checked) => handleInputChange('serviceType', 'supplyChain', checked)}
                />
                <Label htmlFor="supplyChain" className="text-sm">Supply Chain Management</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="coldChain"
                  checked={formData.serviceType.coldChain}
                  onCheckedChange={(checked) => handleInputChange('serviceType', 'coldChain', checked)}
                />
                <Label htmlFor="coldChain" className="text-sm">Cold Chain Logistics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inventoryManagement"
                  checked={formData.serviceType.inventoryManagement}
                  onCheckedChange={(checked) => handleInputChange('serviceType', 'inventoryManagement', checked)}
                />
                <Label htmlFor="inventoryManagement" className="text-sm">Inventory Management</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="b2bDelivery"
                  checked={formData.serviceType.b2bDelivery}
                  onCheckedChange={(checked) => handleInputChange('serviceType', 'b2bDelivery', checked)}
                />
                <Label htmlFor="b2bDelivery" className="text-sm">B2B/B2C Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="warehousing"
                  checked={formData.serviceType.warehousing}
                  onCheckedChange={(checked) => handleInputChange('serviceType', 'warehousing', checked)}
                />
                <Label htmlFor="warehousing" className="text-sm">Warehousing Solutions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="others"
                  checked={formData.serviceType.others}
                  onCheckedChange={(checked) => handleInputChange('serviceType', 'others', checked)}
                />
                <Label htmlFor="others" className="text-sm">Others</Label>
              </div>
            </div>

            {formData.serviceType.others && (
              <div className="mt-3">
                <Label htmlFor="otherService">Other Service</Label>
                <Input
                  type="text"
                  id="otherService"
                  placeholder="Please specify..."
                  value={formData.otherService}
                  onChange={(e) => handleInputChange('otherService', '', e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Pickup Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Pickup Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pickupAddress">Address</Label>
                <Input
                  type="text"
                  id="pickupAddress"
                  value={formData.pickupLocation.address}
                  onChange={(e) => handleInputChange('pickupLocation', 'address', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="pickupContactPerson">Contact Person</Label>
                <Input
                  type="text"
                  id="pickupContactPerson"
                  value={formData.pickupLocation.contactPerson}
                  onChange={(e) => handleInputChange('pickupLocation', 'contactPerson', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="pickupDateTime">Preferred Date & Time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !formData.pickupLocation.dateTime && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.pickupLocation.dateTime ? (
                        format(formData.pickupLocation.dateTime, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.pickupLocation.dateTime}
                      onSelect={(date) => handleInputChange('pickupLocation', 'dateTime', date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Delivery Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Delivery Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deliveryAddress">Address</Label>
                <Input
                  type="text"
                  id="deliveryAddress"
                  value={formData.deliveryLocation.address}
                  onChange={(e) => handleInputChange('deliveryLocation', 'address', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="deliveryContactPerson">Contact Person</Label>
                <Input
                  type="text"
                  id="deliveryContactPerson"
                  value={formData.deliveryLocation.contactPerson}
                  onChange={(e) => handleInputChange('deliveryLocation', 'contactPerson', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="deliveryDateTime">Preferred Date & Time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !formData.deliveryLocation.dateTime && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deliveryLocation.dateTime ? (
                        format(formData.deliveryLocation.dateTime, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.deliveryLocation.dateTime}
                      onSelect={(date) => handleInputChange('deliveryLocation', 'dateTime', date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Cargo Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Cargo Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cargoDescription">Description</Label>
                <Input
                  type="text"
                  id="cargoDescription"
                  placeholder="e.g., Electronics, Food products"
                  value={formData.cargoDetails.description}
                  onChange={(e) => handleInputChange('cargoDetails', 'description', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cargoTotalWeight">Total Weight (kg)</Label>
                <Input
                  type="number"
                  id="cargoTotalWeight"
                  placeholder="0"
                  value={formData.cargoDetails.totalWeight}
                  onChange={(e) => handleInputChange('cargoDetails', 'totalWeight', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cargoNumberOfPackages">Number of Packages</Label>
                <Input
                  type="number"
                  id="cargoNumberOfPackages"
                  placeholder="0"
                  value={formData.cargoDetails.numberOfPackages}
                  onChange={(e) => handleInputChange('cargoDetails', 'numberOfPackages', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cargoDimensions">Dimensions (L x W x H)</Label>
                <Input
                  type="text"
                  id="cargoDimensions"
                  placeholder="e.g., 100 x 50 x 30 cm"
                  value={formData.cargoDetails.dimensions}
                  onChange={(e) => handleInputChange('cargoDetails', 'dimensions', e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cargoHazardous"
                  checked={formData.cargoDetails.hazardous}
                  onCheckedChange={(checked) => handleInputChange('cargoDetails', 'hazardous', checked)}
                />
                <Label htmlFor="cargoHazardous" className="text-sm">Hazardous Cargo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cargoTemperatureControl"
                  checked={formData.cargoDetails.temperatureControl}
                  onCheckedChange={(checked) => handleInputChange('cargoDetails', 'temperatureControl', checked)}
                />
                <Label htmlFor="cargoTemperatureControl" className="text-sm">Temperature Control Required</Label>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Special Requests</h3>
            <Textarea
              id="specialRequests"
              placeholder="Any special handling requirements or additional notes..."
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', '', e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Submit Booking Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingRequestModal;
