// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');

    // Handle scroll effect on navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Handle mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = !mobileNav.classList.contains('hidden');
        
        if (isOpen) {
            // Close menu
            mobileNav.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        } else {
            // Open menu
            mobileNav.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            mobileNav.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });
}

// Smooth scrolling functionality
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const navHeight = 64; // Height of fixed navbar
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu after navigation
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
    
    mobileNav.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
}

// Scroll-triggered animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

// Initialize animations with delays
function initializeAnimations() {
    // Stagger animations for grid items
    const grids = ['.about-stats', '.interests-grid', '.achievements-grid', '.projects-grid', '.works-grid'];
    
    grids.forEach(gridSelector => {
        const grid = document.querySelector(gridSelector);
        if (grid) {
            const items = grid.children;
            Array.from(items).forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        }
    });
}

// Works filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Filter logic would go here
            // For demo purposes, we're just updating the active state
        });
    });
});

// Enhanced scroll animations
function initializeAdvancedAnimations() {
    // Counter animation for achievements stats
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                // Extract number (supports decimals)
                const finalValue = parseFloat(target.textContent.replace(/[^0-9.]/g, '')) || 0;
                let currentValue = 0;
                const steps = 50; // number of animation steps
                const increment = finalValue / steps;

                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        // ✅ smart formatting
                        if (Number.isInteger(finalValue)) {
                            target.textContent = target.textContent.replace(/[0-9.]+/, finalValue.toString());
                        } else {
                            target.textContent = target.textContent.replace(/[0-9.]+/, finalValue.toString());
                        }
                        clearInterval(timer);
                    } else {
                        // ✅ smart formatting while animating
                        if (Number.isInteger(finalValue)) {
                            target.textContent = target.textContent.replace(/[0-9.]+/, Math.floor(currentValue).toString());
                        } else {
                            target.textContent = target.textContent.replace(/[0-9.]+/, currentValue.toFixed(1));
                        }
                    }
                }, 30);

                observer.unobserve(target);
            }
        });
    };
    
    const counterObserver = new IntersectionObserver(animateCounters, {
        threshold: 0.5
    });
    
    statsNumbers.forEach(stat => counterObserver.observe(stat));
}


// Progress bar animations
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const animateProgress = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                observer.unobserve(progressBar);
            }
        });
    };
    
    const progressObserver = new IntersectionObserver(animateProgress, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
}

// Initialize all advanced animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeAdvancedAnimations();
        animateProgressBars();
    }, 500);
});

// Smooth page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});