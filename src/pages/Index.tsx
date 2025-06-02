
import HeroSection from "@/components/HeroSection";
import AppwriteAboutSection from "@/components/AppwriteAboutSection";
import AppwriteServicesSection from "@/components/AppwriteServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import AppwriteTeamSection from "@/components/AppwriteTeamSection";
import AppwriteTestimonialsSection from "@/components/AppwriteTestimonialsSection";
import AppwriteCareerSection from "@/components/AppwriteCareerSection";
import AppwriteEnquirySection from "@/components/AppwriteEnquirySection";
import AppwriteFooter from "@/components/AppwriteFooter";
import FloatingNavigation from "@/components/FloatingNavigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <FloatingNavigation />
      <HeroSection />
      <AppwriteAboutSection />
      <AppwriteServicesSection />
      <IndustriesSection />
      <WhyChooseSection />
      <AppwriteTeamSection />
      <AppwriteTestimonialsSection />
      <AppwriteCareerSection />
      <AppwriteEnquirySection />
      <AppwriteFooter />
    </div>
  );
};

export default Index;
