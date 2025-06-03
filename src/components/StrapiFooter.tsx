
import { Mail, Phone, MapPin } from "lucide-react";
import { useStrapiCompanyInfo } from "@/hooks/useStrapi";

const StrapiFooter = () => {
  const { data: companyInfo } = useStrapiCompanyInfo();

  // Fallback company info
  const fallbackCompany = {
    name: "Yeti Logistics (S) Pte Ltd",
    address: "123 Logistics Avenue\nSingapore 123456",
    phone: "+65 6123 4567",
    email: "enquiry@yetilogistics.com",
    registration: "201234567G",
    founded: 2004
  };

  const displayCompany = companyInfo?.attributes || fallbackCompany;

  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{displayCompany.name}</h3>
            <p className="text-gray-300 leading-relaxed">
              Singapore's trusted logistics partner since {displayCompany.founded}, delivering excellence in supply chain management, cold chain logistics, and comprehensive warehousing solutions.
            </p>
            <p className="text-sm text-gray-400">
              Registration: {displayCompany.registration}
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">{displayCompany.address}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href={`tel:${displayCompany.phone}`} className="text-gray-300 hover:text-blue-400 transition-colors">
                  {displayCompany.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${displayCompany.email}`} className="text-gray-300 hover:text-blue-400 transition-colors break-all">
                  {displayCompany.email}
                </a>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="leading-relaxed">Supply Chain Management</li>
              <li className="leading-relaxed">Cold Chain Logistics</li>
              <li className="leading-relaxed">Inventory Management</li>
              <li className="leading-relaxed">B2B/B2C Delivery</li>
              <li className="leading-relaxed">Warehousing Solutions</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {displayCompany.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default StrapiFooter;
