
import HeroSection from "@/components/HeroSection";
import StrapiAboutSection from "@/components/StrapiAboutSection";
import StrapiServicesSection from "@/components/StrapiServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import StrapiTeamSection from "@/components/StrapiTeamSection";
import StrapiTestimonialsSection from "@/components/StrapiTestimonialsSection";
import StrapiCareerSection from "@/components/StrapiCareerSection";
import StrapiEnquirySection from "@/components/StrapiEnquirySection";
import StrapiFooter from "@/components/StrapiFooter";
import FloatingNavigation from "@/components/FloatingNavigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <FloatingNavigation />
      <HeroSection />
      <StrapiAboutSection />
      <StrapiServicesSection />
      <IndustriesSection />
      <WhyChooseSection />
      <StrapiTeamSection />
      <StrapiTestimonialsSection />
      <StrapiCareerSection />
      <StrapiEnquirySection />
      <StrapiFooter />
    </div>
  );
};

export default Index;
