// Page Loader
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.loader-container');
    
    // Hide loader after page is fully loaded
    setTimeout(function() {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 1500);
    
    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            // Create mobile navigation if it doesn't exist
            if (!document.querySelector('.mobile-nav')) {
                const mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                
                // Clone nav links to mobile menu
                const navLinksClone = navLinks.cloneNode(true);
                mobileNav.appendChild(navLinksClone);
                
                // Add close button
                const closeButton = document.createElement('div');
                closeButton.className = 'close-menu';
                closeButton.innerHTML = '<i class="fas fa-times"></i>';
                mobileNav.appendChild(closeButton);
                
                // Add event listener to close button
                closeButton.addEventListener('click', function() {
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = 'visible';
                });
                
                // Add mobile nav to page
                document.body.appendChild(mobileNav);
                
                // Style mobile nav
                mobileNav.style.position = 'fixed';
                mobileNav.style.top = '0';
                mobileNav.style.left = '0';
                mobileNav.style.width = '100%';
                mobileNav.style.height = '100%';
                mobileNav.style.backgroundColor = 'var(--blue)';
                mobileNav.style.zIndex = '999';
                mobileNav.style.padding = '2rem';
                mobileNav.style.display = 'flex';
                mobileNav.style.flexDirection = 'column';
                mobileNav.style.justifyContent = 'center';
                mobileNav.style.transform = 'translateY(-100%)';
                mobileNav.style.transition = 'transform 0.3s ease-in-out';
                
                // Style close button
                closeButton.style.position = 'absolute';
                closeButton.style.top = '2rem';
                closeButton.style.right = '2rem';
                closeButton.style.fontSize = '2rem';
                closeButton.style.cursor = 'pointer';
                closeButton.style.color = 'white';
                
                // Style mobile nav links
                navLinksClone.style.display = 'flex';
                navLinksClone.style.flexDirection = 'column';
                navLinksClone.style.alignItems = 'center';
                navLinksClone.style.gap = '2rem';
                
                // Style mobile nav links children
                const mobileNavLinks = navLinksClone.querySelectorAll('a');
                mobileNavLinks.forEach(link => {
                    link.style.fontSize = '1.5rem';
                    link.style.color = 'white';
                });
            }
            
            // Toggle mobile nav
            const mobileNav = document.querySelector('.mobile-nav');
            mobileNav.style.transform = 'translateY(0)';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.testimonial-arrow.prev');
    const nextButton = document.querySelector('.testimonial-arrow.next');
    
    if (testimonialSlides.length > 0) {
        let currentSlide = 0;
        
        // Function to show slide
        function showSlide(index) {
            // Hide all slides
            testimonialSlides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Deactivate all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show current slide and activate corresponding dot
            testimonialSlides[index].classList.add('active');
            dots[index].classList.add('active');
        }
        
        // Event listeners for dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Event listeners for arrow navigation
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
                showSlide(currentSlide);
            });
            
            nextButton.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % testimonialSlides.length;
                showSlide(currentSlide);
            });
        }
        
        // Auto-advance slides every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature, .partner-logo');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (position < screenHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.service-card, .feature, .partner-logo');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation on page load
    setTimeout(animateOnScroll, 500);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});