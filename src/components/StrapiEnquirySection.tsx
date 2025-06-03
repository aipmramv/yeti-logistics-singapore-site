
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useStrapiCompanyInfo } from "@/hooks/useStrapi";

const StrapiEnquirySection = () => {
  const { toast } = useToast();
  const { data: companyInfo, loading: companyLoading } = useStrapiCompanyInfo();
  
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const services = [
    'Supply Chain Management',
    'Cold Chain Logistics',
    'Inventory Management',
    'B2B/B2C Delivery',
    'Warehousing Solutions',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const emailSubject = encodeURIComponent(`New Enquiry from ${formData.fullName}`);
    const emailBody = encodeURIComponent(`
New enquiry received from the website:

Name: ${formData.fullName}
Company: ${formData.company || 'Not provided'}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Service Interest: ${formData.service || 'Not specified'}

Message:
${formData.message}

This enquiry was submitted through the Yeti Logistics website contact form.
    `);
    
    // Get company email from Strapi or use fallback
    const contactEmail = companyInfo?.attributes?.email || 'enquiry@yetilogistics.com';
    
    // Open email client
    window.location.href = `mailto:${contactEmail}?subject=${emailSubject}&body=${emailBody}`;
    
    // Log to console
    console.log('Enquiry Form Submission:', {
      ...formData,
      submittedTo: contactEmail,
      timestamp: new Date().toISOString()
    });
    
    // Show success toast
    toast({
      title: "Enquiry Submitted Successfully!",
      description: "Thank you for your interest. We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  return (
    <section id="enquiry" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to optimize your logistics? Contact us today for a customized solution.
          </p>
          
          {!companyLoading && companyInfo?.attributes && (
            <div className="mt-8 text-center text-gray-600">
              <p className="mb-2">
                <strong>{companyInfo.attributes.name}</strong>
              </p>
              <p className="whitespace-pre-line mb-2">{companyInfo.attributes.address}</p>
              <p className="mb-1">
                <strong>Phone:</strong> {companyInfo.attributes.phone}
              </p>
              <p>
                <strong>Email:</strong> {companyInfo.attributes.email}
              </p>
            </div>
          )}
        </div>
        
        <Card className="shadow-2xl border-0">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service">Service Interest</Label>
                <Select onValueChange={(value) => handleInputChange('service', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  required
                  rows={5}
                  className="border-gray-300 focus:border-blue-500"
                  placeholder="Tell us about your logistics needs..."
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg transition-colors duration-300"
              >
                Submit Enquiry
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StrapiEnquirySection;
