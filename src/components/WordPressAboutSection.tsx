
import { useWordPressPage } from '@/hooks/useWordPress';

const WordPressAboutSection = () => {
  const { data: aboutPage, loading, error } = useWordPressPage('about-yeti-logistics');

  // Fallback content in case WordPress is not available
  const fallbackContent = {
    story: "Founded in 2005, Yeti Logistics (S) Pte Ltd has been at the forefront of Singapore's logistics industry for nearly two decades. We began with a simple mission: to provide reliable, efficient supply chain solutions that businesses can trust.",
    mission: "To deliver excellence in logistics through innovative cold chain solutions, comprehensive warehousing, and reliable B2B/B2C delivery services, ensuring our clients' success in an ever-evolving marketplace.",
    vision: "To be Singapore's most trusted logistics partner, known for our commitment to trust, speed, and adaptability in serving businesses across all industries."
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-1 bg-gray-300 rounded w-24 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const content = aboutPage?.acf || fallbackContent;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {aboutPage?.title?.rendered || "About Yeti Logistics"}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
              <p className="text-gray-700 leading-relaxed">
                {content.story || fallbackContent.story}
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                {content.mission || fallbackContent.mission}
              </p>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                {content.vision || fallbackContent.vision}
              </p>
            </div>
          </div>
          
          <div className="lg:order-first">
            <img 
              src={content.image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=800&fit=crop"}
              alt="Modern logistics operations"
              className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
            />
          </div>
        </div>
        
        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {content.years_experience || "20+"}
            </div>
            <div className="text-gray-600 font-medium">Years of Excellence</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">Trust</div>
            <div className="text-gray-600 font-medium">Our Foundation</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">Speed</div>
            <div className="text-gray-600 font-medium">Our Promise</div>
          </div>
        </div>

        {error && (
          <div className="mt-8 text-center text-sm text-gray-500">
            Using cached content. WordPress connection: {error}
          </div>
        )}
      </div>
    </section>
  );
};

export default WordPressAboutSection;
