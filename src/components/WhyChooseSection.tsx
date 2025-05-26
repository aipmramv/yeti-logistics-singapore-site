
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Users, Package, Truck } from "lucide-react";

const WhyChooseSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "20+ Years Experience",
      description: "Nearly two decades of proven expertise in Singapore's logistics industry"
    },
    {
      icon: Clock,
      title: "Timely Deliveries",
      description: "Reliable on-time delivery with real-time tracking and updates"
    },
    {
      icon: Shield,
      title: "BizSafe Certified",
      description: "Certified safety standards ensuring secure and compliant operations"
    },
    {
      icon: Package,
      title: "Tailored Solutions",
      description: "Customized logistics solutions designed to meet your specific business needs"
    },
    {
      icon: Users,
      title: "Trusted By Enterprises",
      description: "Preferred logistics partner for businesses across various industries"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Yeti Logistics
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference that comes with choosing a trusted logistics partner committed to your success.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Fix import issue
import { Calendar } from "lucide-react";

export default WhyChooseSection;
