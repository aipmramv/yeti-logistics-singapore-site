
import { Card, CardContent } from "@/components/ui/card";
import { Package, Truck, Warehouse, Timer, Package2 } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Package2,
      title: "Supply Chain Management",
      description: "We manage your supply chain with precision, transparency, and adaptability. End-to-end supply chain optimization with real-time tracking and analytics for maximum efficiency."
    },
    {
      icon: Timer,
      title: "Cold Chain Management",
      description: "We provide temperature-sensitive goods with innovative cold chain systems and real-time monitoring. Temperature-controlled transportation and storage solutions ensuring product integrity from origin to destination."
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Our systems help you reduce waste, cut costs, and stay ahead of demand. Smart inventory solutions with automated tracking, real-time updates, and optimized stock levels."
    },
    {
      icon: Truck,
      title: "B2B/B2C Delivery Specialist",
      description: "From large-scale business orders to doorstep deliveries, we deliver promptly, with care, and consistency. Reliable delivery services for both business and consumer markets with flexible scheduling options."
    },
    {
      icon: Warehouse,
      title: "Strategic Warehousing",
      description: "Our scalable warehouse spaces are designed for efficiency, flexibility, and growth. State-of-the-art warehousing facilities with climate control and advanced security systems."
    }
  ];

  return (
    <section id="services" className="py-16 lg:py-20 bg-gray-50 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto" />
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive logistics solutions tailored to meet your business needs with precision and reliability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg h-full">
              <CardContent className="p-6 lg:p-8 text-center h-full flex flex-col">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
