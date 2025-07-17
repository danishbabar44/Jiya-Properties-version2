// Property Data
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
        image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
        priceNumeric: 550000
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
        image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
        priceNumeric: 990000
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
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
        priceNumeric: 750000
    },
    {
        id: 4,
        title: "Luxury Penthouse",
        type: "Penthouse",
        price: "2,500,000 AED",
        pricePerSqft: "8,333 AED/sq ft",
        bedrooms: 3,
        bathrooms: 4,
        area: "3000 Sq Ft",
        location: "Business Bay",
        status: "For Sale",
        featured: false,
        description: "Exclusive penthouse with premium amenities and spectacular views",
        image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
        priceNumeric: 2500000
    },
    {
        id: 5,
        title: "Spacious Townhouse",
        type: "Townhouse",
        price: "1,200,000 AED",
        pricePerSqft: "4,000 AED/sq ft",
        bedrooms: 3,
        bathrooms: 3,
        area: "3000 Sq Ft",
        location: "Arabian Ranches",
        status: "For Sale",
        featured: false,
        description: "Family-friendly townhouse in gated community with recreational facilities",
        image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
        priceNumeric: 1200000
    },
    {
        id: 6,
        title: "Commercial Office Space",
        type: "Commercial",
        price: "1,800,000 AED",
        pricePerSqft: "1,500 AED/sq ft",
        bedrooms: 0,
        bathrooms: 2,
        area: "1200 Sq Ft",
        location: "DIFC",
        status: "For Sale",
        featured: false,
        description: "Prime commercial space in Dubai International Financial Centre",
        image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
        priceNumeric: 1800000
    }
];

// Global Variables
let currentTestimonial = 0;
let filteredProperties = [...properties];
let currentView = 'grid';
let currentPage = 1;
const propertiesPerPage = 6;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize App
function initializeApp() {
    setupEventListeners();
    setupMobileMenu();
    setupScrollEffects();
    setupAnimations();
    
    // Initialize page-specific content
    if (document.getElementById('featured-properties')) {
        loadFeaturedProperties();
    }
    
    if (document.getElementById('properties-list')) {
        loadAllProperties();
    }
    
    if (document.getElementById('similar-properties')) {
        loadSimilarProperties();
    }
    
    startTestimonialCarousel();
    animateCounters();
}

// Event Listeners
function setupEventListeners() {
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchProperties);
    }
    
    // Price range sliders
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.addEventListener('input', updatePriceDisplay);
    }
    
    const propertiesPriceRange = document.getElementById('properties-price-range');
    if (propertiesPriceRange) {
        propertiesPriceRange.addEventListener('input', updatePropertiesPriceDisplay);
    }
    
    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
    });
    
    // Sort functionality
    const sortSelect = document.getElementById('sort-properties');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortProperties);
    }
    
    // Filter functionality
    const filterInputs = document.querySelectorAll('.filter-option input');
    filterInputs.forEach(input => {
        input.addEventListener('change', applyFilters);
    });
    
    // Window events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }
}

// Mobile Menu
function setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Scroll Effects
function setupScrollEffects() {
    const header = document.querySelector('.header');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    function handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // Header background opacity
        if (header) {
            if (scrollTop > 100) {
                header.style.background = 'rgba(15, 23, 42, 0.98)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
            }
        }
        
        // Back to top button
        if (backToTopBtn) {
            if (scrollTop > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
        
        // Animate elements on scroll
        animateOnScroll();
    }
    
    window.addEventListener('scroll', handleScroll);
}

// Animations
function setupAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.property-card, .service-card, .benefit-card, .team-member');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Animate on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.property-card, .service-card, .benefit-card');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('animate-fadeInUp');
        }
    });
}

// Property Functions
function loadFeaturedProperties() {
    const featuredContainer = document.getElementById('featured-properties');
    if (!featuredContainer) return;
    
    const featuredProperties = properties.filter(property => property.featured);
    const propertyCards = featuredProperties.map(property => createPropertyCard(property)).join('');
    
    featuredContainer.innerHTML = propertyCards;
}

function loadAllProperties() {
    const propertiesContainer = document.getElementById('properties-list');
    if (!propertiesContainer) return;
    
    displayProperties(filteredProperties);
    updateResultsCount();
}

function loadSimilarProperties() {
    const similarContainer = document.getElementById('similar-properties');
    if (!similarContainer) return;
    
    // Get random properties (excluding current property)
    const currentPropertyId = getCurrentPropertyId();
    const similarProperties = properties
        .filter(prop => prop.id !== currentPropertyId)
        .slice(0, 3);
    
    const propertyCards = similarProperties.map(property => createPropertyCard(property)).join('');
    similarContainer.innerHTML = propertyCards;
}

function getCurrentPropertyId() {
    // Extract property ID from URL or return 1 as default
    const url = window.location.pathname;
    const match = url.match(/property-(\d+)\.html/);
    return match ? parseInt(match[1]) : 1;
}

