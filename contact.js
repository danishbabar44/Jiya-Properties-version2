// Contact page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

function initializeContactPage() {
    setupContactForm();
    setupModalForms();
    setupMapInteraction();
    populateFromURL();
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                phone: document.getElementById('contact-phone').value,
                service: document.getElementById('contact-service').value,
                budget: document.getElementById('contact-budget').value,
                message: document.getElementById('contact-message').value,
                timestamp: new Date().toISOString()
            };
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Save to localStorage
                const contacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                contacts.push(formData);
                localStorage.setItem('contactSubmissions', JSON.stringify(contacts));
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                showSuccessMessage('Thank you for your message! We will get back to you within 24 hours.');
                
                // Reset form
                contactForm.reset();
                
                // Send confirmation email (simulation)
                sendConfirmationEmail(formData);
            }, 2000);
        });
    }
}

function setupModalForms() {
    // Valuation form
    const valuationForm = document.querySelector('.valuation-form');
    if (valuationForm) {
        valuationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleValuationSubmission(this);
        });
    }
    
    // Consultation form
    const consultationForm = document.querySelector('.consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleConsultationSubmission(this);
        });
    }
    
    // Callback form
    const callbackForm = document.querySelector('.callback-form');
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCallbackSubmission(this);
        });
    }
}

function setupMapInteraction() {
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('click', function() {
            // In a real application, this would open Google Maps
            const address = "Dubai Marina, Dubai, UAE";
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            window.open(googleMapsUrl, '_blank');
        });
    }
}

function populateFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('property');
    
    if (propertyId) {
        const messageTextarea = document.getElementById('contact-message');
        if (messageTextarea) {
            messageTextarea.value = `I am interested in Property ID: ${propertyId}. Please provide more information.`;
        }
        
        // Set service to appropriate value
        const serviceSelect = document.getElementById('contact-service');
        if (serviceSelect) {
            serviceSelect.value = 'buy';
        }
    }
}

function openValuationForm() {
    const modal = document.getElementById('valuation-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeValuationForm() {
    const modal = document.getElementById('valuation-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function openConsultationForm() {
    const modal = document.getElementById('consultation-modal');
    if (modal) {
        modal.style.display = 'block';
        
        // Set minimum date to today
        const dateInput = document.getElementById('consultation-date');
        if (dateInput) {
            dateInput.min = new Date().toISOString().split('T')[0];
        }
    }
}

function closeConsultationForm() {
    const modal = document.getElementById('consultation-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function openCallbackForm() {
    const modal = document.getElementById('callback-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeCallbackForm() {
    const modal = document.getElementById('callback-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleValuationSubmission(form) {
    const formData = {
        name: document.getElementById('valuation-name').value,
        email: document.getElementById('valuation-email').value,
        phone: document.getElementById('valuation-phone').value,
        propertyType: document.getElementById('valuation-property-type').value,
        location: document.getElementById('valuation-location').value,
        details: document.getElementById('valuation-details').value,
        type: 'valuation',
        timestamp: new Date().toISOString()
    };
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Save to localStorage
        const valuations = JSON.parse(localStorage.getItem('valuationRequests') || '[]');
        valuations.push(formData);
        localStorage.setItem('valuationRequests', JSON.stringify(valuations));
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        showSuccessMessage('Valuation request submitted! Our expert will contact you within 24 hours with your property valuation.');
        
        // Reset form and close modal
        form.reset();
        closeValuationForm();
        
        // Send confirmation
        sendValuationConfirmation(formData);
    }, 2000);
}

function handleConsultationSubmission(form) {
    const formData = {
        name: document.getElementById('consultation-name').value,
        email: document.getElementById('consultation-email').value,
        phone: document.getElementById('consultation-phone').value,
        date: document.getElementById('consultation-date').value,
        time: document.getElementById('consultation-time').value,
        topic: document.getElementById('consultation-topic').value,
        type: 'consultation',
        timestamp: new Date().toISOString()
    };
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Scheduling...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Save to localStorage
        const consultations = JSON.parse(localStorage.getItem('consultationRequests') || '[]');
        consultations.push(formData);
        localStorage.setItem('consultationRequests', JSON.stringify(consultations));
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        showSuccessMessage('Consultation scheduled successfully! We will send you a confirmation email with meeting details.');
        
        // Reset form and close modal
        form.reset();
        closeConsultationForm();
        
        // Send confirmation
        sendConsultationConfirmation(formData);
    }, 2000);
}

function handleCallbackSubmission(form) {
    const formData = {
        name: document.getElementById('callback-name').value,
        phone: document.getElementById('callback-phone').value,
        preferredTime: document.getElementById('callback-time').value,
        purpose: document.getElementById('callback-purpose').value,
        type: 'callback',
        timestamp: new Date().toISOString()
    };
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Requesting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Save to localStorage
        const callbacks = JSON.parse(localStorage.getItem('callbackRequests') || '[]');
        callbacks.push(formData);
        localStorage.setItem('callbackRequests', JSON.stringify(callbacks));
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        showSuccessMessage('Callback request submitted! We will call you back within the next 2 hours.');
        
        // Reset form and close modal
        form.reset();
        closeCallbackForm();
        
        // Send confirmation
        sendCallbackConfirmation(formData);
    }, 2000);
}

