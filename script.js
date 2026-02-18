/* ============================================
   MODERN PORTFOLIO - ENHANCED ANIMATIONS
   ============================================ */

// ============================================
// Device Detection
// ============================================
const isMobile = () => window.innerWidth <= 768;

// ============================================
// 0.5 Falling Stars Animation in Hero
// ============================================
function createFallingStars() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create initial static stars (twinkling)
    const staticStarCount = 30;
    for (let i = 0; i < staticStarCount; i++) {
        const star = document.createElement('div');
        star.className = 'star twinkle';
        
        const size = Math.random() > 0.7 ? 'large' : Math.random() > 0.5 ? 'medium' : 'small';
        star.classList.add(size);
        
        if (Math.random() > 0.6) {
            const twinkleSpeed = Math.random() > 0.5 ? 'twinkle-slow' : 'twinkle-fast';
            star.classList.remove('twinkle');
            star.classList.add(twinkleSpeed);
        }
        
        const top = Math.random() * 80; // 0-80% height
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        
        star.style.top = top + '%';
        star.style.left = left + '%';
        star.style.animationDelay = delay + 's';
        
        hero.appendChild(star);
    }
    
    // Create falling stars periodically
    function createFallingStar() {
        const star = document.createElement('div');
        star.className = 'star falling';
        
        const size = Math.random() > 0.8 ? 'large' : Math.random() > 0.6 ? 'medium' : 'small';
        star.classList.add(size);
        
        const startLeft = Math.random() * 100;
        const duration = 5000 + Math.random() * 5000; // 5-10 seconds
        
        star.style.left = startLeft + '%';
        star.style.top = '-50px';
        star.style.animationDuration = duration + 'ms';
        
        hero.appendChild(star);
        
        // Remove star after animation completes
        setTimeout(() => {
            star.remove();
        }, duration);
    }
    
    // Create falling stars every 0.3-1 second
    if (!isMobile()) {
        setInterval(() => {
            createFallingStar();
        }, 300 + Math.random() * 1000);
    } else {
        // Slower on mobile for performance
        setInterval(() => {
            createFallingStar();
        }, 1000 + Math.random() * 1500);
    }
}

// Initialize falling stars on load
document.addEventListener('DOMContentLoaded', createFallingStars);

// ============================================
// 1. Mobile Menu Toggle with Animation
// ============================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animate nav links when menu opens
    if (navLinks.classList.contains('active')) {
        animateNavLinks();
    }
});

function animateNavLinks() {
    const links = navLinks.querySelectorAll('a');
    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(30px)';
        setTimeout(() => {
            link.style.transition = 'all 0.3s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, 100 * index);
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ============================================
// 2. Smooth Scrolling for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 3. Navbar - Glassmorphism & Background Change
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// 4. Hero Section - Entrance Animations
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero elements on page load
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateX(-50px)';
        setTimeout(() => {
            heroText.style.transition = 'all 1s ease';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateX(0)';
        }, 200);
    }
    
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        setTimeout(() => {
            heroImage.style.transition = 'all 1s ease';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 500);
    }
});

// ============================================
// 5. Scroll Reveal - Staggered Animations
// ============================================
const revealElements = document.querySelectorAll('.osis-card, .project-card, .skill-item, .contact-item, .stat-item');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 80;

    revealElements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - elementVisible) {
            // Add staggered delay
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 50); // 50ms stagger
        }
    });
};

// Set initial state for animation
revealElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(40px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.5, 0, 0, 1)';
    element.style.transitionDelay = `${index * 0.05}s`;
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ============================================
// 6. Section Title Animation
// ============================================
const sectionTitles = document.querySelectorAll('.section-title');

const animateSectionTitles = () => {
    sectionTitles.forEach(title => {
        const titleTop = title.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (titleTop < windowHeight - 100) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }
    });
};

sectionTitles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(30px)';
    title.style.transition = 'all 0.8s ease';
});

window.addEventListener('scroll', animateSectionTitles);
window.addEventListener('load', animateSectionTitles);

// ============================================
// 7. Counter Animation for Stats with Glow Effect
// ============================================
const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;
    
    const statsSection = document.querySelector('.about-stats');
    if (!statsSection) return;
    
    const statsTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (statsTop < windowHeight - 100) {
        statsAnimated = true;
        
        stats.forEach((stat, index) => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 40;
            const duration = 2000;
            const stepTime = duration / 40;
            
            // Add glow effect
            stat.parentElement.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.3)';
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, stepTime);
        });
    }
};

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// ============================================
// 8. Mouse Move Parallax Effect - Disabled on Mobile
// ============================================
const heroSection = document.querySelector('.hero');