function createPropertyCard(property) {
    const bedroomText = property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Bed`;
    const bathroomText = `${property.bathrooms} Bath`;
    
    return `
        <div class="property-card" onclick="viewProperty(${property.id})">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                <div class="property-status">${property.status}</div>
            </div>
            <div class="property-info">
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </p>
                <div class="property-specs">
                    <div class="spec">
                        <i class="fas fa-bed"></i>
                        <span>${bedroomText}</span>
                    </div>
                    <div class="spec">
                        <i class="fas fa-bath"></i>
                        <span>${bathroomText}</span>
                    </div>
                    <div class="spec">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${property.area}</span>
                    </div>
                </div>
                <div class="property-price">
                    <span class="price">${property.price}</span>
                    <span class="price-per-sqft">${property.pricePerSqft}</span>
                </div>
                <div class="property-actions">
                    <a href="property-${property.id}.html" class="btn btn-primary">View Details</a>
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); contactAgent(${property.id})">Contact Agent</button>
                </div>
            </div>
        </div>
    `;
}

function displayProperties(propertiesToShow) {
    const propertiesContainer = document.getElementById('properties-list');
    if (!propertiesContainer) return;
    
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const paginatedProperties = propertiesToShow.slice(startIndex, endIndex);
    
    if (paginatedProperties.length === 0) {
        propertiesContainer.innerHTML = `
            <div class="no-properties">
                <h3>No properties found</h3>
                <p>Try adjusting your search criteria or filters.</p>
            </div>
        `;
        return;
    }
    
    const propertyCards = paginatedProperties.map(property => createPropertyCard(property)).join('');
    propertiesContainer.innerHTML = propertyCards;
    
    updatePagination(propertiesToShow.length);
}

function updateResultsCount() {
    const resultsCountElement = document.getElementById('results-count');
    if (resultsCountElement) {
        resultsCountElement.textContent = `${filteredProperties.length} Properties Found`;
    }
}

function updatePagination(totalProperties) {
    const totalPages = Math.ceil(totalProperties / propertiesPerPage);
    const paginationInfo = document.querySelector('.pagination-info');
    
    if (paginationInfo) {
        paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    
    const prevBtn = document.querySelector('.pagination-btn:first-child');
    const nextBtn = document.querySelector('.pagination-btn:last-child');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
}

// Search and Filter Functions
function searchProperties() {
    const location = document.getElementById('location')?.value || '';
    const propertyType = document.getElementById('property-type')?.value || '';
    const bedrooms = document.getElementById('bedrooms')?.value || '';
    const priceRange = document.getElementById('price-range')?.value || '5000000';
    
    // Redirect to properties page with search parameters
    const searchParams = new URLSearchParams({
        location: location,
        type: propertyType,
        bedrooms: bedrooms,
        maxPrice: priceRange
    });
    
    window.location.href = `properties.html?${searchParams.toString()}`;
}

function applyFilters() {
    const locationFilters = Array.from(document.querySelectorAll('input[name="location"]:checked')).map(cb => cb.value);
    const typeFilters = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
    const bedroomFilters = Array.from(document.querySelectorAll('input[name="bedrooms"]:checked')).map(cb => cb.value);
    const priceRange = document.getElementById('properties-price-range')?.value || '5000000';
    
    filteredProperties = properties.filter(property => {
        const matchesLocation = locationFilters.length === 0 || locationFilters.includes(property.location);
        const matchesType = typeFilters.length === 0 || typeFilters.includes(property.type);
        const matchesBedrooms = bedroomFilters.length === 0 || bedroomFilters.includes(property.bedrooms.toString());
        const matchesPrice = property.priceNumeric <= parseInt(priceRange);
        
        return matchesLocation && matchesType && matchesBedrooms && matchesPrice;
    });
    
    currentPage = 1;
    displayProperties(filteredProperties);
    updateResultsCount();
}

function clearFilters() {
    // Clear all checkboxes
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset price range
    const priceRange = document.getElementById('properties-price-range');
    if (priceRange) {
        priceRange.value = '5000000';
        updatePropertiesPriceDisplay();
    }
    
    // Reset filtered properties
    filteredProperties = [...properties];
    currentPage = 1;
    displayProperties(filteredProperties);
    updateResultsCount();
}

function sortProperties() {
    const sortBy = document.getElementById('sort-properties')?.value || 'price-desc';
    
    filteredProperties.sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return a.priceNumeric - b.priceNumeric;
            case 'price-desc':
                return b.priceNumeric - a.priceNumeric;
            case 'date-desc':
                return b.id - a.id; // Assuming higher ID means newer
            case 'size-desc':
                return parseInt(b.area) - parseInt(a.area);
            default:
                return 0;
        }
    });
    
    currentPage = 1;
    displayProperties(filteredProperties);
}

function setView(viewType) {
    currentView = viewType;
    const propertiesContainer = document.getElementById('properties-list');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Update button states
    viewButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update container class
    if (propertiesContainer) {
        propertiesContainer.className = `properties-grid ${viewType}-view`;
    }
}

function changePage(direction) {
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        displayProperties(filteredProperties);
        
        // Scroll to top of properties list
        document.getElementById('properties-list').scrollIntoView({ behavior: 'smooth' });
    }
}

// Price Display Functions
function updatePriceDisplay() {
    const priceRange = document.getElementById('price-range');
    const priceDisplay = document.getElementById('price-display');
    
    if (priceRange && priceDisplay) {
        const value = parseInt(priceRange.value);
        const displayValue = value >= 5000000 ? '5M+ AED' : formatPrice(value);
        priceDisplay.textContent = displayValue;
    }
}

function updatePropertiesPriceDisplay() {
    const priceRange = document.getElementById('properties-price-range');
    const priceDisplay = document.getElementById('properties-price-display');
    
    if (priceRange && priceDisplay) {
        const value = parseInt(priceRange.value);
        const displayValue = value >= 5000000 ? '5M+ AED' : formatPrice(value);
        priceDisplay.textContent = displayValue;
    }
}

function formatPrice(price) {
    if (price >= 1000000) {
        return `${(price / 1000000).toFixed(1)}M AED`;
    } else if (price >= 1000) {
        return `${(price / 1000).toFixed(0)}K AED`;
    }
    return `${price} AED`;
}

// Testimonial Carousel
function startTestimonialCarousel() {
    const testimonialTrack = document.getElementById('testimonial-track');
    if (!testimonialTrack) return;
    
    // Auto-advance testimonials
    setInterval(() => {
        nextTestimonial();
    }, 5000);
}

function nextTestimonial() {
    const testimonialTrack = document.getElementById('testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (!testimonialTrack || testimonialCards.length === 0) return;
    
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    const translateX = -currentTestimonial * 100;
    testimonialTrack.style.transform = `translateX(${translateX}%)`;
}

function previousTestimonial() {
    const testimonialTrack = document.getElementById('testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (!testimonialTrack || testimonialCards.length === 0) return;
    
    currentTestimonial = currentTestimonial === 0 ? testimonialCards.length - 1 : currentTestimonial - 1;
    const translateX = -currentTestimonial * 100;
    testimonialTrack.style.transform = `translateX(${translateX}%)`;
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Property Navigation
function viewProperty(propertyId) {
    window.location.href = `property-${propertyId}.html`;
}

function contactAgent(propertyId) {
    // Open contact modal or redirect to contact page
    window.location.href = `contact.html?property=${propertyId}`;
}

// Modal Functions
function openInquiryForm() {
    const modal = document.getElementById('inquiry-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeInquiryForm() {
    const modal = document.getElementById('inquiry-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function scheduleViewing() {
    alert('Viewing scheduled! We will contact you shortly to confirm the appointment.');
}

function downloadBrochure() {
    alert('Brochure download started! Check your downloads folder.');
}

// Form Handling
function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const formType = form.classList[0];
    
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage('Thank you! Your message has been sent successfully.');
        
        // Reset form
        form.reset();
        
        // Close modal if it's a modal form
        const modal = form.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }, 2000);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #065f46;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Utility Functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleScroll() {
    const scrollTop = window.pageYOffset;
    const header = document.querySelector('.header');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // Header background
    if (header) {
        if (scrollTop > 100) {
            header.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    }
    
    // Back to top button
    if (backToTopBtn) {
        if (scrollTop > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
}

function handleResize() {
    // Handle responsive behavior
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (window.innerWidth > 1024) {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
}

// Initialize URL parameters
function initializeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Set search form values from URL
    const location = urlParams.get('location');
    const type = urlParams.get('type');
    const bedrooms = urlParams.get('bedrooms');
    const maxPrice = urlParams.get('maxPrice');
    
    if (location) {
        const locationSelect = document.getElementById('location');
        if (locationSelect) locationSelect.value = location;
    }
    
    if (type) {
        const typeSelect = document.getElementById('property-type');
        if (typeSelect) typeSelect.value = type;
    }
    
    if (bedrooms) {
        const bedroomsSelect = document.getElementById('bedrooms');
        if (bedroomsSelect) bedroomsSelect.value = bedrooms;
    }
    
    if (maxPrice) {
        const priceRange = document.getElementById('price-range');
        if (priceRange) {
            priceRange.value = maxPrice;
            updatePriceDisplay();
        }
    }
}

// Call initialization on page load
window.addEventListener('load', initializeFromURL);

// Export functions for global access
window.searchProperties = searchProperties;
window.applyFilters = applyFilters;
window.clearFilters = clearFilters;
window.sortProperties = sortProperties;
window.setView = setView;
window.changePage = changePage;
window.nextTestimonial = nextTestimonial;
window.previousTestimonial = previousTestimonial;
window.viewProperty = viewProperty;
window.contactAgent = contactAgent;
window.openInquiryForm = openInquiryForm;
window.closeInquiryForm = closeInquiryForm;
window.scheduleViewing = scheduleViewing;
window.downloadBrochure = downloadBrochure;
window.scrollToTop = scrollToTop;