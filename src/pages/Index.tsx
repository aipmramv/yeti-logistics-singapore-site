
import HeroSection from "@/components/HeroSection";
import WordPressAboutSection from "@/components/WordPressAboutSection";
import WordPressServicesSection from "@/components/WordPressServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import WordPressTeamSection from "@/components/WordPressTeamSection";
import WordPressTestimonialsSection from "@/components/WordPressTestimonialsSection";
import WordPressCareerSection from "@/components/WordPressCareerSection";
import WordPressEnquirySection from "@/components/WordPressEnquirySection";
import WordPressFooter from "@/components/WordPressFooter";
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
      <WordPressTeamSection />
      <WordPressTestimonialsSection />
      <WordPressCareerSection />
      <WordPressEnquirySection />
      <WordPressFooter />
    </div>
  );
};

export default Index;
