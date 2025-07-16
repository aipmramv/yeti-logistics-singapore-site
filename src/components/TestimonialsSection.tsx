import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const { data: dbTestimonials, loading, error } = useSupabaseQuery<{
    id: string;
    quote: string;
    author: string;
    company: string | null;
    position: string | null;
    display_order: number | null;
  }>('testimonials', '*', { is_active: true });

  // Fallback testimonials if database is empty
  const fallbackTestimonials = [
    {
      quote: "Yeti Logistics has consistently provided reliable, efficient, and professional delivery services. Their drivers are punctual and committed, ensuring seamless logistics support for our operations.",
      author: "Danny Yow",
      company: "Cuisine Service Pte Ltd",
      position: "Operation Manager"
    },
    {
      quote: "Yeti has been a key partner in our operations. Their team handles challenges effortlessly and ensures timely, damage-free deliveries with exceptional customer support.",
      author: "Thomas",
      company: "Le Petit Depot Pte Ltd",
      position: "Warehouse Manager"
    },
    {
      quote: "For more than 10 years, Yeti Logistics has shown accountability, dedication, and superb service. We value their consistent support and look forward to continued collaboration.",
      author: "Jason Ng",
      company: "Baker's Oven Pattisseries",
      position: "Managing Director"
    },
    {
      quote: "Yeti Logistics stands out for punctuality, quick problem-solving, and unwavering reliability. Their team is proactive, responsive, and crucial to our success.",
      author: "Matias Alberto Mendez Saavedra",
      company: "Starter Lab Pte Ltd",
      position: "Executive Sous Chef"
    }
  ];

  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            What Our Clients Say
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto mb-8" />
        </div>
        
        <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <svg className="w-12 h-12 text-blue-400 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </div>
            
            <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed mb-8 text-white">
              "{testimonials[currentTestimonial].quote}"
            </blockquote>
            
            <div className="border-t border-white/20 pt-6">
              <div className="font-bold text-lg text-blue-200">
                {testimonials[currentTestimonial].author}
              </div>
              <div className="text-blue-300">
                {testimonials[currentTestimonial].position}
              </div>
              <div className="text-blue-400 text-sm">
                {testimonials[currentTestimonial].company}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? 'bg-blue-400' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
