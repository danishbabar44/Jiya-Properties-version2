// Properties page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initializePropertiesPage();
});

function initializePropertiesPage() {
    // Initialize filters from URL parameters
    initializeFiltersFromURL();
    
    // Load properties
    loadAllProperties();
    
    // Setup filter event listeners
    setupFilterListeners();
    
    // Initialize price range display
    updatePropertiesPriceDisplay();
}

function initializeFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Set location filters
    const location = urlParams.get('location');
    if (location) {
        const locationCheckbox = document.querySelector(`input[name="location"][value="${location}"]`);
        if (locationCheckbox) {
            locationCheckbox.checked = true;
        }
    }
    
    // Set type filters
    const type = urlParams.get('type');
    if (type) {
        const typeCheckbox = document.querySelector(`input[name="type"][value="${type}"]`);
        if (typeCheckbox) {
            typeCheckbox.checked = true;
        }
    }
    
    // Set bedroom filters
    const bedrooms = urlParams.get('bedrooms');
    if (bedrooms) {
        const bedroomsCheckbox = document.querySelector(`input[name="bedrooms"][value="${bedrooms}"]`);
        if (bedroomsCheckbox) {
            bedroomsCheckbox.checked = true;
        }
    }
    
    // Set price range
    const maxPrice = urlParams.get('maxPrice');
    if (maxPrice) {
        const priceRange = document.getElementById('properties-price-range');
        if (priceRange) {
            priceRange.value = maxPrice;
            updatePropertiesPriceDisplay();
        }
    }
    
    // Apply filters if any parameters exist
    if (location || type || bedrooms || maxPrice) {
        applyFilters();
    }
}

function setupFilterListeners() {
    // Filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Price range slider
    const priceRange = document.getElementById('properties-price-range');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            updatePropertiesPriceDisplay();
            applyFilters();
        });
    }
    
    // Sort dropdown
    const sortSelect = document.getElementById('sort-properties');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortProperties);
    }
    
    // View toggle buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isGrid = this.querySelector('.fa-th-large');
            setView(isGrid ? 'grid' : 'list');
        });
    });
}

// Advanced filtering with animations
function applyFilters() {
    const locationFilters = Array.from(document.querySelectorAll('input[name="location"]:checked')).map(cb => cb.value);
    const typeFilters = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
    const bedroomFilters = Array.from(document.querySelectorAll('input[name="bedrooms"]:checked')).map(cb => cb.value);
    const priceRange = document.getElementById('properties-price-range')?.value || '5000000';
    
    // Show loading state
    const propertiesContainer = document.getElementById('properties-list');
    if (propertiesContainer) {
        propertiesContainer.innerHTML = '<div class="loading-properties">Filtering properties...</div>';
    }
    
    // Filter properties with a slight delay for better UX
    setTimeout(() => {
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
        
        // Add animation to filtered results
        const propertyCards = document.querySelectorAll('.property-card');
        propertyCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
}

// Enhanced property card interactions
function enhancePropertyCards() {
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        // Add click analytics
        card.addEventListener('click', function() {
            // Track property view
            trackPropertyView(this.dataset.propertyId);
        });
    });
}

// Property view tracking
function trackPropertyView(propertyId) {
    // In a real application, this would send data to analytics
    console.log(`Property ${propertyId} viewed`);
    
    // Store in localStorage for user preferences
    const viewedProperties = JSON.parse(localStorage.getItem('viewedProperties') || '[]');
    if (!viewedProperties.includes(propertyId)) {
        viewedProperties.push(propertyId);
        localStorage.setItem('viewedProperties', JSON.stringify(viewedProperties));
    }
}

