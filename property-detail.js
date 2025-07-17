// Property detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializePropertyDetail();
});

function initializePropertyDetail() {
    setupImageGallery();
    setupInquiryForm();
    setupModalHandlers();
    loadSimilarProperties();
    setupPropertyActions();
}

function setupImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Get the image src from the data attribute or onclick
            const newImageSrc = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            
            // Update main image
            const mainImage = document.getElementById('main-property-image');
            if (mainImage) {
                mainImage.src = newImageSrc;
            }
        });
    });
}

function changeImage(thumbnail, imageSrc) {
    // Remove active class from all thumbnails
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
    
    // Update main image
    const mainImage = document.getElementById('main-property-image');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
}

function setupInquiryForm() {
    const inquiryForm = document.querySelector('.inquiry-form');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('inquiry-name').value,
                email: document.getElementById('inquiry-email').value,
                phone: document.getElementById('inquiry-phone').value,
                inquiryType: document.getElementById('inquiry-type').value,
                message: document.getElementById('inquiry-message').value,
                property: document.title,
                timestamp: new Date().toISOString()
            };
            
            // Simulate form submission
            const submitBtn = inquiryForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showSuccessMessage('Thank you for your inquiry! We will contact you shortly.');
                
                // Close modal
                closeInquiryForm();
                
                // Reset form
                inquiryForm.reset();
            }, 2000);
        });
    }
}

function setupModalHandlers() {
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const visibleModals = document.querySelectorAll('.modal[style*="block"]');
            visibleModals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

function loadSimilarProperties() {
    const similarContainer = document.getElementById('similar-properties');
    if (!similarContainer) return;
    
    // Get current property ID
    const currentPropertyId = getCurrentPropertyId();
    
    // Filter out current property and get random similar properties
    const similarProperties = properties
        .filter(prop => prop.id !== currentPropertyId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    
    const propertyCards = similarProperties.map(property => createPropertyCard(property)).join('');
    similarContainer.innerHTML = propertyCards;
}

function getCurrentPropertyId() {
    // Extract property ID from URL
    const url = window.location.pathname;
    const match = url.match(/property-(\d+)\.html/);
    return match ? parseInt(match[1]) : 1;
}

function createPropertyCard(property) {
    const bedroomText = property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Bed`;
    const bathroomText = `${property.bathrooms} Bath`;
    
    return `
        <div class="property-card" onclick="window.location.href='property-${property.id}.html'">
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
            </div>
        </div>
    `;
}

function setupPropertyActions() {
    // Add to favorites functionality
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'btn btn-secondary favorite-btn';
    favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
    favoriteBtn.onclick = toggleFavorite;
    
    const propertyActions = document.querySelector('.property-actions');
    if (propertyActions) {
        propertyActions.appendChild(favoriteBtn);
    }
    
    // Check if property is already in favorites
    const propertyId = getCurrentPropertyId();
    const favorites = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
    if (favorites.includes(propertyId)) {
        favoriteBtn.innerHTML = '<i class="fas fa-heart" style="color: #f59e0b;"></i> Remove from Favorites';
        favoriteBtn.classList.add('favorited');
    }
}

function toggleFavorite() {
    const propertyId = getCurrentPropertyId();
    const favorites = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
    const favoriteBtn = document.querySelector('.favorite-btn');
    
    if (favorites.includes(propertyId)) {
        // Remove from favorites
        const updatedFavorites = favorites.filter(id => id !== propertyId);
        localStorage.setItem('favoriteProperties', JSON.stringify(updatedFavorites));
        
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
        favoriteBtn.classList.remove('favorited');
        showSuccessMessage('Property removed from favorites');
    } else {
        // Add to favorites
        favorites.push(propertyId);
        localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
        
        favoriteBtn.innerHTML = '<i class="fas fa-heart" style="color: #f59e0b;"></i> Remove from Favorites';
        favoriteBtn.classList.add('favorited');
        showSuccessMessage('Property added to favorites');
    }
}

function openInquiryForm() {
    const modal = document.getElementById('inquiry-modal');
    if (modal) {
        modal.style.display = 'block';
        
        // Pre-fill property information
        const propertyTitle = document.querySelector('.property-title h1')?.textContent || '';
        const messageTextarea = document.getElementById('inquiry-message');
        if (messageTextarea && propertyTitle) {
            messageTextarea.value = `I am interested in the property: ${propertyTitle}. Please provide more information.`;
        }
    }
}

function closeInquiryForm() {
    const modal = document.getElementById('inquiry-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function scheduleViewing() {
    const propertyTitle = document.querySelector('.property-title h1')?.textContent || '';
    
    // Create viewing modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Schedule Property Viewing</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form class="viewing-form">
                <div class="form-group">
                    <label>Property</label>
                    <input type="text" value="${propertyTitle}" readonly>
                </div>
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="viewing-name" required>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" id="viewing-email" required>
                </div>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" id="viewing-phone" required>
                </div>
                <div class="form-group">
                    <label>Preferred Date</label>
                    <input type="date" id="viewing-date" required min="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label>Preferred Time</label>
                    <select id="viewing-time" required>
                        <option value="">Select time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Special Requirements</label>
                    <textarea id="viewing-requirements" rows="3" placeholder="Any specific requirements for the viewing..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Schedule Viewing</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Handle form submission
    modal.querySelector('.viewing-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const viewingData = {
            property: propertyTitle,
            name: document.getElementById('viewing-name').value,
            email: document.getElementById('viewing-email').value,
            phone: document.getElementById('viewing-phone').value,
            date: document.getElementById('viewing-date').value,
            time: document.getElementById('viewing-time').value,
            requirements: document.getElementById('viewing-requirements').value,
            timestamp: new Date().toISOString()
        };
        
        // Simulate booking
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Booking...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Save to localStorage
            const viewings = JSON.parse(localStorage.getItem('scheduledViewings') || '[]');
            viewings.push(viewingData);
            localStorage.setItem('scheduledViewings', JSON.stringify(viewings));
            
            showSuccessMessage('Viewing scheduled successfully! We will contact you to confirm.');
            modal.remove();
        }, 2000);
    });
}

function downloadBrochure() {
    const propertyTitle = document.querySelector('.property-title h1')?.textContent || 'Property';
    
    // Create a simple brochure download simulation
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${propertyTitle.replace(/\s+/g, '-').toLowerCase()}-brochure.pdf`;
    
    // Show download started message
    showSuccessMessage('Brochure download started! Check your downloads folder.');
    
    // In a real application, this would trigger an actual PDF download
    console.log(`Downloading brochure for: ${propertyTitle}`);
}

function shareProperty() {
    const propertyTitle = document.querySelector('.property-title h1')?.textContent || '';
    const propertyUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: propertyTitle,
            text: `Check out this property: ${propertyTitle}`,
            url: propertyUrl
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback to copying URL to clipboard
        navigator.clipboard.writeText(propertyUrl).then(() => {
            showSuccessMessage('Property URL copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = propertyUrl;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showSuccessMessage('Property URL copied to clipboard!');
        });
    }
}

function calculateMortgage() {
    const propertyPrice = getCurrentPropertyPrice();
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Mortgage Calculator</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="mortgage-calculator">
                <div class="form-group">
                    <label>Property Price (AED)</label>
                    <input type="number" id="mortgage-price" value="${propertyPrice}" readonly>
                </div>
                <div class="form-group">
                    <label>Down Payment (AED)</label>
                    <input type="number" id="down-payment" value="${Math.floor(propertyPrice * 0.2)}" min="0" max="${propertyPrice}">
                </div>
                <div class="form-group">
                    <label>Interest Rate (%)</label>
                    <input type="number" id="interest-rate" value="3.5" step="0.1" min="0" max="20">
                </div>
                <div class="form-group">
                    <label>Loan Term (Years)</label>
                    <select id="loan-term">
                        <option value="15">15 years</option>
                        <option value="20">20 years</option>
                        <option value="25" selected>25 years</option>
                        <option value="30">30 years</option>
                    </select>
                </div>
                <button type="button" class="btn btn-primary" onclick="calculateMortgagePayment()">Calculate</button>
                <div id="mortgage-results" class="mortgage-results"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Add event listeners for real-time calculation
    const inputs = modal.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', calculateMortgagePayment);
    });
    
    // Initial calculation
    calculateMortgagePayment();
}

