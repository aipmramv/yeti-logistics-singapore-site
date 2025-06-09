
import { useDecapContent } from "@/hooks/useDecapContent";

interface AboutInfo {
  title: string;
  story: string;
  mission: string;
  vision: string;
  years_experience: string;
  target_audience: string;
  key_values: string;
  image: string;
}

const AboutSection = () => {
  const { data: aboutInfo } = useDecapContent<AboutInfo>('/content/pages/about.md');

  // Fallback content
  const fallbackAbout = {
    title: "About Yeti Logistics",
    story: "Yeti Logistics (S) Pte Ltd was established on 24 August 2005. Yeti Logistics is a seasoned logistics provider with many years of expertise in delivering comprehensive supply chain solutions to businesses of all sizes.",
    mission: "To deliver smart, reliable logistics solutions.",
    vision: "To be your preferred logistics partner.",
    years_experience: "19+",
    target_audience: "Our primary clients are medium-sized enterprises and large organizations across a range of food industries that require efficient and scalable logistics solutions.",
    key_values: "The company's extensive experience allows them to adapt to the evolving needs of their customers, providing innovative solutions that meet the demands of a rapidly changing market.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=800&fit=crop"
  };

  const displayAbout = aboutInfo || fallbackAbout;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {displayAbout.title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
              <p className="text-gray-700 leading-relaxed">
                {displayAbout.story}
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                {displayAbout.mission}
              </p>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                {displayAbout.vision}
              </p>
            </div>
          </div>
          
          <div className="lg:order-first">
            <img 
              src={displayAbout.image}
              alt="Modern logistics operations"
              className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
            />
          </div>
        </div>
        
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Target Audience</h3>
            <p className="text-blue-100 leading-relaxed mb-6">
              {displayAbout.target_audience}
            </p>
            <h4 className="text-xl font-semibold mb-3">Key Values</h4>
            <p className="text-blue-100 leading-relaxed">
              {displayAbout.key_values}
            </p>
          </div>
        </div>
        
        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">{displayAbout.years_experience}</div>
            <div className="text-gray-600 font-medium">Years of Excellence</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">Trust</div>
            <div className="text-gray-600 font-medium">Our Foundation</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">Innovation</div>
            <div className="text-gray-600 font-medium">Our Approach</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
