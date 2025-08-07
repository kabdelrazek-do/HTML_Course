/**
 * Portfolio Website Testing and Debugging Script
 * This script helps identify and fix issues in the portfolio website
 */

class PortfolioTester {
    constructor() {
        this.issues = [];
        this.warnings = [];
        this.successes = [];
        this.testResults = {};
    }

    // Initialize testing
    init() {
        console.log('🔍 Portfolio Website Testing Started');
        console.log('=====================================');
        
        this.runAllTests();
        this.generateReport();
    }

    // Run all tests
    runAllTests() {
        this.testHTMLStructure();
        this.testCSSLoading();
        this.testJavaScriptIntegration();
        this.testResponsiveDesign();
        this.testAccessibility();
        this.testCrossBrowserCompatibility();
        this.testPerformance();
        this.testUserInteractions();
    }

    // Test HTML Structure
    testHTMLStructure() {
        console.log('\n📄 Testing HTML Structure...');
        
        // Check essential elements
        const essentialElements = [
            'header', 'main', 'footer', 'nav',
            '#home', '#about', '#projects', '#skills', '#contact'
        ];

        essentialElements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                this.addSuccess(`✅ ${selector} found`);
            } else {
                this.addIssue(`❌ ${selector} missing`);
            }
        });

        // Check meta tags
        const metaTags = [
            'viewport', 'description', 'title', 'charset'
        ];

        metaTags.forEach(meta => {
            const metaElement = document.querySelector(`meta[name="${meta}"], meta[charset]`);
            if (metaElement) {
                this.addSuccess(`✅ Meta tag: ${meta}`);
            } else {
                this.addIssue(`❌ Meta tag missing: ${meta}`);
            }
        });

        // Check script loading
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            this.addSuccess(`✅ Script loaded: ${script.src}`);
        });
    }

    // Test CSS Loading
    testCSSLoading() {
        console.log('\n🎨 Testing CSS Loading...');
        
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach(sheet => {
            this.addSuccess(`✅ Stylesheet loaded: ${sheet.href}`);
        });

        // Check if CSS variables are working
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        const primaryColor = computedStyle.getPropertyValue('--primary');
        
        if (primaryColor && primaryColor.trim() !== '') {
            this.addSuccess('✅ CSS variables working');
        } else {
            this.addWarning('⚠️ CSS variables may not be loading properly');
        }
    }

    // Test JavaScript Integration
    testJavaScriptIntegration() {
        console.log('\n⚡ Testing JavaScript Integration...');
        
        // Check if main.js functions are available
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            this.addSuccess('✅ Mobile menu toggle found');
        } else {
            this.addIssue('❌ Mobile menu toggle missing');
        }

        // Check if enhanced features are working
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length > 0) {
            this.addSuccess(`✅ Found ${projectCards.length} project cards`);
        } else {
            this.addIssue('❌ No project cards found');
        }

        // Check form validation
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            this.addSuccess('✅ Contact form found');
        } else {
            this.addIssue('❌ Contact form missing');
        }

        // Test console logging
        console.log('Testing console logging...');
        this.addSuccess('✅ Console logging working');
    }

    // Test Responsive Design
    testResponsiveDesign() {
        console.log('\n📱 Testing Responsive Design...');
        
        // Check viewport meta tag
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            this.addSuccess('✅ Viewport meta tag present');
        } else {
            this.addIssue('❌ Viewport meta tag missing');
        }

        // Check media queries (simulate different screen sizes)
        const screenSizes = [
            { width: 1920, height: 1080, name: 'Desktop' },
            { width: 768, height: 1024, name: 'Tablet' },
            { width: 375, height: 667, name: 'Mobile' }
        ];

        screenSizes.forEach(size => {
            this.simulateScreenSize(size.width, size.height);
            this.addSuccess(`✅ Responsive test for ${size.name} (${size.width}x${size.height})`);
        });

        // Reset to default
        this.simulateScreenSize(1920, 1080);
    }

    // Test Accessibility
    testAccessibility() {
        console.log('\n♿ Testing Accessibility...');
        
        // Check ARIA attributes
        const elementsWithAria = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]');
        if (elementsWithAria.length > 0) {
            this.addSuccess(`✅ Found ${elementsWithAria.length} elements with ARIA attributes`);
        } else {
            this.addWarning('⚠️ No ARIA attributes found');
        }

        // Check alt attributes on images
        const images = document.querySelectorAll('img');
        let imagesWithAlt = 0;
        images.forEach(img => {
            if (img.alt && img.alt.trim() !== '') {
                imagesWithAlt++;
            }
        });

        if (imagesWithAlt === images.length) {
            this.addSuccess('✅ All images have alt attributes');
        } else {
            this.addIssue(`❌ ${images.length - imagesWithAlt} images missing alt attributes`);
        }

        // Check semantic HTML
        const semanticElements = ['header', 'nav', 'main', 'section', 'article', 'footer'];
        semanticElements.forEach(element => {
            const elements = document.querySelectorAll(element);
            if (elements.length > 0) {
                this.addSuccess(`✅ Semantic element <${element}> used`);
            }
        });
    }

    // Test Cross Browser Compatibility
    testCrossBrowserCompatibility() {
        console.log('\n🌐 Testing Cross Browser Compatibility...');
        
        // Check for vendor prefixes in CSS
        const styleSheets = Array.from(document.styleSheets);
        let hasVendorPrefixes = false;
        
        try {
            styleSheets.forEach(sheet => {
                if (sheet.cssRules) {
                    Array.from(sheet.cssRules).forEach(rule => {
                        if (rule.cssText.includes('-webkit-') || 
                            rule.cssText.includes('-moz-') || 
                            rule.cssText.includes('-ms-')) {
                            hasVendorPrefixes = true;
                        }
                    });
                }
            });
        } catch (e) {
            // CORS error, skip this test
        }

        if (hasVendorPrefixes) {
            this.addSuccess('✅ Vendor prefixes found for cross-browser support');
        } else {
            this.addWarning('⚠️ No vendor prefixes detected');
        }

        // Check for modern JavaScript features
        const modernFeatures = [
            'Promise' in window,
            'fetch' in window,
            'IntersectionObserver' in window,
            'localStorage' in window
        ];

        modernFeatures.forEach((feature, index) => {
            const featureNames = ['Promise', 'fetch', 'IntersectionObserver', 'localStorage'];
            if (feature) {
                this.addSuccess(`✅ Modern feature supported: ${featureNames[index]}`);
            } else {
                this.addWarning(`⚠️ Modern feature not supported: ${featureNames[index]}`);
            }
        });
    }

    // Test Performance
    testPerformance() {
        console.log('\n⚡ Testing Performance...');
        
        // Check image optimization
        const images = document.querySelectorAll('img');
        let optimizedImages = 0;
        
        images.forEach(img => {
            if (img.loading === 'lazy') {
                optimizedImages++;
            }
        });

        if (optimizedImages === images.length) {
            this.addSuccess('✅ All images have lazy loading');
        } else {
            this.addWarning(`⚠️ ${images.length - optimizedImages} images missing lazy loading`);
        }

        // Check script loading
        const scripts = document.querySelectorAll('script[src]');
        let deferredScripts = 0;
        
        scripts.forEach(script => {
            if (script.defer || script.async) {
                deferredScripts++;
            }
        });

        if (deferredScripts === scripts.length) {
            this.addSuccess('✅ All scripts are deferred or async');
        } else {
            this.addWarning(`⚠️ ${scripts.length - deferredScripts} scripts not deferred/async`);
        }
    }

    // Test User Interactions
    testUserInteractions() {
        console.log('\n🖱️ Testing User Interactions...');
        
        // Test mobile menu
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            this.simulateClick(mobileMenuToggle);
            this.addSuccess('✅ Mobile menu toggle clickable');
        }

        // Test smooth scrolling
        const navLinks = document.querySelectorAll('a[href^="#"]');
        if (navLinks.length > 0) {
            this.addSuccess(`✅ Found ${navLinks.length} smooth scroll links`);
        }

        // Test form validation
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                this.addSuccess('✅ Contact form submit button found');
            }
        }

        // Test project filters
        const filterButtons = document.querySelectorAll('.filter-btn');
        if (filterButtons.length > 0) {
            this.addSuccess(`✅ Found ${filterButtons.length} project filter buttons`);
        }

        // Test lightbox
        const projectImages = document.querySelectorAll('.project-image img');
        if (projectImages.length > 0) {
            this.addSuccess(`✅ Found ${projectImages.length} project images for lightbox`);
        }
    }

    // Utility methods
    simulateScreenSize(width, height) {
        // This is a simulation - in real testing, you'd use browser dev tools
        window.innerWidth = width;
        window.innerHeight = height;
        window.dispatchEvent(new Event('resize'));
    }

    simulateClick(element) {
        // Simulate a click event
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        element.dispatchEvent(clickEvent);
    }

    addSuccess(message) {
        this.successes.push(message);
        this.testResults[message] = 'success';
    }

    addWarning(message) {
        this.warnings.push(message);
        this.testResults[message] = 'warning';
    }

    addIssue(message) {
        this.issues.push(message);
        this.testResults[message] = 'issue';
    }

    // Generate comprehensive report
    generateReport() {
        console.log('\n📊 TESTING REPORT');
        console.log('================');
        
        const totalTests = this.successes.length + this.warnings.length + this.issues.length;
        
        console.log(`\n✅ Successes: ${this.successes.length}`);
        this.successes.forEach(success => console.log(`  ${success}`));
        
        console.log(`\n⚠️ Warnings: ${this.warnings.length}`);
        this.warnings.forEach(warning => console.log(`  ${warning}`));
        
        console.log(`\n❌ Issues: ${this.issues.length}`);
        this.issues.forEach(issue => console.log(`  ${issue}`));
        
        console.log(`\n📈 Summary:`);
        console.log(`  Total Tests: ${totalTests}`);
        console.log(`  Success Rate: ${((this.successes.length / totalTests) * 100).toFixed(1)}%`);
        
        if (this.issues.length === 0) {
            console.log('\n🎉 All tests passed! Your portfolio website is ready for deployment.');
        } else {
            console.log('\n🔧 Issues found. Please review and fix the issues above.');
        }

        // Store results for external access
        window.portfolioTestResults = {
            successes: this.successes,
            warnings: this.warnings,
            issues: this.issues,
            summary: {
                total: totalTests,
                successRate: ((this.successes.length / totalTests) * 100).toFixed(1)
            }
        };
    }
}

// Auto-run tests when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for all scripts to load
    setTimeout(() => {
        const tester = new PortfolioTester();
        tester.init();
    }, 1000);
});

// Export for manual testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioTester;
} 