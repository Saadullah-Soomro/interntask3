// Mobile menu toggle
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Carousel variables
let slideIndex = 1;
let slideInterval;
let carouselInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with enhanced settings
    AOS.init({
        duration: 1000,
        once: true,
        offset: 120,
        easing: 'ease-out-cubic',
        mirror: false,
        anchorPlacement: 'top-bottom'
    });

    // Initialize custom scroll animations
    initScrollAnimations();
    
    // Enhanced smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize parallax effect
    initParallaxEffect();

    // Initialize carousel with delay to ensure DOM is ready
    setTimeout(() => {
        initializeCarousel();
    }, 500);
});

// Enhanced smooth scrolling function
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Enhanced scroll animations (complementing AOS)
function initScrollAnimations() {
    // Additional scroll-based effects that work alongside AOS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add custom scroll effects here if needed
                // Currently letting AOS handle the main animations
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe sections for custom effects
    const sections = document.querySelectorAll('.features-section, .testimonials-section, .pricing-section');
    sections.forEach(section => observer.observe(section));
}

// Parallax effect for hero section
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Enhanced scroll-based navbar behavior
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 2px 20px rgba(15, 23, 42, 0.15)';
    } else {
        navbar.style.backgroundColor = 'var(--white)';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = '0 2px 20px rgba(15, 23, 42, 0.1)';
    }
    
    // Update active nav link based on scroll position
    updateActiveNavOnScroll();
});

// Update active nav link based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos <= bottom) {
            updateActiveNavLink(`#${id}`);
        }
    });
}

// Carousel functions
function changeSlide(n) {
    stopAutoSlide();
    slideIndex += n;
    showSlides(slideIndex);
    startAutoSlide();
}

function currentSlide(n) {
    stopAutoSlide();
    slideIndex = n;
    showSlides(slideIndex);
    startAutoSlide();
}

function showSlides(n) {
    const slides = document.getElementsByClassName('carousel-slide');
    const dots = document.getElementsByClassName('dot');
    
    if (slides.length === 0) return;
    
    // Handle slide index bounds
    if (n > slides.length) { 
        slideIndex = 1; 
    }
    if (n < 1) { 
        slideIndex = slides.length; 
    }
    
    // Remove active class from all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    // Add active class to current slide and dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
        console.log('Showing slide', slideIndex);
    }
    
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Initialize carousel function
function initializeCarousel() {
    if (carouselInitialized) return;
    
    const slides = document.getElementsByClassName('carousel-slide');
    const dots = document.getElementsByClassName('dot');
    
    if (slides.length === 0 || dots.length === 0) {
        console.log('Carousel elements not found, retrying...');
        setTimeout(initializeCarousel, 1000);
        return;
    }
    
    carouselInitialized = true;
    console.log('Carousel initialized with', slides.length, 'slides');
    
    // Show first slide
    showSlides(slideIndex);
    
    // Start auto-slide
    startAutoSlide();

    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            console.log('Carousel hover - pausing auto-slide');
            stopAutoSlide();
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            console.log('Carousel leave - resuming auto-slide');
            startAutoSlide();
        });
    }
}

function startAutoSlide() {
    // Clear any existing interval
    stopAutoSlide();
    
    slideInterval = setInterval(() => {
        slideIndex++;
        if (slideIndex > document.getElementsByClassName('carousel-slide').length) {
            slideIndex = 1;
        }
        console.log('Auto-changing to slide', slideIndex);
        showSlides(slideIndex);
    }, 3000); // Change slide every 3 seconds
    
    console.log('Auto-slide started');
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

