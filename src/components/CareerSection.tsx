import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users } from "lucide-react";

const CareerSection = () => {
  const jobs = [
    {
      title: "Class 3 Drivers",
      type: "Full-time",
      location: "Singapore",
      description: "Join our team of professional drivers and be part of our reliable delivery network. Valid Class 3 license required.",
      requirements: ["Valid Class 3 driving license", "Clean driving record", "Customer service oriented", "Physical fitness"]
    },
    {
      title: "Warehouse Packers",
      type: "Full-time",
      location: "Singapore",
      description: "Work in our modern warehouse facilities handling packaging and inventory management with growth opportunities.",
      requirements: ["Physical ability to lift packages", "Attention to detail", "Team player", "Previous warehouse experience preferred"]
    },
    {
      title: "Logistics Coordinator",
      type: "Full-time",
      location: "Singapore",
      description: "Coordinate logistics operations and ensure smooth supply chain processes. Great opportunity for career advancement.",
      requirements: ["Logistics or supply chain experience", "Strong communication skills", "Computer proficiency", "Problem-solving abilities"]
    }
  ];

  const handleApply = (jobTitle: string) => {
    const subject = encodeURIComponent(`Application for ${jobTitle} Position`);
    const body = encodeURIComponent(`Dear Hiring Manager,

I am interested in applying for the ${jobTitle} position at Yeti Logistics (S) Pte Ltd.

Please find my application details below:

Name: 
Phone: 
Experience: 

Thank you for your consideration.

Best regards,`);
    
    window.location.href = `mailto:enquiry@yetilogistics.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="careers" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Join Our Team
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of Singapore's leading logistics company and grow your career with us.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {job.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {job.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  onClick={() => handleApply(job.title)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Don't see a position that fits? We're always looking for talented individuals.
          </p>
          <Button 
            onClick={() => handleApply('General Application')}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Send General Application
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
