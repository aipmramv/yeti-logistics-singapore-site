const IndustriesSection = () => {
  return (
    <section id="industries" className="py-20 bg-blue-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Industries We Serve
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto mb-8" />
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Specialized in food logistics with comprehensive cold chain solutions
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-8 text-blue-200">Food Logistics Excellence</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Fresh Produce</h4>
                  <p className="text-blue-100">Temperature-controlled handling of fresh fruits, vegetables, and perishable goods with strict quality protocols.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Frozen Foods</h4>
                  <p className="text-blue-100">Specialized frozen storage and transportation maintaining consistent sub-zero temperatures throughout the supply chain.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Perishable Goods</h4>
                  <p className="text-blue-100">Expert handling of time-sensitive perishables with optimized delivery routes and temperature monitoring.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Compliance & Assurance</h3>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">BizSafe Certified</h4>
                <p className="text-sm text-blue-100">Maintaining the highest safety standards in all operations</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Cold Chain Integrity</h4>
                <p className="text-sm text-blue-100">24/7 temperature monitoring and alert systems</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Quality Assurance</h4>
                <p className="text-sm text-blue-100">Rigorous quality control processes and documentation</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Regulatory Compliance</h4>
                <p className="text-sm text-blue-100">Full compliance with Singapore food safety regulations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
