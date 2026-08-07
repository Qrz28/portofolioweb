document.addEventListener("DOMContentLoaded", () => {
    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Debounce function for performance
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
    
    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Safe element selector with error handling
    function safeSelect(selector) {
        try {
            return document.querySelector(selector);
        } catch (error) {
            console.warn(`Selector error: ${selector}`, error);
            return null;
        }
    }
    
    // Safe selector all with error handling
    function safeSelectAll(selector) {
        try {
            return document.querySelectorAll(selector);
        } catch (error) {
            console.warn(`Selector error: ${selector}`, error);
            return [];
        }
    }

    // ============================================
    // 1. THEME SWITCHER
    // ============================================
    const themeToggle = safeSelect('#themeToggle');
    const htmlElement = document.documentElement;
    
    try {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        htmlElement.setAttribute('data-theme', savedTheme);

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = htmlElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                htmlElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    } catch (error) {
        console.warn('Theme switcher initialization failed:', error);
    }

    // ============================================
    // 2. LENIS SMOOTH SCROLLING
    // ============================================
    let lenis;
    try {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Sync GSAP ScrollTrigger with Lenis
        if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger);
        }
    } catch (error) {
        console.warn('Lenis initialization failed:', error);
    }

    // ============================================
    // 3. FLOATING PARTICLES SYSTEM
    // ============================================
    function createParticles() {
        if (prefersReducedMotion) return;

        try {
            const container = document.getElementById('particles');
            if (!container) return;

            const particleCount = 50;
            const particles = [];

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';

                const size = Math.random() * 4 + 2;
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;

                particle.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}%;
                    top: ${y}%;
                    opacity: ${Math.random() * 0.3 + 0.1};
                `;

                container.appendChild(particle);
                particles.push({ element: particle, x, y, duration, delay });

                // Animate particle
                if (typeof gsap !== 'undefined') {
                    gsap.to(particle, {
                        x: 'random(-100, 100)',
                        y: 'random(-100, 100)',
                        duration: duration,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                        delay: delay
                    });
                }
            }
        } catch (error) {
            console.warn('Particle system initialization failed:', error);
        }
    }
    createParticles();

    // ============================================
    // 4. MOUSE TRACKING FOR GLOW EFFECT
    // ============================================
    function trackMouse() {
        try {
            document.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                document.documentElement.style.setProperty('--mouse-x', `${x}%`);
                document.documentElement.style.setProperty('--mouse-y', `${y}%`);
            }, { passive: true });
        } catch (error) {
            console.warn('Mouse tracking failed:', error);
        }
    }
    trackMouse();

    // ============================================
    // 5. PRELOADER & HERO ANIMATION
    // ============================================
    try {
        if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline();
            tl.to(".loader-progress-fill", { width: "100%", duration: 1, ease: "power2.inOut" })
                .to(".loader-content", { y: -50, opacity: 0, duration: 0.5, ease: "power2.in" })
                .to(".preloader", { y: "-100%", duration: 0.8, ease: "power3.inOut" })
                .add(() => { document.body.classList.remove('loading'); })
                // Stagger Hero Content
                .from(".hero-text .eyebrow", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
                .from(".hero-title", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
                .from(".hero-description", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
                .from(".hero-actions .btn", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.4")
                .from(".metric-chip", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.4")
                .from(".profile-card", { scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.8")
                .from(".floating-card", { scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" }, "-=0.6")
                .add(() => { animateCounters(); animateTyping(); });
        } else {
            // Fallback if GSAP fails to load
            document.body.classList.remove('loading');
            document.querySelector('.preloader').style.display = 'none';
        }
    } catch (error) {
        console.warn('GSAP animation failed:', error);
        document.body.classList.remove('loading');
        document.querySelector('.preloader').style.display = 'none';
    }

    // ============================================
    // 6. CUSTOM CURSOR WITH ENHANCED EFFECTS
    // ============================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (cursorDot && cursorOutline && window.innerWidth > 768 && !prefersReducedMotion) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        }, { passive: true });

        const hoverElements = document.querySelectorAll('a, button, .project-card, .feature-card, .metric-chip');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover');
                // Add magnetic effect for certain elements
                if (el.classList.contains('magnetic')) {
                    gsap.to(cursorOutline, { scale: 1.2, duration: 0.3 });
                }
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
                gsap.to(cursorOutline, { scale: 1, duration: 0.3 });
            });
        });
    }

    // ============================================
    // 7. ENHANCED MAGNETIC ELEMENTS & 3D TILT
    // ============================================
    const magneticEls = document.querySelectorAll('.magnetic');
    magneticEls.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            if (prefersReducedMotion) return;
            const bound = el.getBoundingClientRect();
            const strength = el.dataset.strength || 20;
            const x = ((e.clientX - bound.left) / el.offsetWidth) - 0.5;
            const y = ((e.clientY - bound.top) / el.offsetHeight) - 0.5;
            gsap.to(el, { 
                x: x * strength, 
                y: y * strength, 
                duration: 0.6, 
                ease: "power4.out" 
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { 
                x: 0, 
                y: 0, 
                duration: 0.8, 
                ease: "elastic.out(1, 0.3)" 
            });
        });
    });

    const tiltEls = document.querySelectorAll('.tilt-effect');
    tiltEls.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            if (prefersReducedMotion) return;
            const bound = el.getBoundingClientRect();
            const x = (e.clientX - bound.left) / bound.width;
            const y = (e.clientY - bound.top) / bound.height;
            const tiltX = (y - 0.5) * -12; // Reduced tilt for smoother effect
            const tiltY = (x - 0.5) * 12;
            gsap.to(el, { 
                rotateX: tiltX, 
                rotateY: tiltY, 
                duration: 0.4, 
                ease: "power2.out" 
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { 
                rotateX: 0, 
                rotateY: 0, 
                duration: 0.6, 
                ease: "power2.out" 
            });
        });
    });

    // ============================================
    // 8. BUTTON RIPPLE EFFECT
    // ============================================
    function createRipple(event) {
        if (prefersReducedMotion) return;
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', createRipple);
    });

    // ============================================
    // 9. ENHANCED BACKGROUND PARALLAX
    // ============================================
    if (!prefersReducedMotion) {
        window.addEventListener('mousemove', throttle((e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            gsap.to('.shape-1', { 
                x: x * 60, 
                y: y * 60, 
                duration: 1.5, 
                ease: "power2.out" 
            });
            gsap.to('.shape-2', { 
                x: x * -60, 
                y: y * -60, 
                duration: 1.5, 
                ease: "power2.out" 
            });
        }, 50), { passive: true });
    }

    // ============================================
    // 10. NAVBAR & SCROLL LOGIC
    // ============================================
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-links a');

    const handleScroll = throttle(() => {
        if (window.scrollY > 50) {
            navbar.classList.add('is-scrolled');
        } else {
            navbar.classList.remove('is-scrolled');
        }

        let current = "";
        sections.forEach(sec => {
            const secTop = sec.offsetTop;
            const secHeight = sec.clientHeight;
            if (window.scrollY >= secTop - 200) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100); // Throttle to run max once every 100ms

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('is-open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });
    navLinks.forEach(link => link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
    }));

    // ============================================
    // 11. SCROLL ANIMATIONS (GSAP)
    // ============================================
    if (!prefersReducedMotion) {
        gsap.utils.toArray('.section-heading').forEach(heading => {
            gsap.from(heading, {
                scrollTrigger: { trigger: heading, start: "top 85%" },
                y: 30, opacity: 0, duration: 0.8, ease: "power3.out"
            });
        });

        const grids = ['.about-grid', '.osis-grid', '.projects-grid'];
        grids.forEach(selector => {
            const grid = document.querySelector(selector);
            if (grid) {
                gsap.from(grid.querySelectorAll('.stagger-item'), {
                    scrollTrigger: { trigger: grid, start: "top 80%" },
                    y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out"
                });
            }
        });

        // Animate Skill Cards
        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
            ScrollTrigger.create({
                trigger: skillsSection,
                start: "top 75%",
                onEnter: () => {
                    const cards = document.querySelectorAll('.skill-card');
                    cards.forEach((card, index) => {
                        gsap.fromTo(card, 
                            { y: 30, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.6, delay: index * 0.1, ease: "power3.out" }
                        );
                    });
                },
                once: true
            });
        }

        // Animate Timeline Items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            ScrollTrigger.create({
                trigger: item,
                start: "top 80%",
                onEnter: () => {
                    gsap.fromTo(item,
                        { x: -30, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.8, delay: index * 0.2, ease: "power3.out" }
                    );
                },
                once: true
            });
        });
    } else {
        // Skip animations for reduced motion
        document.querySelectorAll('.stagger-item, .reveal').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    // ============================================
    // 12. STATISTICS COUNTER
    // ============================================
    function animateCounters() {
        if (prefersReducedMotion) {
            document.querySelectorAll('.counter').forEach(counter => {
                counter.textContent = counter.dataset.target;
            });
            return;
        }
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            gsap.to(counter, {
                innerHTML: target,
                duration: 2,
                snap: { innerHTML: 1 },
                ease: "power2.out",
                onUpdate: function () {
                    counter.innerHTML = Math.round(this.targets()[0].innerHTML);
                }
            });
        });
    }

    // ============================================
    // 13. TYPING ANIMATION
    // ============================================
    function animateTyping() {
        if (prefersReducedMotion) {
            const typingText = document.querySelector(".typing-text");
            if (typingText) typingText.textContent = "Siswa SMK | Aktif Organisasi";
            return;
        }
        const textArray = ["Siswa SMK", "Aktif Organisasi", "Siap Belajar"];
        const typingText = document.querySelector(".typing-text");
        let textIndex = 0;

        function typeNext() {
            const text = textArray[textIndex];
            typingText.innerHTML = "";
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    typingText.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        eraseText();
                    }, 2000);
                }
            }, 100);
        }

        function eraseText() {
            const text = textArray[textIndex];
            let i = text.length;
            const eraseInterval = setInterval(() => {
                if (i > 0) {
                    typingText.innerHTML = text.substring(0, i - 1);
                    i--;
                } else {
                    clearInterval(eraseInterval);
                    textIndex = (textIndex + 1) % textArray.length;
                    setTimeout(() => {
                        typeNext();
                    }, 500);
                }
            }, 50);
        }
        typeNext();
    }

    // ============================================
    // 14. MODALS LOGIC
    // ============================================
    const modalTriggers = document.querySelectorAll('.open-modal');
    const modals = document.querySelectorAll('.modal-overlay');
    const closeBtns = document.querySelectorAll('.close-modal');
    let lastFocusedElement;

    // Focus trap function for accessibility
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
            if (e.key === 'Escape') {
                element.classList.remove('active');
                lenis.start();
                if (lastFocusedElement) lastFocusedElement.focus();
            }
        });
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                lastFocusedElement = document.activeElement;
                modal.classList.add('active');
                lenis.stop(); // Stop scrolling while modal is open
                
                // Focus on close button for accessibility
                const closeBtn = modal.querySelector('.close-modal');
                if (closeBtn) closeBtn.focus();
                
                // Set up focus trap
                trapFocus(modal);
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            modal.classList.remove('active');
            lenis.start();
            if (lastFocusedElement) lastFocusedElement.focus();
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
            lenis.start();
            if (lastFocusedElement) lastFocusedElement.focus();
        }
    });

    // ============================================
    // 15. BACK TO TOP & CURRENT YEAR
    // ============================================
    const backToTopBtn = document.getElementById('backToTop');
    backToTopBtn.addEventListener('click', () => {
        lenis.scrollTo(0);
    });

    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // ============================================
    // 16. FORM SUBMISSION SIMULATION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Mengirim...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                formMessage.textContent = "Pesan berhasil dikirim!";
                formMessage.style.color = "var(--success)";
                contactForm.reset();
                setTimeout(() => formMessage.textContent = "", 4000);
            }, 1500);
        });
    }
});
