
import HeroSection from "@/components/HeroSection";
import WordPressAboutSection from "@/components/WordPressAboutSection";
import WordPressServicesSection from "@/components/WordPressServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CareerSection from "@/components/CareerSection";
import EnquirySection from "@/components/EnquirySection";
import Footer from "@/components/Footer";
import FloatingNavigation from "@/components/FloatingNavigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <FloatingNavigation />
      <HeroSection />
      <WordPressAboutSection />
      <WordPressServicesSection />
      <IndustriesSection />
      <WhyChooseSection />
      <TeamSection />
      <TestimonialsSection />
      <CareerSection />
      <EnquirySection />
      <Footer />
    </div>
  );
};

export default Index;
