console.log("Portfolio loaded successfully!");

// Typewriter effect function
function typeWriter(element, text, speed = 100, callback = null) {
    let i = 0;
    element.innerHTML = '';
    element.classList.add('typewriter');
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove the typewriter cursor after completion
            setTimeout(() => {
                element.classList.remove('typewriter');
                if (callback) callback();
            }, 500);
        }
    }
    type();
}

// Initialize text animations
function initTextAnimations() {
    const nameElement = document.getElementById('animated-name');
    const subtitleElement = document.getElementById('animated-subtitle');
    
    if (nameElement && subtitleElement) {
        // Get current language
        const isEnglish = !document.documentElement.classList.contains('fr');
        
        const name = 'Bellmir Yahya';
        const occupation = isEnglish ? 'AI & Data Science Engineer' : 'Ingénieur en IA & Science des Données';
        
        // Start with name animation
        setTimeout(() => {
            typeWriter(nameElement, name, 80, () => {
                // After name is complete, show subtitle with smooth animation
                subtitleElement.textContent = occupation;
                setTimeout(() => {
                    subtitleElement.classList.add('show');
                }, 200);
            });
        }, 500); // Small delay before starting
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Initialize text animations
    initTextAnimations();

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            const isActive = navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            body.classList.toggle('no-scroll', isActive);
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }

    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').endsWith(currentPage)) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink();

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });

    // Add hover effect to contact cards
    const cards = document.querySelectorAll('.contact-card');
    
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.icon-wrapper i');
                icon.style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.icon-wrapper i');
                icon.style.transform = 'scale(1)';
            });
        });
    }
});