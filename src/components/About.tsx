import React from 'react';
import { Handshake, Lightbulb, Zap, Award } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Adam?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We don't just make introductions – we architect strategic relationships that create 
            lasting value and drive exponential growth for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Image placeholder */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional networking meeting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-yellow-500" />
                <div>
                  <div className="font-bold text-gray-900">Industry Leader</div>
                  <div className="text-sm text-gray-600">Since 2018</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-xl p-3 shrink-0">
                <Handshake className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Strategic Partnerships</h3>
                <p className="text-gray-600 leading-relaxed">
                  We identify and cultivate relationships with key decision-makers who can 
                  accelerate your business objectives and open doors to new opportunities.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-teal-100 rounded-xl p-3 shrink-0">
                <Lightbulb className="h-8 w-8 text-teal-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Intelligent Matching</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our proprietary approach analyzes business synergies, cultural fit, and 
                  strategic alignment to ensure every connection has maximum potential for success.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 rounded-xl p-3 shrink-0">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Accelerated Results</h3>
                <p className="text-gray-600 leading-relaxed">
                  We don't just make introductions and walk away. We facilitate the entire 
                  relationship development process to ensure connections convert into concrete results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;