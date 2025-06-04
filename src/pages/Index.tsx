
import HeroSection from "@/components/HeroSection";
import PagesAboutSection from "@/components/PagesAboutSection";
import PagesServicesSection from "@/components/PagesServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import PagesTeamSection from "@/components/PagesTeamSection";
import PagesTestimonialsSection from "@/components/PagesTestimonialsSection";
import PagesCareerSection from "@/components/PagesCareerSection";
import EnquirySection from "@/components/EnquirySection";
import Footer from "@/components/Footer";
import FloatingNavigation from "@/components/FloatingNavigation";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <FloatingNavigation />
      <main className="w-full">
        <HeroSection />
        <PagesAboutSection />
        <PagesServicesSection />
        <IndustriesSection />
        <WhyChooseSection />
        <PagesTeamSection />
        <PagesTestimonialsSection />
        <PagesCareerSection />
        <EnquirySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
