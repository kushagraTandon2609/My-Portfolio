// Initialize AOS
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    const track = document.querySelector('.certificates-track');
    const cards = document.querySelectorAll('.certification-card');
    
    // Function to get card width including gap based on screen size
    function getCardWidth() {
        const isMobile = window.innerWidth <= 768;
        const gap = isMobile ? 16 : 32; // 1rem = 16px for mobile, 2rem = 32px for desktop
        return cards[0].offsetWidth + gap;
    }

    let isScrolling = false;
    let scrollTimeout;

    // Handle scroll snapping
    track.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            const currentScroll = track.scrollLeft;
            const cardWidth = getCardWidth();
            const nearestIndex = Math.round(currentScroll / cardWidth);
            const snapPosition = nearestIndex * cardWidth;

            if (!isScrolling) {
                track.scrollTo({ 
                    left: snapPosition, 
                    behavior: 'smooth' 
                });
            }
        }, 150);
    });

    // Handle wheel scrolling
    track.addEventListener('wheel', (e) => {
        isScrolling = true;
        
        const scrollAmount = e.deltaY * 0.5;
        track.scrollLeft += scrollAmount;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);

        e.preventDefault();
    }, { passive: false });
});

// Toggle certificate details
function toggleDetails(element) {
    closeAllDetails(); // Close all other open card details

    element.classList.toggle('active');
    const details = element.nextElementSibling;

    if (details.style.height === '0px' || !details.style.height) {
        details.style.height = details.scrollHeight + 'px';
    } else {
        details.style.height = '0';
    }
}

// Get current certificate index
function getCurrentIndex() {
    const track = document.querySelector('.certificates-track');
    const cards = document.querySelectorAll('.certification-card');
    const isMobile = window.innerWidth <= 768;
    const gap = isMobile ? 16 : 32;
    const cardWidth = cards[0].offsetWidth + gap;
    const currentScroll = track.scrollLeft;
    return Math.round(currentScroll / cardWidth);
}

// Scroll to specific certificate
function scrollToCertificate(index) {
    const track = document.querySelector('.certificates-track');
    const cards = document.querySelectorAll('.certification-card');
    
    closeAllDetails(); // Always close details, even if the index is invalid

    if (index >= 0 && index < cards.length) {
        const isMobile = window.innerWidth <= 768;
        const gap = isMobile ? 16 : 32;
        const cardWidth = cards[0].offsetWidth + gap;
        const scrollPosition = cardWidth * index;
        track.scrollTo({ 
            left: scrollPosition, 
            behavior: 'smooth' 
        });
    }
}

function closeAllDetails() {
    const allDetails = document.querySelectorAll('.certification-details');
    allDetails.forEach(details => {
        details.style.height = '0';
    });

    const allHeaders = document.querySelectorAll('.certification-header.active');
    allHeaders.forEach(header => {
        header.classList.remove('active');
    });
}

// Event listeners for prev/next buttons
document.querySelector('.prev-certificate').addEventListener('click', function() {
    const currentIndex = getCurrentIndex();
    const prevIndex = currentIndex - 1;
    scrollToCertificate(prevIndex);
});

document.querySelector('.next-certificate').addEventListener('click', function() {
    const currentIndex = getCurrentIndex();
    const nextIndex = currentIndex + 1;
    scrollToCertificate(nextIndex);
});

// Close card details when clicking outside
document.addEventListener('click', (e) => {
    const isCardHeader = e.target.closest('.certification-header');
    const isCardContent = e.target.closest('.certification-details');
    const isNavButton = e.target.closest('.nav-button');
    
    if (!isCardHeader && !isCardContent && !isNavButton) {
        closeAllDetails();
    }
});
