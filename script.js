// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Main Cube rotation
const cubeWrapper = document.getElementById('cubeWrapper');
let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;
let rotationX = 15;
let rotationY = 25;

cubeWrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
    cubeWrapper.style.animation = 'none'; // Pause animation on drag
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMouseX;
    const deltaY = e.clientY - previousMouseY;
    rotationY += deltaX * 0.5;
    rotationX -= deltaY * 0.5;
    cubeWrapper.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Touch support for Cube
cubeWrapper.addEventListener('touchstart', (e) => {
    isDragging = true;
    previousMouseX = e.touches[0].clientX;
    previousMouseY = e.touches[0].clientY;
    cubeWrapper.style.animation = 'none';
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - previousMouseX;
    const deltaY = e.touches[0].clientY - previousMouseY;
    rotationY += deltaX * 0.5;
    rotationX -= deltaY * 0.5;
    cubeWrapper.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    previousMouseX = e.touches[0].clientX;
    previousMouseY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', () => {
    isDragging = false;
});


// Create stardust effect
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    
    const size = Math.random() * 2 + 1; // Stars are smaller
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    
    const duration = Math.random() * 30 + 20; // Slower, more majestic drift
    star.style.animationDuration = duration + 's';
    
    document.getElementById('animatedBg').appendChild(star);
    
    setTimeout(() => star.remove(), duration * 1000);
}

// Generate stars periodically
setInterval(createStar, 500);

// Create additional cloud layers and glowing orbs
function createBackgroundElements() {
    const animatedBg = document.getElementById('animatedBg');

    // Create more cloud layers
    const cloudLayer1 = document.createElement('div');
    cloudLayer1.className = 'cloud-layer-1';
    animatedBg.appendChild(cloudLayer1);

    const cloudLayer2 = document.createElement('div');
    cloudLayer2.className = 'cloud-layer-2';
    animatedBg.appendChild(cloudLayer2);

    // Create glowing orbs
    for (let i = 0; i < 3; i++) {
        const orb = document.createElement('div');
        orb.className = 'glowing-orb';
        // Add random positioning within a range for each orb
        orb.style.top = `${Math.random() * 80}%`;
        orb.style.left = `${Math.random() * 80}%`;
        animatedBg.appendChild(orb);
    }
}

// Call this once on load
createBackgroundElements();


// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        document.getElementById('navLinks').classList.remove('active');
    });
});


const scrollerInner = document.querySelector('.scroller-inner');

// Duplicate the items until total width > container width * 2
function duplicateLogos() {
    const containerWidth = document.querySelector('.logo-scroller').offsetWidth;
    let totalWidth = scrollerInner.scrollWidth;
    while (totalWidth < containerWidth * 2) {
        scrollerInner.innerHTML += scrollerInner.innerHTML;
        totalWidth = scrollerInner.scrollWidth;
    }
}

// Animate continuously
function startAnimation() {
    let scrollPos = 0;
    const speed = 0.5; // pixels per frame
    function step() {
        scrollPos += speed;
        if (scrollPos >= scrollerInner.scrollWidth / 2) scrollPos = 0;
        scrollerInner.style.transform = `translateX(-${scrollPos}px)`;
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

duplicateLogos();
startAnimation();

const statCards = document.querySelectorAll('.stat-card');
let animated = false;

function animateCounter(counter, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

function checkScroll() {
    if (animated) return;

    statCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;

        if (isVisible) {
            setTimeout(() => {
                card.classList.add('animate');
                const counter = card.querySelector('.counter');
                const target = parseInt(card.dataset.target);
                animateCounter(counter, target);
            }, index * 100);
        }
    });

    const allAnimated = Array.from(statCards).every(card => 
        card.classList.contains('animate')
    );

    if (allAnimated) {
        animated = true;
    }
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);
checkScroll();

document.addEventListener('DOMContentLoaded', () => {
    // --- Setup animated particles ---
    const background = document.getElementById('background');
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        background.appendChild(particle);
    }
    // Services Card Navigation logic has been removed.
    // Initialization of updateCards(0) has also been removed.
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Particle Generation ---
    function createParticles(containerId, count) {
        const container = document.getElementById(containerId);
        if (!container) return; 

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            // Set random initial properties for variance
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            container.appendChild(particle);
        }
    }

    createParticles('particles1', 20);
    createParticles('particles2', 20);

    // --- Parallax Effect (Desktop Only) ---
    // Only apply on screens wider than 1024px to prevent issues on mobile
    if (window.innerWidth > 1024) {
        document.querySelectorAll('.slide').forEach(slide => {
            slide.addEventListener('mousemove', (e) => {
                const imageContainer = slide.querySelector('.image-container');
                const rect = slide.getBoundingClientRect();
                
                // Normalize mouse position to [-0.5, 0.5]
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                // Apply 3D rotation and translation
                imageContainer.style.transform = `
                    perspective(1200px) 
                    translateY(${y * 20}px) 
                    translateZ(60px) 
                    rotateY(${x * 10 - 8}deg) 
                    rotateX(${-y * 10}deg)
                `;
            });

            slide.addEventListener('mouseleave', () => {
                // Reset transform to CSS animation state on mouse leave
                slide.querySelector('.image-container').style.transform = '';
            });
        });
    }
});

  const slider1 = document.getElementById('slider1Wrapper');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider1.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - slider1.offsetLeft;
            scrollLeft = slider1.scrollLeft;
        });

        slider1.addEventListener('mouseleave', () => {
            isDown = false;
        });

        slider1.addEventListener('mouseup', () => {
            isDown = false;
        });

        slider1.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider1.offsetLeft;
            const walk = (x - startX) * 2;
            slider1.scrollLeft = scrollLeft - walk;
        });

        document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the placeholder element by its ID
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    // Check if the placeholder exists on the current page
    if (footerPlaceholder) {
        // 2. Use the Fetch API to load the content of the external file
        fetch('footer.html')
            .then(response => {
                // Ensure the response is OK (HTTP 200 status)
                if (!response.ok) {
                    // Throw an error if the file is not found or inaccessible
                    throw new Error(`Failed to load footer. Status: ${response.status}`);
                }
                // Convert the response stream to plain text
                return response.text();
            })
            .then(html => {
                // 3. Inject the fetched HTML content into the placeholder div
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => {
                // Handle any errors during the fetch process
                console.error("Error loading footer content:", error);
                // Optional: Display a message to the user if the footer fails to load
                footerPlaceholder.innerHTML = '<div style="color: #ff5555; text-align: center; padding: 20px;">Error: Could not load the footer content.</div>';
            });
    }
});