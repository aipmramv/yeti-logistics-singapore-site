
import { Card, CardContent } from "@/components/ui/card";
import { Package, Truck, Warehouse, Timer, Package2 } from "lucide-react";
import { useWordPressCustomPosts } from '@/hooks/useWordPress';

const WordPressServicesSection = () => {
  const { data: wpServices, loading, error } = useWordPressCustomPosts('services', { per_page: 10 });

  // Fallback services
  const fallbackServices = [
    {
      icon: Package2,
      title: "Supply Chain Management",
      description: "End-to-end supply chain optimization with real-time tracking and analytics for maximum efficiency."
    },
    {
      icon: Timer,
      title: "Cold Chain Logistics", 
      description: "Temperature-controlled transportation and storage solutions ensuring product integrity from origin to destination."
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Smart inventory solutions with automated tracking, real-time updates, and optimized stock levels."
    },
    {
      icon: Truck,
      title: "B2B/B2C Delivery",
      description: "Reliable delivery services for both business and consumer markets with flexible scheduling options."
    },
    {
      icon: Warehouse,
      title: "Warehousing Solutions",
      description: "State-of-the-art warehousing facilities with climate control and advanced security systems."
    }
  ];

  const iconMap: { [key: string]: any } = {
    'supply-chain': Package2,
    'cold-chain': Timer,
    'inventory': Package,
    'delivery': Truck,
    'warehousing': Warehouse
  };

  const services = wpServices?.map(service => ({
    icon: iconMap[service.acf?.icon_key] || Package,
    title: service.title?.rendered || service.acf?.title,
    description: service.acf?.description || service.content?.rendered?.replace(/<[^>]*>/g, '')
  })) || fallbackServices;

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
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-lg p-8 shadow-lg">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-6"></div>
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
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive logistics solutions tailored to meet your business needs with precision and reliability.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
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

export default WordPressServicesSection;
