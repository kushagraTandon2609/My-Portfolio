document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when a link is clicked (for mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
});