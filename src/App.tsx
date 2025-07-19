import React, { useState, useEffect } from 'react';
import { Building, Search, MapPin, Bed, Bath, Square, Phone, MessageCircle, ChevronUp, Menu, X, User, Heart, Home, Info, Briefcase, Mail, ArrowRight } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('buy');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Properties data
  const properties = [
    {
      id: 1,
      title: "Comfortable Family Home",
      type: "Single Family Home",
      price: "550,000 AED",
      pricePerSqft: "2,300 AED/sq ft",
      bedrooms: 2,
      bathrooms: 2,
      area: "2760 Sq Ft",
      location: "Dubai Marina",
      status: "For Sale",
      featured: true,
      description: "Beautiful family home in prime Dubai location with modern amenities",
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
    },
    {
      id: 2,
      title: "Amazing Villa Bay Front",
      type: "Villa",
      price: "990,000 AED",
      pricePerSqft: "31,000 AED/sq ft",
      bedrooms: 4,
      bathrooms: 3,
      area: "2200 Sq Ft",
      location: "Dubai Waterfront",
      status: "For Sale",
      featured: true,
      description: "Stunning waterfront villa with panoramic bay views and luxury finishes",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
    },
    {
      id: 3,
      title: "Modern Downtown Apartment",
      type: "Apartment",
      price: "750,000 AED",
      pricePerSqft: "5,000 AED/sq ft",
      bedrooms: 1,
      bathrooms: 2,
      area: "1500 Sq Ft",
      location: "Downtown Dubai",
      status: "For Sale",
      featured: true,
      description: "Contemporary apartment in the heart of Dubai with city views",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
    }
  ];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Building className="text-red-600 h-8 w-8" />
              <span className="ml-2 text-xl font-semibold text-black">McCone Properties</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-black hover:text-red-600 font-medium">Buy</a>
              <a href="#" className="text-black hover:text-red-600 font-medium">Rent</a>
              <div className="relative group">
                <a href="#" className="text-black hover:text-red-600 font-medium flex items-center">
                  About <span className="ml-1">▼</span>
                </a>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 transform scale-0 group-hover:scale-100 transition-transform origin-top">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white">About Us</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white">Meet the Team</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white">Awards and Recognition</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white">Latest News & Insights</a>
                </div>
              </div>
              <div className="relative group">
                <a href="#" className="text-black hover:text-red-600 font-medium flex items-center">
                  Services <span className="ml-1">▼</span>
                </a>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 transform scale-0 group-hover:scale-100 transition-transform origin-top">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white">Property Sales</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white">Property Rentals</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white">Property Management</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white">Mortgage Assistance</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white">Conveyancing Services</a>
                </div>
              </div>
              <a href="#" className="text-black hover:text-red-600 font-medium">Careers</a>
              <a href="#" className="text-black hover:text-red-600 font-medium">Contact</a>
            </nav>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-black hover:text-red-600 flex items-center">
                <User className="h-5 w-5 mr-1" />
                <span>Sign Up/Login</span>
              </a>
              <a href="#" className="btn-primary">
                List Your Property
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-black focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 py-2 space-y-1">
              <a href="#" className="block py-2 text-black hover:text-red-600">Buy</a>
              <a href="#" className="block py-2 text-black hover:text-red-600">Rent</a>
              <a href="#" className="block py-2 text-black hover:text-red-600">About</a>
              <a href="#" className="block py-2 text-black hover:text-red-600">Services</a>
              <a href="#" className="block py-2 text-black hover:text-red-600">Careers</a>
              <a href="#" className="block py-2 text-black hover:text-red-600">Contact</a>
              <a href="#" className="block py-2 text-black hover:text-red-600">Sign Up/Login</a>
              <a href="#" className="block py-2 mt-4 bg-red-600 text-white px-4 rounded-md">List Your Property</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-0 h-screen">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080" 
            alt="Dubai Skyline" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
          <p className="text-sm uppercase tracking-wider mb-2">Established in 2013</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl">Your Trusted Real Estate Partner in Dubai</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">Find your dream home with Dubai's award-winning property experts</p>
          
          {/* Search Bar */}
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              <button 
                className={`flex-1 py-3 font-medium ${activeTab === 'buy' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('buy')}
              >
                Buy
              </button>
              <button 
                className={`flex-1 py-3 font-medium ${activeTab === 'rent' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('rent')}
              >
                Rent
              </button>
              <button 
                className={`flex-1 py-3 font-medium ${activeTab === 'off-plan' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('off-plan')}
              >
                Off-Plan
              </button>
            </div>
            
            {/* Search Fields */}
            <div className="flex flex-col md:flex-row p-4">
              <div className="flex-1 mb-3 md:mb-0 md:mr-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600">
                    <option value="">Select Location</option>
                    <option value="Dubai Marina">Dubai Marina</option>
                    <option value="Downtown Dubai">Downtown Dubai</option>
                    <option value="Business Bay">Business Bay</option>
                    <option value="Arabian Ranches">Arabian Ranches</option>
                    <option value="DIFC">DIFC</option>
                  </select>
                </div>
              </div>
              <div className="flex-1 mb-3 md:mb-0 md:mx-2">
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600">
                    <option value="">Property Type</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>
              <div className="flex-1 mb-3 md:mb-0 md:mx-2">
                <div className="relative">
                  <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600">
                    <option value="">Bedrooms</option>
                    <option value="0">Studio</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                  </select>
                </div>
              </div>
              <div className="flex-1 mb-3 md:mb-0 md:ml-2">
                <button className="w-full btn-primary flex items-center justify-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">10+ Years Experience</h3>
              <p className="text-gray-600">Trusted expertise in Dubai's real estate market</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">5000+ Happy Clients</h3>
              <p className="text-gray-600">Satisfied customers across the UAE</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Award Winning Agency</h3>
              <p className="text-gray-600">Recognized for excellence in real estate</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always available to assist you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our handpicked selection of premium properties in Dubai's most prestigious locations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(property => (
              <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:-translate-y-2">
                <div className="relative">
                  <img src={property.image} alt={property.title} className="w-full h-64 object-cover" />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                    {property.status}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-red-600 text-2xl font-bold mb-2">{property.price}</h3>
                  <h4 className="text-black text-xl font-semibold mb-2">{property.title}</h4>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>
                  <div className="flex justify-between mb-4">
                    <span className="flex items-center text-gray-600">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.bedrooms} Beds
                    </span>
                    <span className="flex items-center text-gray-600">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.bathrooms} Baths
                    </span>
                    <span className="flex items-center text-gray-600">
                      <Square className="h-4 w-4 mr-1" />
                      {property.area}
                    </span>
                  </div>
                  <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <span className="text-gray-600 text-sm">John Smith</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      WhatsApp
                    </button>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md flex items-center justify-center">
                      <Phone className="h-5 w-5 mr-1" />
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="#" className="inline-block btn-primary px-6 py-3">
              View All Properties
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive real estate solutions for all your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Buy Property</h3>
              <p className="text-gray-600 mb-4">Find your dream home from our extensive portfolio of luxury properties in Dubai's prime locations.</p>
              <a href="#" className="text-red-600 hover:text-red-700 font-medium flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Rent Property</h3>
              <p className="text-gray-600 mb-4">Discover the perfect rental in prime locations with flexible terms and comprehensive support.</p>
              <a href="#" className="text-red-600 hover:text-red-700 font-medium flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Sell Property</h3>
              <p className="text-gray-600 mb-4">Maximize your property value with our expert marketing, competitive pricing, and proven sales strategies.</p>
              <a href="#" className="text-red-600 hover:text-red-700 font-medium flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Property Management</h3>
              <p className="text-gray-600 mb-4">Complete property management solutions including tenant screening, maintenance, and financial reporting.</p>
              <a href="#" className="text-red-600 hover:text-red-700 font-medium flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Looking to sell, buy, or rent a property in Dubai?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">We're here to help you find the perfect home or investment opportunity.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-colors">
              List Your Property
            </a>
            <a href="#" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-colors">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <div className="flex items-center mb-4">
                <Building className="text-red-600 h-8 w-8" />
                <span className="ml-2 text-xl font-semibold">McCone Properties</span>
              </div>
              <p className="text-gray-400 mb-4">Your trusted real estate partner</p>
              <div className="mb-4">
                <p className="flex items-start mb-2">
                  <MapPin className="h-5 w-5 text-red-600 mr-2 mt-1" />
                  <span>Dubai, UAE</span>
                </p>
                <p className="flex items-center mb-2">
                  <Phone className="h-5 w-5 text-red-600 mr-2" />
                  <span>800-MCCONE</span>
                </p>
                <p className="flex items-center">
                  <Mail className="h-5 w-5 text-red-600 mr-2" />
                  <span>info@mcconeproperties.com</span>
                </p>
              </div>
            </div>
            
            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Buy Property</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Rent Property</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">List Your Property</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Mortgage Calculator</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Areas</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Downtown Dubai</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Dubai Marina</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Dubai Hills Estate</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Palm Jumeirah</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">Business Bay</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-600 transition-colors">JVC</a></li>
              </ul>
            </div>
            
            {/* Column 4 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest property updates and market insights.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-2 rounded-l-md focus:outline-none text-gray-900"
                />
                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 McCone Properties. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="#" 
        className="fixed bottom-24 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </a>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default App;