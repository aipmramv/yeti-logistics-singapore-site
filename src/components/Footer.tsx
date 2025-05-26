
import { MapPin, Phone, Mail, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-blue-400">
              Yeti Logistics (S) Pte Ltd
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Your trusted logistics partner in Singapore since 2005. Delivering excellence in cold chain, warehousing, and supply chain management with reliability and innovation.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-blue-400">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Singapore<br />
                    (Detailed address available upon request)
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a 
                  href="tel:+6587850107" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  +65 8785 0107
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a 
                  href="mailto:enquiry@yetilogistics.com" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  enquiry@yetilogistics.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-blue-400">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Supply Chain Management</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Cold Chain Logistics</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Inventory Management</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">B2B/B2C Delivery</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Warehousing Solutions</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Yeti Logistics (S) Pte Ltd. All rights reserved. | BizSafe Certified | Established 2005
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
