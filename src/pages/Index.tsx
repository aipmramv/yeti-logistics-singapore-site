
import HeroSection from "@/components/HeroSection";
import DecapAboutSection from "@/components/DecapAboutSection";
import DecapServicesSection from "@/components/DecapServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import DecapTeamSection from "@/components/DecapTeamSection";
import DecapTestimonialsSection from "@/components/DecapTestimonialsSection";
import DecapCareerSection from "@/components/DecapCareerSection";
import EnquirySection from "@/components/EnquirySection";
import Footer from "@/components/Footer";
import FloatingNavigation from "@/components/FloatingNavigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <FloatingNavigation />
      <HeroSection />
      <DecapAboutSection />
      <DecapServicesSection />
      <IndustriesSection />
      <WhyChooseSection />
      <DecapTeamSection />
      <DecapTestimonialsSection />
      <DecapCareerSection />
      <EnquirySection />
      <Footer />
    </div>
  );
};

export default Index;
