import React, { useState, useEffect } from 'react';
import { Building, Search, MapPin, Bed, Bath, Square, Phone, MessageCircle, ChevronUp, Menu, X, User, Heart, Home, Info, Briefcase, Mail, ArrowRight, ChevronDown, Star, Award, Shield, Clock, TrendingUp, Users, CheckCircle, Filter, Grid, List, Eye, Calendar, Download, Share2 } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('buy');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [counters, setCounters] = useState({
    experience: 0,
    clients: 0,
    properties: 0,
    satisfaction: 0
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteProperties, setFavoriteProperties] = useState(new Set());

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
      
      // Animate elements on scroll
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Counter animation effect
  useEffect(() => {
    const animateCounters = () => {
      const targets = {
        experience: 15,
        clients: 5000,
        properties: 500,
        satisfaction: 98
      };
      
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      
      Object.keys(targets).forEach(key => {
        const target = targets[key];
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters(prev => ({
            ...prev,
            [key]: Math.floor(current)
          }));
        }, stepTime);
      });
    };

    // Trigger animation after component mounts
    const timer = setTimeout(animateCounters, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
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

  // Filter properties function
  const filterProperties = (location, type, price) => {
    return properties.filter(property => {
      const matchesLocation = !location || property.location.includes(location);
      const matchesType = !type || property.type.includes(type);
      const priceValue = parseInt(property.price.replace(/[^0-9]/g, ''));
      const matchesPrice = priceValue <= price;
      return matchesLocation && matchesType && matchesPrice;
    });
  };

  // Handle property search
  const handleSearch = () => {
    const filteredResults = filterProperties(selectedLocation, selectedType, priceRange[1]);
    console.log('Search results:', filteredResults);
    // In a real app, this would update the properties display
  };

  // Toggle favorite
  const toggleFavorite = (propertyId) => {
    setFavoriteProperties(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="flex items-center">
            <Building className="text-teal-600 h-8 w-8 mr-2" />
            <span className="text-xl font-semibold text-black">Jiya Properties</span>
          </div>
          <p className="text-gray-600 mt-2">Loading your dream properties...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Building className="text-teal-600 h-8 w-8" />
              <div className="ml-2">
                <span className="text-xl font-semibold text-black">Jiya Properties</span>
                <div className="text-xs text-gray-600">Agency of the Year</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-black hover:text-teal-600 font-medium">Buy</a>
              <a href="#" className="text-black hover:text-teal-600 font-medium">Rent</a>
              <div className="relative group">
                <a href="#" className="text-black hover:text-teal-600 font-medium flex items-center">
                  About <ChevronDown className="ml-1 h-4 w-4" />
                </a>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 transform scale-0 group-hover:scale-100 transition-transform origin-top">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-600 hover:text-white">About Us</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-600 hover:text-white">Meet the Team</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-600 hover:text-white">Awards and Recognition</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-600 hover:text-white">Latest News & Insights</a>
                </div>
              </div>
              <div className="relative group">
                <a href="#" className="text-black hover:text-teal-600 font-medium flex items-center">
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </a>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 transform scale-0 group-hover:scale-100 transition-transform origin-top">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-600 hover:text-white">Property Sales</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-600 hover:text-white">Property Rentals</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-600 hover:text-white">Property Management</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-600 hover:text-white">Mortgage Assistance</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-600 hover:text-white">Conveyancing Services</a>
                </div>
              </div>
              <a href="#" className="text-black hover:text-teal-600 font-medium">Careers</a>
              <a href="#" className="text-black hover:text-teal-600 font-medium">Contact</a>
            </nav>

            {/* Right side buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <a href="#" className="text-black hover:text-teal-600 flex items-center">
                <User className="h-5 w-5 mr-1" />
                <span>Sign Up/Login</span>
              </a>
              <a href="#" className="btn-primary">
                List Your Property
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
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
          <div className="lg:hidden bg-white shadow-lg border-t">
            <div className="px-4 py-2 space-y-1">
              <a href="#" className="block py-2 text-black hover:text-teal-600">Buy</a>
              <a href="#" className="block py-2 text-black hover:text-teal-600">Rent</a>
              <a href="#" className="block py-2 text-black hover:text-teal-600">About</a>
              <a href="#" className="block py-2 text-black hover:text-teal-600">Services</a>
              <a href="#" className="block py-2 text-black hover:text-teal-600">Careers</a>
              <a href="#" className="block py-2 text-black hover:text-teal-600">Contact</a>
              <a href="#" className="block py-2 text-black hover:text-teal-600">Sign Up/Login</a>
              <a href="#" className="block py-2 mt-4 bg-teal-600 text-white px-4 rounded-md">List Your Property</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-0 min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080" 
            alt="Dubai Skyline" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
          <p className="text-sm uppercase tracking-wider mb-2">Established in 2009</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl">Your Trusted Real Estate Partner in Dubai</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">Find your dream home with Dubai's award-winning property experts</p>
          
          {/* Search Bar */}
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              <button 
                className={`flex-1 py-3 font-medium ${activeTab === 'buy' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('buy')}
              >
                Buy
              </button>
              <button 
                className={`flex-1 py-3 font-medium ${activeTab === 'rent' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('rent')}
              >
                Rent
              </button>
              <button 
                className={`flex-1 py-3 font-medium ${activeTab === 'off-plan' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-600'}`}
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
                  <select className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600">
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
                  <select className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600">
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
                  <select className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600">
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
      <section className="py-16 bg-gray-100 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Jiya Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Trusted expertise and proven results in Dubai's real estate market</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-teal-600">{counters.experience}+</h3>
              <h4 className="text-xl font-semibold mb-2">Years Experience</h4>
              <p className="text-gray-600">Trusted expertise in Dubai's real estate market</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-teal-600">{counters.clients.toLocaleString()}+</h3>
              <h4 className="text-xl font-semibold mb-2">Happy Clients</h4>
              <p className="text-gray-600">Satisfied customers across the UAE</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-teal-600">{counters.properties}+</h3>
              <h4 className="text-xl font-semibold mb-2">Properties Sold</h4>
              <p className="text-gray-600">Successful transactions completed</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-teal-600">{counters.satisfaction}%</h3>
              <h4 className="text-xl font-semibold mb-2">Client Satisfaction</h4>
              <p className="text-gray-600">Consistently high satisfaction ratings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our handpicked selection of premium properties in Dubai's most prestigious locations</p>
          </div>
          
          {/* Property Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
              <span className="text-gray-600">{properties.length} Properties Found</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {properties.map(property => (
              <div key={property.id} className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''}`}>
                <div className="relative">
                  <img src={property.image} alt={property.title} className={`object-cover ${viewMode === 'list' ? 'w-full sm:w-80 h-48 sm:h-full' : 'w-full h-64'}`} />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                    {property.status}
                  </div>
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all">
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(property.id);
                      }}
                      <Heart className={`h-4 w-4 transition-colors ${favoriteProperties.has(property.id) ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'}`} />
                    </button>
                    <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all">
                      <Share2 className="h-4 w-4 text-gray-600 hover:text-teal-600" />
                    </button>
                  </div>
                </div>
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <h3 className="text-teal-600 text-2xl font-bold mb-2">{property.price}</h3>
                  <h4 className="text-black text-xl font-semibold mb-2">{property.title}</h4>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>
                  <div className={`flex ${viewMode === 'list' ? 'flex-wrap gap-4' : 'justify-between'} mb-4`}>
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
                  <div className={`flex ${viewMode === 'list' ? 'flex-wrap gap-2' : 'space-x-2'}`}>
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md flex items-center justify-center transition-colors">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      WhatsApp
                    </button>
                    <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md flex items-center justify-center">
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
      <section className="py-16 bg-gray-100 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive real estate solutions for all your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Buy Property</h3>
              <p className="text-gray-600 mb-4">Find your dream home from our extensive portfolio of luxury properties in Dubai's prime locations.</p>
              <a href="#" className="text-teal-600 hover:text-teal-700 font-medium flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Rent Property</h3>
              <p className="text-gray-600 mb-4">Discover the perfect rental in prime locations with flexible terms and comprehensive support.</p>
              <a href="#" className="text-teal-600 hover:text-teal-700 font-medium flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sell Property</h3>
              <p className="text-gray-600 mb-4">Maximize your property value with our expert marketing, competitive pricing, and proven sales strategies.</p>
              <a href="#" className="text-teal-600 hover:text-teal-700 font-medium flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Property Management</h3>
              <p className="text-gray-600 mb-4">Complete property management solutions including tenant screening, maintenance, and financial reporting.</p>
              <a href="#" className="text-teal-600 hover:text-teal-700 font-medium flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Market Insights Section */}
      <section className="py-16 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dubai Market Insights</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Stay informed with the latest market trends and investment opportunities in Dubai's dynamic real estate sector</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Market Growth</h3>
                  <p className="text-green-600 font-semibold">+12.5% YoY</p>
                </div>
              </div>
              <p className="text-gray-600">Dubai's property market continues to show strong growth with increasing demand from international investors and residents.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">New Developments</h3>
                  <p className="text-blue-600 font-semibold">50+ Projects</p>
                </div>
              </div>
              <p className="text-gray-600">Exciting new developments launching across Dubai, offering modern amenities and prime locations for investors.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                  <Star className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Investment ROI</h3>
                  <p className="text-teal-600 font-semibold">8.2% Average</p>
                </div>
              </div>
              <p className="text-gray-600">Strong rental yields and capital appreciation make Dubai an attractive destination for property investment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from our satisfied clients about their experience with Jiya Properties</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic text-lg">"Jiya Properties helped us find our dream home in Dubai Marina. Their team was professional, knowledgeable, and made the entire process seamless."</p>
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mr-4 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">SA</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Sarah Al-Mahmoud</h4>
                        <p className="text-gray-500">Property Buyer</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic text-lg">"Excellent service and market knowledge. They sold my property above asking price within just 3 weeks. Highly recommended!"</p>
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mr-4 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">AH</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Ahmed Hassan</h4>
                        <p className="text-gray-500">Property Seller</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic text-lg">"As a first-time investor in Dubai, Jiya Properties provided invaluable guidance and helped me make informed decisions."</p>
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mr-4 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">MR</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Maria Rodriguez</h4>
                        <p className="text-gray-500">Property Investor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? 'bg-teal-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with Dubai's Property Market</h2>
            <p className="text-xl mb-8 opacity-90">Get the latest market insights, new property listings, and exclusive investment opportunities delivered to your inbox.</p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-navy hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
              <p className="text-sm mt-4 opacity-75">No spam, unsubscribe at any time. We respect your privacy.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Market Reports</h3>
                <p className="text-sm opacity-90">Weekly market analysis and trends</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">New Listings</h3>
                <p className="text-sm opacity-90">First access to premium properties</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Exclusive Deals</h3>
                <p className="text-sm opacity-90">Special offers for subscribers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="py-16 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Recognized for excellence in Dubai's real estate industry</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Best Real Estate Agency</h3>
                <p className="text-gray-600 text-sm mb-2">Dubai Property Awards 2023</p>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Excellence in Customer Service</h3>
                <p className="text-gray-600 text-sm mb-2">UAE Business Excellence Awards</p>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Top Luxury Property Dealer</h3>
                <p className="text-gray-600 text-sm mb-2">Middle East Property Awards</p>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">RERA Certified Agency</h3>
                <p className="text-gray-600 text-sm mb-2">Dubai Real Estate Regulatory Agency</p>
                <div className="flex justify-center">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    CERTIFIED
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Get answers to common questions about buying, selling, and renting properties in Dubai</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-teal-600">What are the costs involved in buying property in Dubai?</h3>
                <p className="text-gray-600">Typical costs include 4% DLD transfer fee, 2% agent commission, mortgage registration fees, and legal fees. We provide detailed cost breakdowns for all our clients.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-teal-600">Can foreigners buy property in Dubai?</h3>
                <p className="text-gray-600">Yes, foreigners can buy freehold properties in designated areas of Dubai. We guide international buyers through the entire process and legal requirements.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-teal-600">How long does the buying process take?</h3>
                <p className="text-gray-600">Typically 2-4 weeks from offer acceptance to completion, depending on mortgage approval and legal procedures. We ensure a smooth and efficient process.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-teal-600">What rental yields can I expect?</h3>
                <p className="text-gray-600">Dubai offers attractive rental yields of 6-8% annually, depending on location and property type. We provide detailed ROI analysis for investment properties.</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                View All FAQs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Property Journey?</h2>
            <p className="text-xl mb-8 opacity-90">Our expert team is here to guide you through every step of your real estate journey in Dubai.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="opacity-90">+971 50 123 4567</p>
                <p className="text-sm opacity-75">Available 24/7</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
                <p className="opacity-90">Quick Response</p>
                <p className="text-sm opacity-75">Instant property updates</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="opacity-90">info@jiyaproperties.ae</p>
                <p className="text-sm opacity-75">Detailed consultations</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                Schedule Free Consultation
              </button>
              <button className="bg-white text-navy hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                Download Property Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make Your Next Move?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Whether you're buying, selling, or renting, our expert team is here to guide you every step of the way.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-colors">
              List Your Property
            </a>
            <a href="#" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-colors">
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <div className="flex items-center mb-4">
                <Building className="text-teal-600 h-8 w-8" />
                <span className="ml-2 text-xl font-semibold">Jiya Properties</span>
              </div>
              <p className="text-gray-400 mb-4">Best Real Estate Agency in Dubai UAE</p>
              <div className="mb-4">
                <p className="flex items-start mb-2">
                  <MapPin className="h-5 w-5 text-teal-600 mr-2 mt-1" />
                  <span>Dubai, UAE</span>
                </p>
                <p className="flex items-center mb-2">
                  <Phone className="h-5 w-5 text-teal-600 mr-2" />
                  <span>+971 50 123 4567</span>
                </p>
                <p className="flex items-center">
                  <Mail className="h-5 w-5 text-teal-600 mr-2" />
                  <span>info@jiyaproperties.ae</span>
                </p>
              </div>
            </div>
            
            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">Buy Property</a></li>
                <li><a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">Rent Property</a></li>
                <li><a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">List Your Property</a></li>
                <li><a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">Mortgage Calculator</a></li>
                <li><a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Areas</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">Downtown Dubai</a></li>
                <li><a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">Dubai Marina</a></li>
                <li><a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">Dubai Hills Estate</a></li>
                <li><a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">Palm Jumeirah</a></li>
                <li><a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">Business Bay</a></li>
                <li><a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">JVC</a></li>
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
                <button className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Jiya Properties. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="#" 
        className="fixed bottom-24 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 animate-bounce-gentle"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      </a>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 hover:scale-110"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default App;