function calculateMortgagePayment() {
    const propertyPrice = parseFloat(document.getElementById('mortgage-price').value);
    const downPayment = parseFloat(document.getElementById('down-payment').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value);
    const loanTerm = parseInt(document.getElementById('loan-term').value);
    
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - loanAmount;
    
    const resultsDiv = document.getElementById('mortgage-results');
    resultsDiv.innerHTML = `
        <div class="calculation-results">
            <h4>Mortgage Summary</h4>
            <div class="result-item">
                <span>Loan Amount:</span>
                <span>${formatCurrency(loanAmount)} AED</span>
            </div>
            <div class="result-item">
                <span>Monthly Payment:</span>
                <span class="highlight">${formatCurrency(monthlyPayment)} AED</span>
            </div>
            <div class="result-item">
                <span>Total Interest:</span>
                <span>${formatCurrency(totalInterest)} AED</span>
            </div>
            <div class="result-item">
                <span>Total Payment:</span>
                <span>${formatCurrency(totalPayment)} AED</span>
            </div>
        </div>
    `;
}

function getCurrentPropertyPrice() {
    const priceElement = document.querySelector('.property-price .price');
    if (priceElement) {
        const priceText = priceElement.textContent.replace(/[^0-9]/g, '');
        return parseInt(priceText);
    }
    return 1000000; // Default price
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-AE', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
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

// Add additional action buttons
document.addEventListener('DOMContentLoaded', function() {
    const propertyActions = document.querySelector('.property-actions');
    
    if (propertyActions) {
        // Add share button
        const shareBtn = document.createElement('button');
        shareBtn.className = 'btn btn-secondary';
        shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share Property';
        shareBtn.onclick = shareProperty;
        propertyActions.appendChild(shareBtn);
        
        // Add mortgage calculator button
        const mortgageBtn = document.createElement('button');
        mortgageBtn.className = 'btn btn-secondary';
        mortgageBtn.innerHTML = '<i class="fas fa-calculator"></i> Mortgage Calculator';
        mortgageBtn.onclick = calculateMortgage;
        propertyActions.appendChild(mortgageBtn);
    }
});

// Export functions for global access
window.changeImage = changeImage;
window.openInquiryForm = openInquiryForm;
window.closeInquiryForm = closeInquiryForm;
window.scheduleViewing = scheduleViewing;
window.downloadBrochure = downloadBrochure;
window.shareProperty = shareProperty;
window.calculateMortgage = calculateMortgage;
window.calculateMortgagePayment = calculateMortgagePayment;