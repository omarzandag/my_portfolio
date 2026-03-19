// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const hoverElements = document.querySelectorAll('a, button, .nav-item, .nav-btn, input, textarea');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

// Navbar effect on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Fade up animation utility
const fadeUpElements = document.querySelectorAll('.fade-up');
fadeUpElements.forEach(element => {
    gsap.fromTo(element, 
        { 
            y: 50, 
            opacity: 0 
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%", // Trigger animation when element is 85% from top of viewport
                toggleActions: "play none none none"
            }
        }
    );
});

// Staggered animation for hero initially
gsap.fromTo(".hero .fade-up", 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
);

// Form handling with Web3Forms (No backend server required)
const form = document.getElementById('custom-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Sending...';
        submitBtn.style.pointerEvents = 'none';

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                submitBtn.innerHTML = 'Success! <i class="fa-solid fa-check"></i>';
                submitBtn.style.background = '#10b981';
                form.reset();
            } else {
                console.log(response);
                submitBtn.innerHTML = 'Failed <i class="fa-solid fa-xmark"></i>';
            }
        })
        .catch(error => {
            console.log(error);
            submitBtn.innerHTML = 'Error <i class="fa-solid fa-triangle-exclamation"></i>';
        })
        .finally(() => {
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.pointerEvents = 'auto';
                submitBtn.style.background = '';
            }, 3000);
        });
    });
}

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Check local storage for theme preference
    if (localStorage.getItem('theme') === 'light') {
        body.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'light') {
            body.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}
