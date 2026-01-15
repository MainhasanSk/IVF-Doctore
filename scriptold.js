// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== ACTIVE NAVIGATION ON SCROLL =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
const navbar = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===== FORM SUBMISSION =====
const appointmentForm = document.getElementById('appointmentForm');
const formMessage = document.getElementById('formMessage');

appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(appointmentForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const service = formData.get('service');

    // Basic validation
    if (!name || !phone || !email || !service) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = phone.replace(/\s|-/g, '');
    if (!phoneRegex.test(cleanPhone)) {
        showMessage('Please enter a valid 10-digit phone number.', 'error');
        return;
    }

    // Simulate form submission (In production, send to backend)
    setTimeout(() => {
        showMessage('Thank you! Your appointment request has been received. We will contact you shortly.', 'success');
        appointmentForm.reset();

        // In a real application, you would send this data to your server
        console.log('Form Data:', {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            age: formData.get('age'),
            service: formData.get('service'),
            message: formData.get('message')
        });
    }, 1000);
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = type;

    // Auto-hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
        formMessage.className = '';
    }, 5000);
}

// ===== ANIMATE ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .story-card, .stat-box, .feature, .resource');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statElements = entry.target.querySelectorAll('.stat h3, .stat-box h3');
            statElements.forEach(el => {
                const text = el.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if (number && !isNaN(number)) {
                    el.textContent = '0';
                    setTimeout(() => {
                        animateCounter(el, number);
                        // Add back the suffix if exists
                        setTimeout(() => {
                            if (text.includes('+')) {
                                el.textContent = number + '+';
                            } else if (text.includes('%')) {
                                el.textContent = number + '%';
                            }
                        }, 2000);
                    }, 200);
                }
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats, .success-stats').forEach(stats => {
    statsObserver.observe(stats);
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== CONSOLE MESSAGE =====
console.log('%c🏥 SIRPI Fertility and Women's Centre', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped with ❤️ for Dr. M. Nancy Anitha', 'color: #7c3aed; font-size: 14px;');
console.log('%cFor any technical support, please contact the web development team.', 'color: #6b7280; font-size: 12px;');