// Advanced search functionality
function advancedSearch() {
    const searchModal = document.createElement('div');
    searchModal.className = 'modal';
    searchModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Advanced Search</h3>
                <button class="modal-close" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="advanced-search-form">
                <div class="form-group">
                    <label>Property ID</label>
                    <input type="text" id="search-property-id" placeholder="Enter property ID">
                </div>
                <div class="form-group">
                    <label>Keywords</label>
                    <input type="text" id="search-keywords" placeholder="e.g., pool, balcony, furnished">
                </div>
                <div class="form-group">
                    <label>Minimum Area (sq ft)</label>
                    <input type="number" id="search-min-area" placeholder="1000">
                </div>
                <div class="form-group">
                    <label>Maximum Area (sq ft)</label>
                    <input type="number" id="search-max-area" placeholder="5000">
                </div>
                <div class="form-group">
                    <label>Year Built</label>
                    <select id="search-year-built">
                        <option value="">Any year</option>
                        <option value="2020-2024">2020-2024</option>
                        <option value="2015-2019">2015-2019</option>
                        <option value="2010-2014">2010-2014</option>
                        <option value="2000-2009">2000-2009</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="performAdvancedSearch()">Search Properties</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(searchModal);
    searchModal.style.display = 'block';
}

function performAdvancedSearch() {
    const propertyId = document.getElementById('search-property-id').value;
    const keywords = document.getElementById('search-keywords').value;
    const minArea = document.getElementById('search-min-area').value;
    const maxArea = document.getElementById('search-max-area').value;
    const yearBuilt = document.getElementById('search-year-built').value;
    
    // Perform advanced filtering
    let results = [...properties];
    
    if (propertyId) {
        results = results.filter(prop => prop.id.toString().includes(propertyId));
    }
    
    if (keywords) {
        const keywordArray = keywords.toLowerCase().split(',').map(k => k.trim());
        results = results.filter(prop => 
            keywordArray.some(keyword => 
                prop.description.toLowerCase().includes(keyword) ||
                prop.title.toLowerCase().includes(keyword)
            )
        );
    }
    
    if (minArea) {
        results = results.filter(prop => parseInt(prop.area) >= parseInt(minArea));
    }
    
    if (maxArea) {
        results = results.filter(prop => parseInt(prop.area) <= parseInt(maxArea));
    }
    
    filteredProperties = results;
    currentPage = 1;
    displayProperties(filteredProperties);
    updateResultsCount();
    
    // Close modal
    document.querySelector('.modal').remove();
}

function closeModal(button) {
    const modal = button.closest('.modal');
    if (modal) {
        modal.remove();
    }
}

// Save search functionality
function saveSearch() {
    const searchData = {
        filters: {
            location: Array.from(document.querySelectorAll('input[name="location"]:checked')).map(cb => cb.value),
            type: Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value),
            bedrooms: Array.from(document.querySelectorAll('input[name="bedrooms"]:checked')).map(cb => cb.value),
            maxPrice: document.getElementById('properties-price-range')?.value || '5000000'
        },
        timestamp: Date.now(),
        resultCount: filteredProperties.length
    };
    
    const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    savedSearches.push(searchData);
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
    
    showSuccessMessage('Search saved successfully!');
}

// Property comparison functionality
let comparisonList = [];

function addToComparison(propertyId) {
    if (comparisonList.includes(propertyId)) {
        showSuccessMessage('Property already in comparison list');
        return;
    }
    
    if (comparisonList.length >= 3) {
        showSuccessMessage('You can compare up to 3 properties at once');
        return;
    }
    
    comparisonList.push(propertyId);
    updateComparisonCounter();
    showSuccessMessage('Property added to comparison');
}

function removeFromComparison(propertyId) {
    comparisonList = comparisonList.filter(id => id !== propertyId);
    updateComparisonCounter();
    showSuccessMessage('Property removed from comparison');
}

function updateComparisonCounter() {
    let counter = document.getElementById('comparison-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.id = 'comparison-counter';
        counter.className = 'comparison-counter';
        document.body.appendChild(counter);
    }
    
    if (comparisonList.length > 0) {
        counter.innerHTML = `
            <div class="comparison-content">
                <span>Compare (${comparisonList.length})</span>
                <button onclick="viewComparison()" class="btn btn-primary btn-sm">View Comparison</button>
            </div>
        `;
        counter.style.display = 'block';
    } else {
        counter.style.display = 'none';
    }
}