function sendConfirmationEmail(formData) {
    // Simulate sending confirmation email
    console.log('Sending confirmation email to:', formData.email);
    
    // In a real application, this would integrate with an email service
    const emailContent = {
        to: formData.email,
        subject: 'Thank you for contacting Jiya Properties',
        body: `Dear ${formData.name},\n\nThank you for contacting Jiya Properties. We have received your message and will get back to you within 24 hours.\n\nBest regards,\nJiya Properties Team`
    };
    
    // Store email in localStorage for demonstration
    const emails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    emails.push({
        ...emailContent,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('sentEmails', JSON.stringify(emails));
}

function sendValuationConfirmation(formData) {
    console.log('Sending valuation confirmation to:', formData.email);
    
    const emailContent = {
        to: formData.email,
        subject: 'Property Valuation Request Received - Jiya Properties',
        body: `Dear ${formData.name},\n\nWe have received your property valuation request for your ${formData.propertyType} in ${formData.location}.\n\nOur expert will contact you within 24 hours with your property valuation.\n\nBest regards,\nJiya Properties Team`
    };
    
    const emails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    emails.push({
        ...emailContent,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('sentEmails', JSON.stringify(emails));
}

function sendConsultationConfirmation(formData) {
    console.log('Sending consultation confirmation to:', formData.email);
    
    const emailContent = {
        to: formData.email,
        subject: 'Consultation Scheduled - Jiya Properties',
        body: `Dear ${formData.name},\n\nYour consultation has been scheduled for ${formData.date} at ${formData.time}.\n\nWe will send you meeting details shortly.\n\nBest regards,\nJiya Properties Team`
    };
    
    const emails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    emails.push({
        ...emailContent,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('sentEmails', JSON.stringify(emails));
}

function sendCallbackConfirmation(formData) {
    console.log('Sending callback confirmation to:', formData.phone);
    
    // In a real application, this might send an SMS
    const smsContent = {
        to: formData.phone,
        message: `Hello ${formData.name}, we have received your callback request. We will call you back within the next 2 hours. - Jiya Properties`
    };
    
    const sms = JSON.parse(localStorage.getItem('sentSMS') || '[]');
    sms.push({
        ...smsContent,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('sentSMS', JSON.stringify(sms));
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
        max-width: 400px;
        line-height: 1.5;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 7000);
}

// Newsletter subscription
function setupNewsletterSubscription() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Save to localStorage
            const newsletters = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
            newsletters.push({
                email: email,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('newsletterSubscriptions', JSON.stringify(newsletters));
            
            showSuccessMessage('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
}

// Contact analytics
function trackContactInteraction(action, details) {
    const analytics = JSON.parse(localStorage.getItem('contactAnalytics') || '[]');
    analytics.push({
        action: action,
        details: details,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
    });
    localStorage.setItem('contactAnalytics', JSON.stringify(analytics));
}

// Setup click tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track phone number clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackContactInteraction('phone_click', this.href);
        });
    });
    
    // Track email clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackContactInteraction('email_click', this.href);
        });
    });
    
    // Track WhatsApp clicks
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackContactInteraction('whatsapp_click', this.href);
        });
    });
});

// Initialize newsletter subscription
document.addEventListener('DOMContentLoaded', function() {
    setupNewsletterSubscription();
});

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// ESC key to close modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const visibleModals = document.querySelectorAll('.modal[style*="block"]');
        visibleModals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Export functions for global access
window.openValuationForm = openValuationForm;
window.closeValuationForm = closeValuationForm;
window.openConsultationForm = openConsultationForm;
window.closeConsultationForm = closeConsultationForm;
window.openCallbackForm = openCallbackForm;
window.closeCallbackForm = closeCallbackForm;