if (heroSection && !isMobile()) {
    heroSection.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 60;
        const y = (window.innerHeight / 2 - e.pageY) / 60;
        
        const profile = document.querySelector('.profile-placeholder');
        if (profile) {
            profile.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
    });
}

// ============================================
// 9. Card Tilt Effect (3D Hover) - Disabled on Mobile
// ============================================
const cards = document.querySelectorAll('.osis-card, .project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (isMobile()) return; // Disable on mobile
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
    });
});

// ============================================
// 10. Floating Particles Effect
// ============================================
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.3));
            border-radius: 50%;
            left: ${left}%;
            top: ${top}%;
            animation: float ${duration}s ease-in-out ${delay}s infinite;
            pointer-events: none;
            z-index: 0;
        `;
        
        hero.appendChild(particle);
    }
}

// Add particle animation keyframes
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
    }
`;
document.head.appendChild(particleStyle);

createParticles();

// ============================================
// 11. Active Navigation Based on Scroll
// ============================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').slice(1) === current) {
            li.classList.add('active');
        }
    });
});

// ============================================
// 12. Form Submission with Animation
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // Add loading animation
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;

        if (name && email && message) {
            // Simulate sending (replace with actual backend in production)
            setTimeout(() => {
                // Success animation
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
                submitBtn.style.background = 'linear-gradient(135deg, #10B981, #34D399)';
                
                alert(`Terima kasih, ${name}! Pesan Anda telah terkirim.\n\nKami akan menghubungi Anda di ${email} segera.`);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
                
            }, 1500);
        } else {
            alert('Mohon lengkapi semua field yang wajib diisi!');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// 13. Scroll Progress Indicator
// ============================================
function createScrollProgress() {
    const progress = document.createElement('div');
    progress.id = 'scroll-progress';
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #6366F1, #EC4899);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progress);
}

createScrollProgress();

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
});

// ============================================
// 14. Cursor Trail Effect - Disabled on Mobile
// ============================================
if (!isMobile()) {
    const cursorTrail = [];
    const trailLength = 10;

    for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: ${10 - i}px;
            height: ${10 - i}px;
            background: rgba(99, 102, 241, ${0.5 - i * 0.05});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(trail);
        cursorTrail.push(trail);
    }

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        let x = mouseX, y = mouseY;
        
        cursorTrail.forEach((trail, i) => {
            trail.style.left = x + 'px';
            trail.style.top = y + 'px';
            
            const nextX = cursorTrail[i + 1] ? parseFloat(cursorTrail[i + 1].style.left) : x;
            const nextY = cursorTrail[i + 1] ? parseFloat(cursorTrail[i + 1].style.top) : y;
            
            x += (nextX - x) * 0.3;
            y += (nextY - y) * 0.3;
        });
        
        requestAnimationFrame(animateTrail);
    }

    animateTrail();
}

// ============================================
// 15. Smooth Page Load Animation
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

document.body.style.opacity = '0';

// ============================================
// 16. Button Ripple Effect
// ============================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            width: 100px;
            height: 100px;
            left: ${x - 50}px;
            top: ${y - 50}px;
            transform: scale(0);
            animation: ripple 0.6s linear;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// 17. Skill Bar Animation (if skills section exists)
// ============================================
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barTop < windowHeight - 100) {
            const width = bar.getAttribute('style').match(/width:\s*(\d+%)/);
            if (width) {
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease';
                    bar.style.width = width[1];
                }, 100);
            }
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// ============================================
// 18. Intersection Observer for Better Performance
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .osis-card, .project-card, .contact-item').forEach(el => {
    observer.observe(el);
});

// ============================================
// 19. Keyboard Navigation Enhancement
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ============================================
// 20. Performance: Debounce Scroll Events
// ============================================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // All scroll-based animations are handled here
    revealOnScroll();
    animateStats();
    animateSectionTitles();
}));

// Console welcome message
console.log('%c🎨 Portfolio Theme Modernized!', 'color: #6366F1; font-size: 20px; font-weight: bold;');
console.log('%c✨ New animations and features added!', 'color: #EC4899; font-size: 14px;');
