// JavaScript file (Aboutme.js)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // DOM elements
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const navItems = document.querySelectorAll('.nav-item');
    const mobileTabs = document.querySelectorAll('.mobile-tab');
    const contentSections = document.querySelectorAll('.content-section');

    // Mobile sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Function to show a specific section
    function showSection(sectionId) {
        // Update navigation items (desktop)
        navItems.forEach(navItem => {
            if (navItem.getAttribute('data-section') === sectionId) {
                navItem.classList.add('active');
            } else {
                navItem.classList.remove('active');
            }
        });
        
        // Update mobile tabs
        mobileTabs.forEach(tab => {
            if (tab.getAttribute('data-section') === sectionId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Show corresponding section
        contentSections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Desktop navigation functionality
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);

            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Mobile tabs functionality
    mobileTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Skill items animation
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('bounce');
            void this.offsetWidth; // Trigger reflow
            this.classList.add('bounce');
        });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target) && 
                e.target !== sidebarToggle) {
                sidebar.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });

    // Set initial active section
    const defaultSection = "education";
    showSection(defaultSection);
});