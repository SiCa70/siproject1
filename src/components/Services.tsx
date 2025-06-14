import React from 'react';
import { Network, Users, TrendingUp, MessageCircle, Briefcase, Globe } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const Services = () => {
  const { openContactModal } = useModal();
  
  const services = [
    {
      icon: Network,
      title: 'Strategic Networking',
      description: 'Build meaningful relationships with industry leaders, investors, and potential partners who align with your business goals.',
      features: ['Executive Introductions', 'Industry Events', 'VIP Networking']
    },
    {
      icon: Briefcase,
      title: 'Partnership Development',
      description: 'Identify and facilitate strategic partnerships that create mutual value and drive sustainable growth.',
      features: ['Partnership Strategy', 'Due Diligence', 'Contract Facilitation']
    },
    {
      icon: TrendingUp,
      title: 'Growth Acceleration',
      description: 'Connect with key stakeholders who can accelerate your growth trajectory through strategic collaborations.',
      features: ['Market Expansion', 'Capital Connections', 'Growth Strategy']
    },
    {
      icon: Users,
      title: 'Team Expansion',
      description: 'Access top-tier talent and advisory board members through our extensive professional network.',
      features: ['Executive Search', 'Advisory Boards', 'Talent Pipeline']
    },
    {
      icon: Globe,
      title: 'Market Entry',
      description: 'Navigate new markets with confidence through strategic local partnerships and industry connections.',
      features: ['Local Partners', 'Market Intelligence', 'Regulatory Guidance']
    },
    {
      icon: MessageCircle,
      title: 'Relationship Management',
      description: 'Ongoing support to nurture and optimize your professional relationships for long-term success.',
      features: ['Relationship Mapping', 'Follow-up Strategy', 'Value Creation']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive connection-building services designed to unlock your business potential 
            and drive meaningful growth through strategic relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group hover:animate-[bounce_0.5s_ease-in-out]"
            >
              <div className="mb-6">
                <div className="bg-blue-100 rounded-xl p-3 w-fit group-hover:bg-blue-200 transition-colors">
                  <service.icon className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={openContactModal}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Discuss Your Needs
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;