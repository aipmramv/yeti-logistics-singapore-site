
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users } from "lucide-react";
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery';

const CareerSection = () => {
  const { data: jobs, loading, error } = useSupabaseQuery<{
    id: string;
    title: string;
    type: string | null;
    location: string | null;
    description: string | null;
    requirements: string | null;
    benefits: string | null;
    department: string | null;
    display_order: number | null;
  }>('job_listings', '*', { is_published: true });

  if (loading) {
    return (
      <section id="careers" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 w-64 bg-gray-200 rounded mx-auto mb-16"></div>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="careers" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">Unable to load job listings. Please try again later.</p>
        </div>
      </section>
    );
  }

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
          {jobs.map((job) => {
            const requirements = job.requirements ? job.requirements.split('\n').filter(r => r.trim()) : [];
            return (
              <Card key={job.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                      {job.type && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      )}
                      {job.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {job.description && (
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {job.description}
                    </p>
                  )}
                  
                  {requirements.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => handleApply(job.title)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
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
