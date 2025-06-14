import React from 'react';
import { ArrowUpRight, Clock, Shield, Rocket } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const Benefits = () => {
  const { openContactModal } = useModal();

  const benefits = [
    {
      icon: ArrowUpRight,
      title: 'Measurable Growth',
      description: 'Our clients see an average of 300% increase in qualified opportunities within 6 months.',
      metric: '300%',
      color: 'green'
    },
    {
      icon: Clock,
      title: 'Time Efficiency',
      description: 'Skip months of cold outreach. We connect you directly with pre-qualified decision makers.',
      metric: '75%',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every connection is thoroughly vetted to ensure alignment with your strategic objectives.',
      metric: '95%',
      color: 'teal'
    },
    {
      icon: Rocket,
      title: 'Faster Results',
      description: 'Accelerate deal cycles and partnership development through warm, strategic introductions.',
      metric: '60%',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-600 border-green-200',
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      teal: 'bg-teal-100 text-teal-600 border-teal-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Our Clients Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We deliver tangible results that drive your business forward. Here's what sets us apart 
            from traditional networking and business development approaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex items-start space-x-6">
                <div className={`rounded-xl p-3 ${getColorClasses(benefit.color)} shrink-0 group-hover:scale-110 transition-transform border`}>
                  <benefit.icon className="h-8 w-8" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {benefit.title}
                    </h3>
                    <div className={`text-3xl font-bold ${benefit.color === 'green' ? 'text-green-600' : 
                      benefit.color === 'blue' ? 'text-blue-600' : 
                      benefit.color === 'teal' ? 'text-teal-600' : 'text-purple-600'}`}>
                      {benefit.metric}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional value proposition */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business Network?
          </h3>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            Join hundreds of successful companies who have accelerated their growth through 
            strategic connections. Let us help you build the relationships that matter.
          </p>
          <button
            onClick={openContactModal}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Your Growth Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;