
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import { useStrapiJobs } from '@/hooks/useStrapi';

const StrapiCareerSection = () => {
  const { data: jobs, loading, error } = useStrapiJobs();

  // Fallback jobs
  const fallbackJobs = [
    {
      attributes: {
        title: "Class 3 Drivers",
        type: "Full-time",
        location: "Singapore",
        department: "Operations",
        description: "Join our team of professional drivers and be part of our reliable delivery network. Valid Class 3 license required.",
        requirements: "Valid Class 3 driving license\nClean driving record\nCustomer service oriented\nPhysical fitness",
        published: true
      }
    },
    {
      attributes: {
        title: "Warehouse Packers",
        type: "Full-time",
        location: "Singapore",
        department: "Warehouse",
        description: "Work in our modern warehouse facilities handling packaging and inventory management with growth opportunities.",
        requirements: "Physical ability to lift packages\nAttention to detail\nTeam player\nPrevious warehouse experience preferred",
        published: true
      }
    },
    {
      attributes: {
        title: "Logistics Coordinator",
        type: "Full-time",
        location: "Singapore",
        department: "Operations",
        description: "Coordinate logistics operations and ensure smooth supply chain processes. Great opportunity for career advancement.",
        requirements: "Logistics or supply chain experience\nStrong communication skills\nComputer proficiency\nProblem-solving abilities",
        published: true
      }
    }
  ];

  const displayJobs = (jobs && jobs.length > 0) ? jobs.filter(job => job.attributes?.published) : fallbackJobs;

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

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
              <div className="h-1 bg-gray-300 rounded w-24 mx-auto mb-8"></div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-20 bg-gray-300 rounded mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
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
          {displayJobs.map((job, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {job.attributes.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.attributes?.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.attributes?.location}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {job.attributes?.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    {job.attributes?.requirements?.split('\n').map((req: string, reqIndex: number) => (
                      <div key={reqIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        {req}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleApply(job.attributes.title)}
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

        {error && (
          <div className="mt-8 text-center text-sm text-gray-500">
            Using fallback content. Strapi status: {error}
          </div>
        )}
      </div>
    </section>
  );
};

export default StrapiCareerSection;
