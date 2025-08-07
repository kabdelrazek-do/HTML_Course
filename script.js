/**
 * Portfolio Website JavaScript
 * Enhanced interactivity for portfolio sections, form validation, and user experience
 * 
 * Note: This file works in conjunction with js/main.js
 * Main.js handles basic functionality, this file adds enhanced features
 */

// Wait for DOM to be fully loaded and main.js to initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced Portfolio JavaScript loaded successfully');
    
    // Small delay to ensure main.js has initialized
    setTimeout(() => {
        // Initialize all enhanced functionality
        initializeProjectFilters();
        initializeLightbox();
        initializeFormValidation();
        initializeCurrentYear();
        initializeScrollEffects();
        
        console.log('All enhanced JavaScript functionality initialized');
    }, 100);
});

/**
 * Step 4: Portfolio Sections - Project Filters
 */
function initializeProjectFilters() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) {
        console.warn('Projects grid not found');
        return;
    }
    
    // Check if filters already exist to prevent duplication
    if (document.querySelector('.project-filters')) {
        console.log('Project filters already exist, skipping initialization');
        return;
    }
    
    // Create filter buttons
    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-filters';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All Projects</button>
            <button class="filter-btn" data-filter="frontend">Frontend</button>
            <button class="filter-btn" data-filter="backend">Backend</button>
            <button class="filter-btn" data-filter="fullstack">Full Stack</button>
        </div>
    `;
    
    // Insert filter buttons before projects grid
    projectsGrid.parentNode.insertBefore(filterContainer, projectsGrid);
    
    // Add filter functionality
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    const projectCards = projectsGrid.querySelectorAll('.project-card');
    
    function filterProjects(category) {
        console.log(`Filtering projects by: ${category}`);
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
            const projectType = card.getAttribute('data-category') || 'fullstack';
            
            if (category === 'all' || projectType === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Add click events to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
    
    console.log('Project filters initialized');
}

/**
 * Step 4: Portfolio Sections - Lightbox Effect
 */
function initializeLightbox() {
    const projectImages = document.querySelectorAll('.project-image img');
    
    if (projectImages.length === 0) {
        console.warn('No project images found for lightbox');
        return;
    }
    
    // Check if lightbox already exists to prevent duplication
    if (document.querySelector('.lightbox')) {
        console.log('Lightbox already exists, skipping initialization');
        return;
    }
    
    // Create lightbox modal
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    function openLightbox(imageSrc, caption) {
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        
        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = caption || '';
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        console.log('Lightbox opened for:', imageSrc);
    }
    
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
        console.log('Lightbox closed');
    }
    
    // Add click events to project images
    projectImages.forEach(img => {
        img.addEventListener('click', () => {
            const imageSrc = img.src;
            const caption = img.alt || 'Project Image';
            openLightbox(imageSrc, caption);
        });
    });
    
    // Close lightbox events
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
    
    console.log('Lightbox functionality initialized');
}

/**
 * Step 5: Form Validation
 */
function initializeFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }
    
    // Check if validation is already initialized
    if (contactForm.dataset.validationInitialized) {
        console.log('Form validation already initialized');
        return;
    }
    
    const formFields = {
        name: {
            element: document.getElementById('name'),
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/
        },
        email: {
            element: document.getElementById('email'),
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        subject: {
            element: document.getElementById('subject'),
            required: true,
            minLength: 5
        },
        message: {
            element: document.getElementById('message'),
            required: true,
            minLength: 10
        }
    };
    
    // Real-time validation
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        const element = field.element;
        
        if (!element) return;
        
        element.addEventListener('blur', () => validateField(fieldName, field));
        element.addEventListener('input', () => clearFieldError(fieldName));
    });
    
    function validateField(fieldName, fieldConfig) {
        const element = fieldConfig.element;
        const value = element.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (fieldConfig.required && !value) {
            isValid = false;
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        }
        
        // Minimum length validation
        if (isValid && fieldConfig.minLength && value.length < fieldConfig.minLength) {
            isValid = false;
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${fieldConfig.minLength} characters`;
        }
        
        // Pattern validation
        if (isValid && fieldConfig.pattern && !fieldConfig.pattern.test(value)) {
            isValid = false;
            if (fieldName === 'email') {
                errorMessage = 'Please enter a valid email address';
            } else if (fieldName === 'name') {
                errorMessage = 'Name can only contain letters and spaces';
            }
        }
        
        // Display error or success
        if (!isValid) {
            showFieldError(fieldName, errorMessage);
        } else {
            showFieldSuccess(fieldName);
        }
        
        return isValid;
    }
    
    function showFieldError(fieldName, message) {
        const element = formFields[fieldName].element;
        const formGroup = element.closest('.form-group');
        
        // Remove existing error
        clearFieldError(fieldName);
        
        // Add error styling
        element.classList.add('error');
        formGroup.classList.add('has-error');
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
        
        console.log(`Field validation error: ${fieldName} - ${message}`);
    }
    
    function showFieldSuccess(fieldName) {
        const element = formFields[fieldName].element;
        const formGroup = element.closest('.form-group');
        
        element.classList.remove('error');
        element.classList.add('success');
        formGroup.classList.remove('has-error');
        formGroup.classList.add('has-success');
        
        console.log(`Field validation success: ${fieldName}`);
    }
    
    function clearFieldError(fieldName) {
        const element = formFields[fieldName].element;
        const formGroup = element.closest('.form-group');
        const errorDiv = formGroup.querySelector('.field-error');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        
        element.classList.remove('error');
        formGroup.classList.remove('has-error');
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log('Form submission attempted');
        
        // Validate all fields
        let isFormValid = true;
        Object.keys(formFields).forEach(fieldName => {
            const field = formFields[fieldName];
            if (!validateField(fieldName, field)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showFormSuccess();
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Clear all success states
                Object.keys(formFields).forEach(fieldName => {
                    const element = formFields[fieldName].element;
                    const formGroup = element.closest('.form-group');
                    element.classList.remove('success');
                    formGroup.classList.remove('has-success');
                });
                
                console.log('Form submitted successfully');
            }, 2000);
        } else {
            console.log('Form validation failed');
        }
    });
    
    function showFormSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div class="success-content">
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for your message. I'll get back to you as soon as possible.</p>
            </div>
        `;
        
        contactForm.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    // Mark as initialized to prevent duplicate initialization
    contactForm.dataset.validationInitialized = 'true';
    
    console.log('Form validation initialized');
}

/**
 * Step 6: Additional Features - Current Year
 */
function initializeCurrentYear() {
    const currentYearElement = document.getElementById('current-year');
    
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
        console.log('Current year updated');
    }
}

/**
 * Step 6: Additional Features - Scroll Effects
 */
function initializeScrollEffects() {
    // Header scroll effect (only if not already handled by main.js)
    const header = document.querySelector('.main-header');
    
    if (header && !header.dataset.scrollEffectsInitialized) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        header.dataset.scrollEffectsInitialized = 'true';
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                console.log('Element animated in:', entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skills-category, .contact-container');
    animateElements.forEach(el => observer.observe(el));
    
    console.log('Scroll effects initialized');
}

/**
 * Utility Functions
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeProjectFilters,
        initializeLightbox,
        initializeFormValidation,
        initializeCurrentYear,
        initializeScrollEffects
    };
} 