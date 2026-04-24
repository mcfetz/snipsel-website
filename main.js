// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // We can unobserve after animating in
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic Navbar opacity
const nav = document.querySelector('.glass-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 23, 42, 0.9)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.7)';
    }
});

// Parallax effect for blobs
window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// Hero Mockup Slideshow
const slideImages = [
    'assets/hero_mockup.png',
    'assets/screen_collections.png',
    'assets/screen_collection.png',
    'assets/screen_cards.png',
    'assets/screen_cards2.png',
    'assets/screen_editor.png',
    'assets/screen_ai.png',
    'assets/screen_images.png',
    'assets/screen_tasks.png',
    'assets/screen_settings.png'
];

let currentSlide = 0;
const slideBase = document.getElementById('slide-base');
const slideTop = document.getElementById('slide-top');

if (slideBase && slideTop) {
    const preloadImage = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => resolve(url); // ignore errors
            img.src = url;
        });
    };

    setInterval(async () => {
        let nextSlide = (currentSlide + 1) % slideImages.length;
        let nextUrl = slideImages[nextSlide];
        
        // Preload next image before showing to avoid flicker
        await preloadImage(nextUrl);

        // Put next image in top (invisible) layer
        slideTop.src = nextUrl;
        
        // Fade in top image
        slideTop.style.opacity = 1;

        // Wait for CSS fade to finish (1000ms)
        setTimeout(() => {
            // Update base image so it sits behind
            slideBase.src = nextUrl;
            
            // Instantly hide top image again (without transition visually affecting anything)
            slideTop.style.transition = 'none';
            slideTop.style.opacity = 0;
            
            // Re-apply transition for next time
            setTimeout(() => {
                slideTop.style.transition = 'opacity 1s ease-in-out';
            }, 50);
            
            currentSlide = nextSlide;
        }, 1000); 

    }, 3000);
}

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const imgLightbox = document.getElementById('img-lightbox');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');

if (lightbox && imgLightbox) {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery-img');
            const caption = item.querySelector('.gallery-caption');
            
            imgLightbox.src = img.src;
            lightboxCaption.textContent = caption.textContent;
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    closeBtn.addEventListener('click', closeLightbox);

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });
}
