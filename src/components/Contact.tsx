import React, { useState, useEffect } from 'react';
import { Mail, Phone, MessageCircle, Send, MapPin, Clock, Search, User } from 'lucide-react';

interface ContactProps {
  isModal?: boolean;
  onClose?: () => void;
}

interface PostcodeData {
  postcode: string;
  latitude: number;
  longitude: number;
  region: string;
  country: string;
  constituency: {
    name: string;
    mp: {
      name: string;
      party: string;
    } | null;
  } | null;
}

const Contact: React.FC<ContactProps> = ({ isModal = false, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    postcode: ''
  });

  const [postcodeData, setPostcodeData] = useState<PostcodeData | null>(null);
  const [isLoadingPostcode, setIsLoadingPostcode] = useState(false);
  const [postcodeError, setPostcodeError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', company: '', message: '', postcode: '' });
    setPostcodeData(null);
    alert('Thank you for your message! We\'ll be in touch soon.');
    if (isModal && onClose) {
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePostcodeLookup = async () => {
    const postcode = formData.postcode.replace(/\s+/g, '').toUpperCase();
    if (!postcode) {
      setPostcodeError('Please enter a postcode');
      return;
    }

    setIsLoadingPostcode(true);
    setPostcodeError(null);

    try {
      // Get the postcode data including constituency
      const postcodeResponse = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
      const postcodeData = await postcodeResponse.json();

      if (postcodeData.status === 200) {
        // Get constituency data from postcodes.io
        const constituencyResponse = await fetch(`https://api.postcodes.io/postcodes/${postcode}/autocomplete`);
        const constituencyData = await constituencyResponse.json();
        
        console.log('Postcode data:', postcodeData.result);
        console.log('Constituency data:', constituencyData);

        // Get additional location data from OpenStreetMap
        const { latitude, longitude } = postcodeData.result;
        const osmResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=en`
        );
        const osmData = await osmResponse.json();
        console.log('OSM data:', osmData);

        // Try to get constituency name from various sources
        let constituencyName = null;
        
        // First try postcodes.io constituency data
        if (constituencyData.status === 200 && constituencyData.result && constituencyData.result.length > 0) {
          constituencyName = constituencyData.result[0];
        }
        // Then try OSM data
        else if (osmData.address) {
          constituencyName = osmData.address.parliamentary_constituency || 
                           osmData.address.constituency || 
                           osmData.address.electoral_district;
        }

        setPostcodeData({
          postcode: postcodeData.result.postcode,
          latitude: postcodeData.result.latitude,
          longitude: postcodeData.result.longitude,
          region: postcodeData.result.region,
          country: postcodeData.result.country,
          constituency: constituencyName ? {
            name: constituencyName,
            mp: null
          } : null
        });

        // If we still don't have constituency data, try one more API
        if (!constituencyName) {
          try {
            const mapitResponse = await fetch(
              `https://mapit.mysociety.org/postcode/${postcode}?api_key=YOUR_API_KEY`
            );
            const mapitData = await mapitResponse.json();
            console.log('MapIt data:', mapitData);
            
            // Look for Westminster constituency in the MapIt response
            if (mapitData.areas) {
              const constituency = Object.values(mapitData.areas).find(
                (area: any) => area.type === 'WMC' // Westminster Constituency
              );
              if (constituency) {
                setPostcodeData(prev => ({
                  ...prev!,
                  constituency: {
                    name: (constituency as any).name,
                    mp: null
                  }
                }));
              }
            }
          } catch (error) {
            console.error('MapIt API error:', error);
          }
        }
      } else {
        setPostcodeError('Invalid postcode');
        setPostcodeData(null);
      }
    } catch (error) {
      console.error('Postcode lookup error:', error);
      setPostcodeError('Error looking up postcode. Please try again.');
      setPostcodeData(null);
    } finally {
      setIsLoadingPostcode(false);
    }
  };

  const contactContent = (
    <div className={isModal ? "" : "py-20 bg-white"}>
      <div className={isModal ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
        {!isModal && (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Let's Build Your Network
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to unlock new opportunities through strategic connections? 
              Get in touch and let's discuss how we can accelerate your growth.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          {!isModal && (
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  We're here to help you build the connections that matter. Reach out through 
                  any of the channels below, and we'll respond within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-xl p-3">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">hello@adamconnections.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 rounded-xl p-3">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-teal-100 rounded-xl p-3">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Location</div>
                    <div className="text-gray-600">New York, NY</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 rounded-xl p-3">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Response Time</div>
                    <div className="text-gray-600">Within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Form */}
          <div className={isModal ? "w-full" : ""}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="your.email@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white resize-none"
                  placeholder="Tell us about your business goals and how we can help..."
                />
              </div>

              {/* Postcode Lookup */}
              <div>
                <label htmlFor="postcode" className="block text-sm font-semibold text-gray-900 mb-2">
                  UK Postcode (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="Enter UK postcode (e.g., SW1A 1AA)"
                  />
                  <button
                    type="button"
                    onClick={handlePostcodeLookup}
                    disabled={isLoadingPostcode}
                    className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Search className="h-5 w-5" />
                    {isLoadingPostcode ? 'Searching...' : 'Lookup'}
                  </button>
                </div>
                {postcodeError && (
                  <p className="mt-2 text-sm text-red-600">{postcodeError}</p>
                )}
              </div>

              {/* Map and MP Information Display */}
              {postcodeData && (
                <div className="mt-4 bg-gray-50 rounded-xl p-4">
                  <div className="space-y-4">
                    {/* Location Info */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>{postcodeData.region}, {postcodeData.country}</span>
                    </div>

                    {/* Constituency Info */}
                    {postcodeData.constituency && (
                      <div className="border-t border-gray-200 pt-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">Constituency:</span>
                            <span>{postcodeData.constituency.name}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Map */}
                    <div className="aspect-video rounded-lg overflow-hidden mt-4 border border-gray-200">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${postcodeData.longitude - 0.01},${postcodeData.latitude - 0.01},${postcodeData.longitude + 0.01},${postcodeData.latitude + 0.01}&layer=mapnik&marker=${postcodeData.latitude},${postcodeData.longitude}`}
                        style={{ border: '1px solid #ccc' }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                      <a
                        href={`https://www.openstreetmap.org/?mlat=${postcodeData.latitude}&mlon=${postcodeData.longitude}#map=15/${postcodeData.latitude}/${postcodeData.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Larger Map
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return isModal ? contactContent : <section id="contact">{contactContent}</section>;
};

export default Contact;