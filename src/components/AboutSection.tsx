
const AboutSection = () => {
  const aboutInfo = {
    title: "About Yeti Logistics",
    story: "Yeti Logistics (S) Pte Ltd was established on 24 August 2005. Yeti Logistics is a seasoned logistics provider with many years of expertise in delivering comprehensive supply chain solutions to businesses of all sizes. Specialising in a wide range of services, Yeti Logistics ensures that every aspect of your logistical needs is handled with utmost precision and efficiency. From the transportation of goods to managing intricate warehouse operations, Yeti Logistics offers a full suite of services designed to streamline operations and enhance the customer experience. Backed by many years of experience in the logistics industry, Yeti Logistics has a proven track record of delivering high-quality services to clients across various sectors.",
    mission: "To deliver smart, reliable logistics solutions.",
    vision: "To be your preferred logistics partner.",
    years_experience: "19+",
    target_audience: "Our primary clients are medium-sized enterprises and large organizations across a range of food industries that require efficient and scalable logistics solutions. These businesses often face challenges such as inefficient delivery operations impacting customer satisfaction and cost, limited or disorganized warehousing capacity that slows down inventory management, and complex logistics coordination that consumes time and internal resources.",
    key_values: "The company's extensive experience allows them to adapt to the evolving needs of their customers, providing innovative solutions that meet the demands of a rapidly changing market. Yeti Logistics commitment to excellence and customer satisfaction has earned a reputation as a trusted partner in the logistics field. Yeti Logistics prides itself on its reliable and timely delivery services, utilizing a vast network of transportation options to ensure that your goods reach their destination quickly and securely.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=800&fit=crop"
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {aboutInfo.title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
              <p className="text-gray-700 leading-relaxed">
                {aboutInfo.story}
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                {aboutInfo.mission}
              </p>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                {aboutInfo.vision}
              </p>
            </div>
          </div>
          
          <div className="lg:order-first">
            <img 
              src={aboutInfo.image}
              alt="Modern logistics operations"
              className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
            />
          </div>
        </div>
        
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Target Audience & Solution</h3>
            <p className="text-blue-100 leading-relaxed mb-6">
              {aboutInfo.target_audience}
            </p>
            <h4 className="text-xl font-semibold mb-3">Our Solution</h4>
            <p className="text-blue-100 leading-relaxed mb-6">
              We streamline and optimize delivery, warehousing, and logistics processes, enabling our clients to focus on growth and customer service while we handle the operational complexities.
            </p>
            <h4 className="text-xl font-semibold mb-3">Key Values</h4>
            <p className="text-blue-100 leading-relaxed">
              {aboutInfo.key_values}
            </p>
          </div>
        </div>
        
        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">{aboutInfo.years_experience}</div>
            <div className="text-gray-600 font-medium">Years of Excellence</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">BizSafe</div>
            <div className="text-gray-600 font-medium">Level 1 Certified</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">Innovation</div>
            <div className="text-gray-600 font-medium">Our Approach</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
