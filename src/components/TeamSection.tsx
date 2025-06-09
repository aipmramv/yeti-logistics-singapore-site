
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Mr. Vimalasan",
      position: "Director",
      bio: "Mr Vimalasan brings with him over two decades of hands-on experience in the logistics and supply chain industry. Known for his strategic mindset and operational expertise, he has successfully overseen the development and execution of complex logistics networks across regional markets. His leadership style emphasizes efficiency, customer satisfaction, and continuous innovation. Mr Vimalasan's in-depth understanding of warehousing, transportation, and last-mile delivery operations has been instrumental in positioning the company as a trusted logistics partner for SMEs."
    },
    {
      name: "Mr. Louis Tan Chek Wei",
      position: "Director",
      bio: "Mr Louis Tan Chek Wei is a seasoned logistics professional with a proven track record in supply chain management, distribution planning, and business development. With extensive experience in local, air, ocean international operations, Mr Louis has a strong reputation for delivering scalable solutions tailored to clients' unique business needs. His focus strategies has led to significant improvements in operational performance and cost efficiency across projects. His collaborative leadership fosters innovation and a results-driven culture within the team."
    },
    {
      name: "Mr. RishiNathan",
      position: "Operations Manager",
      bio: "Mr RishiNathan has grown significantly within the organization, having developed his expertise under the direct mentorship of Directors Mr Vimalasan and Mr Louis Tan Chek Wei. Through years of hands-on experience and close collaboration with leadership, he has built a deep understanding of day-to-day logistics operations, warehouse management, and delivery coordination. Known for his commitment to operational excellence, Mr Rishi plays a critical role in ensuring smooth execution across all logistics functions. His leadership on the ground ensures that service standards are consistently met, and client expectations are exceeded."
    }
  ];

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The experienced professionals behind Yeti Logistics' success story.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="relative overflow-hidden bg-gray-200 h-64 flex items-center justify-center">
                  <User className="w-20 h-20 text-gray-400" />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
                    400x400
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4">
                    {member.position}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {member.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
