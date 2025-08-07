/**
 * Main JavaScript for Portfolio Website
 * Handles mobile menu toggle, smooth scrolling, and other interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);

  // Toggle mobile menu
  function toggleMobileMenu(expanded) {
    const isExpanded = expanded !== undefined ? expanded : mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    
    // Update button state
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    
    // Update menu visibility
    if (!isExpanded) {
      navLinks.setAttribute('data-visible', 'true');
      document.body.style.overflow = 'hidden';
      navOverlay.classList.add('visible');
      
      // Set focus to first nav item when opening
      const firstNavItem = navLinks.querySelector('a');
      if (firstNavItem) {
        setTimeout(() => firstNavItem.focus(), 300);
      }
    } else {
      navLinks.setAttribute('data-visible', 'false');
      document.body.style.overflow = '';
      navOverlay.classList.remove('visible');
      
      // Return focus to menu button when closing
      mobileMenuToggle.focus();
    }
  }

  // Toggle menu on button click
  mobileMenuToggle.addEventListener('click', () => {
    toggleMobileMenu();
  });

  // Close menu when clicking overlay
  navOverlay.addEventListener('click', () => {
    toggleMobileMenu(true);
  });

  // Close menu when clicking on a nav link (for single page navigation)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // Only close if it's a hash link (same page navigation)
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        toggleMobileMenu(true);
        
        // Scroll to the target section
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Focus the target for keyboard users
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
          }, 100);
        }
      }
    });
  });

  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Close menu on Escape key
    if (e.key === 'Escape' && mobileMenuToggle.getAttribute('aria-expanded') === 'true') {
      toggleMobileMenu(true);
    }
    
    // Trap focus inside the mobile menu when open
    if (mobileMenuToggle.getAttribute('aria-expanded') === 'true') {
      const focusableElements = Array.from(navLinks.querySelectorAll('a, button, [tabindex]'));
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Focus the header for keyboard users
      document.querySelector('header').setAttribute('tabindex', '-1');
      document.querySelector('header').focus();
    });
  }
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      // Skip if it's a link to the current page
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (mobileMenuToggle.getAttribute('aria-expanded') === 'true') {
          toggleMobileMenu(true);
        }
        
        // Scroll to the target
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          
          // Focus the target for keyboard users
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
          
          // Remove the tabindex after focus is moved away
          setTimeout(() => {
            targetElement.removeAttribute('tabindex');
          }, 1000);
        }, 100);
      }
    });
  });
  
  // Initialize AOS (Animate On Scroll) if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
});

// Add a class to the body when JavaScript is enabled
document.documentElement.classList.add('js-enabled');

// Handle prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function handlePrefersReducedMotion() {
  if (prefersReducedMotion.matches) {
    document.documentElement.setAttribute('data-reduced-motion', 'true');
  } else {
    document.documentElement.removeAttribute('data-reduced-motion');
  }
}

// Initial check
handlePrefersReducedMotion();

// Watch for changes
prefersReducedMotion.addListener(handlePrefersReducedMotion);
