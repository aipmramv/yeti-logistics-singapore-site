
import { Mail, Phone, MapPin } from "lucide-react";
import { useCompanyInfo } from "@/hooks/useAppwriteContent";

interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  registration: string;
  founded: number;
}

const AppwriteFooter = () => {
  const { data: companyInfo } = useCompanyInfo();

  // Fallback company info
  const fallbackCompany = {
    name: "Yeti Logistics (S) Pte Ltd",
    address: "123 Logistics Avenue\nSingapore 123456",
    phone: "+65 6123 4567",
    email: "enquiry@yetilogistics.com",
    registration: "201234567G",
    founded: 2004
  };

  const displayCompany = companyInfo || fallbackCompany;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{displayCompany.name}</h3>
            <p className="text-gray-300 mb-4">
              Singapore's trusted logistics partner since {displayCompany.founded}, delivering excellence in supply chain management, cold chain logistics, and comprehensive warehousing solutions.
            </p>
            <p className="text-sm text-gray-400">
              Registration: {displayCompany.registration}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 whitespace-pre-line">{displayCompany.address}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href={`tel:${displayCompany.phone}`} className="text-gray-300 hover:text-blue-400 transition-colors">
                  {displayCompany.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${displayCompany.email}`} className="text-gray-300 hover:text-blue-400 transition-colors">
                  {displayCompany.email}
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Supply Chain Management</li>
              <li>Cold Chain Logistics</li>
              <li>Inventory Management</li>
              <li>B2B/B2C Delivery</li>
              <li>Warehousing Solutions</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {displayCompany.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppwriteFooter;