function viewComparison() {
    if (comparisonList.length < 2) {
        showSuccessMessage('Please select at least 2 properties to compare');
        return;
    }
    
    const comparisonProperties = properties.filter(prop => comparisonList.includes(prop.id));
    
    // Create comparison modal
    const modal = document.createElement('div');
    modal.className = 'modal comparison-modal';
    modal.innerHTML = `
        <div class="modal-content wide">
            <div class="modal-header">
                <h3>Property Comparison</h3>
                <button class="modal-close" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="comparison-table">
                ${generateComparisonTable(comparisonProperties)}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

function generateComparisonTable(properties) {
    const headers = ['Property', 'Price', 'Location', 'Type', 'Bedrooms', 'Bathrooms', 'Area'];
    
    let table = '<table class="comparison-table-content"><thead><tr>';
    headers.forEach(header => {
        table += `<th>${header}</th>`;
    });
    table += '</tr></thead><tbody>';
    
    properties.forEach(property => {
        table += `
            <tr>
                <td>
                    <div class="property-mini">
                        <img src="${property.image}" alt="${property.title}">
                        <div>
                            <h4>${property.title}</h4>
                            <button onclick="removeFromComparison(${property.id})" class="btn-remove">Remove</button>
                        </div>
                    </div>
                </td>
                <td>${property.price}</td>
                <td>${property.location}</td>
                <td>${property.type}</td>
                <td>${property.bedrooms}</td>
                <td>${property.bathrooms}</td>
                <td>${property.area}</td>
            </tr>
        `;
    });
    
    table += '</tbody></table>';
    return table;
}

// Property alerts/notifications
function setupPropertyAlerts() {
    const alertButton = document.createElement('button');
    alertButton.className = 'btn btn-secondary property-alert-btn';
    alertButton.innerHTML = '<i class="fas fa-bell"></i> Create Alert';
    alertButton.onclick = showAlertForm;
    
    const propertiesControls = document.querySelector('.properties-controls');
    if (propertiesControls) {
        propertiesControls.appendChild(alertButton);
    }
}

function showAlertForm() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Create Property Alert</h3>
                <button class="modal-close" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form class="alert-form">
                <div class="form-group">
                    <label>Alert Name</label>
                    <input type="text" id="alert-name" placeholder="e.g., Dubai Marina Apartments" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="alert-email" placeholder="your@email.com" required>
                </div>
                <div class="form-group">
                    <label>Max Price (AED)</label>
                    <input type="number" id="alert-max-price" placeholder="1000000">
                </div>
                <div class="form-group">
                    <label>Preferred Location</label>
                    <select id="alert-location">
                        <option value="">Any location</option>
                        <option value="Dubai Marina">Dubai Marina</option>
                        <option value="Downtown Dubai">Downtown Dubai</option>
                        <option value="Business Bay">Business Bay</option>
                        <option value="Arabian Ranches">Arabian Ranches</option>
                        <option value="DIFC">DIFC</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Property Type</label>
                    <select id="alert-type">
                        <option value="">Any type</option>
                        <option value="Villa">Villa</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Commercial">Commercial</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Create Alert</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Handle form submission
    modal.querySelector('.alert-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const alertData = {
            name: document.getElementById('alert-name').value,
            email: document.getElementById('alert-email').value,
            maxPrice: document.getElementById('alert-max-price').value,
            location: document.getElementById('alert-location').value,
            type: document.getElementById('alert-type').value,
            created: new Date().toISOString()
        };
        
        // Save alert to localStorage
        const alerts = JSON.parse(localStorage.getItem('propertyAlerts') || '[]');
        alerts.push(alertData);
        localStorage.setItem('propertyAlerts', JSON.stringify(alerts));
        
        showSuccessMessage('Property alert created successfully!');
        closeModal(modal.querySelector('.modal-close'));
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    enhancePropertyCards();
    setupPropertyAlerts();
    updateComparisonCounter();
});

// Export functions for global access
window.advancedSearch = advancedSearch;
window.saveSearch = saveSearch;
window.addToComparison = addToComparison;
window.removeFromComparison = removeFromComparison;
window.viewComparison = viewComparison;
window.showAlertForm = showAlertForm;
window.closeModal = closeModal;