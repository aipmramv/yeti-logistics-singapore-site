
import { Card, CardContent } from "@/components/ui/card";
import { useDecapCollection } from '@/hooks/useDecapContent';

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
  order: number;
}

const DecapTeamSection = () => {
  const { data: teamMembers, loading, error } = useDecapCollection<TeamMember>('team');

  // Fallback team members
  const fallbackTeamMembers = [
    {
      name: "Mr. Vimalasan",
      position: "Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Leading strategic vision and company growth with over 20 years of industry experience.",
      order: 1
    },
    {
      name: "Mr. Louis Tan Chek Wei",
      position: "Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Overseeing operations and ensuring excellence in service delivery across all departments.",
      order: 2
    },
    {
      name: "Mr. RishiNathan",
      position: "Operations Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bio: "Managing day-to-day operations and optimizing logistics processes for maximum efficiency.",
      order: 3
    }
  ];

  const displayTeamMembers = (teamMembers && teamMembers.length > 0) ? teamMembers : fallbackTeamMembers;
  const sortedTeamMembers = displayTeamMembers.sort((a, b) => a.order - b.order);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
              <div className="h-1 bg-gray-300 rounded w-24 mx-auto mb-8"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-lg p-8 shadow-lg">
                  <div className="w-64 h-64 bg-gray-300 rounded mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
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
          {sortedTeamMembers.map((member, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4">
                    {member.position}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {error && (
          <div className="mt-8 text-center text-sm text-gray-500">
            Using fallback content. CMS status: {error}
          </div>
        )}
      </div>
    </section>
  );
};

export default DecapTeamSection;
