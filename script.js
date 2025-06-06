document.addEventListener('DOMContentLoaded', function() {
    // ================== Script Loading Screen ==================
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    // Durasi loading screen dalam milidetik (misal: 3000ms = 3 detik)
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
        }
        if (mainContent) {
            mainContent.classList.remove('hidden');
            // Tambahkan animasi fade-in untuk konten utama jika diinginkan
            mainContent.style.opacity = '0';
            setTimeout(() => {
                mainContent.style.transition = 'opacity 0.5s ease-in';
                mainContent.style.opacity = '1';
            }, 50);
        }
    }, 3000);
    

    // ================== Script Menu Mobile ==================
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('#mobile-menu a[href^="#"], header nav a[href^="#"]');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuButton.setAttribute('aria-expanded', !expanded);
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.querySelectorAll('svg').forEach(svg => svg.classList.toggle('hidden'));
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    mobileMenu.classList.add('hidden');
                    const svgs = mobileMenuButton.querySelectorAll('svg');
                    svgs[0].classList.remove('hidden');
                    svgs[1].classList.add('hidden');
                }
            });
        });
    }

    // ================== Set Tahun di Footer ==================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // ================== Efek Ketik ==================
    const typingTextPlaceholder = document.getElementById('typing-text-placeholder');
    const roles = [
        "Tech Explorer",
        "UI/UX Designer",
        "Cloud Enthusiast",
        "Java Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;

    function type() {
        if (!typingTextPlaceholder) return;

        const fullText = roles[roleIndex];
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }

        typingTextPlaceholder.innerHTML = `<span>${currentText}</span><span class="typing-cursor"></span>`;
        if (!isDeleting && charIndex === fullText.length) {
            typingTextPlaceholder.innerHTML = `<span>${currentText}</span>`;
        }

        let typeSpeed = 150;
        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (roles.length > 0 && typingTextPlaceholder) {
        // Mulai mengetik setelah loading screen selesai + jeda singkat
        setTimeout(type, 3500); 
    }

    // ================== Navigasi Aktif saat Scroll ==================
    const sections = document.querySelectorAll('main section[id]');
    const headerNavLinksDesktop = document.querySelectorAll('header .hidden.md\\:block .nav-link');
    const headerNavLinksMobile = document.querySelectorAll('#mobile-menu .nav-link');

    function onScroll() {
        let currentSectionId = '';
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 80;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - (headerHeight + 40)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        headerNavLinksDesktop.forEach(link => {
            link.classList.remove('nav-link-active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('nav-link-active');
            }
        });

        headerNavLinksMobile.forEach(link => {
            link.classList.remove('nav-link-active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('nav-link-active');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll();

    // ================== Inisialisasi Partikel ==================
    tsParticles.load("particles-background", {
        fpsLimit: 60,
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5,
                random: true,
            },
            size: {
                value: 3,
                random: true,
            },
            links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100
                },
                push: {
                    quantity: 4
                }
            }
        },
        detectRetina: true,
    });
});